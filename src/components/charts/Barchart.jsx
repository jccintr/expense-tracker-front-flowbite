import { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { getWeekNumber } from '../../util/util';
import { Card, Label } from 'flowbite-react';
import AuthContext from '../../context/AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import DayTransactionsModal from '../modals/DayTransactionsModal';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    datalabels: {
      formatter: (value) => Number(value).toFixed(2).replace('.', ','),
      color: '#ffffff',
      font: { weight: 'bold' }
    }
  },
  onClick: (event, elements) => {
    // Esta função será sobrescrita no componente para ter acesso ao estado
  }
};

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const Barchart = () => {
  const [week, setWeek] = useState(0);
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [total, setTotal] = useState(0);
  const { token } = useContext(AuthContext);
  const [barData, setBarData] = useState([]);
  const [weekDaysData, setWeekDaysData] = useState([]); // ← Novo: guarda todos os dados do dia
  const [isLoading, setIsLoading] = useState(false);
 

  // Estado do Modal
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date();
    const weekAtual = getWeekNumber(today);
    setWeek(weekAtual);
    getData(weekAtual);
  }, []);

  const createBarData = (arr) => {
    const amounts = arr.map(item => item.total_amount);
    setBarData(amounts);
    setWeekDaysData(arr); // guarda o array completo com date, day_of_week, etc.
  };

  const getData = async (w) => {
    setIsLoading(true);
    const response = await api.weekChart(token, w);
    if (response.ok) {
      const json = await response.json();
      createBarData(json.week_days);
      setTotal(json.total_amount);
      setFirstDay(new Date(json.first_day + 'T00:00:00'));
      setLastDay(new Date(json.last_day + 'T00:00:00'));
    }
    setIsLoading(false);
  };

  const previousWeek = () => {
    const w = week - 1;
    setWeek(w);
    getData(w);
  };

  const nextWeek = () => {
    const w = week + 1;
    setWeek(w);
    getData(w);
  };

  // Função chamada ao clicar em uma barra
  const handleBarClick = (event, elements) => {
    if (elements.length === 0) return;

    const index = elements[0].index;
    const dayData = weekDaysData[index];

    if (dayData && dayData.date) {
      setSelectedDate(dayData.date);
      setShowModal(true);
    }
  };

  return (
    <Card className="h-[420px] flex flex-col">
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row items-center gap-2">
          <LuChevronLeft onClick={previousWeek} className="w-7 h-7 cursor-pointer" />
          <span className="text-base">
            {firstDay && lastDay 
              ? `${firstDay.getDate()} ${months[firstDay.getMonth()]} - ${lastDay.getDate()} ${months[lastDay.getMonth()]}`
              : ''}
          </span>
          <LuChevronRight onClick={nextWeek} className="w-7 h-7 cursor-pointer" />
        </div>
        <Label className="text-xl font-semibold">
          R$ {total.toFixed(2).replace('.', ',')}
        </Label>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Bar 
          options={{
            ...options,
            onClick: handleBarClick,   // ← Ativa o clique
          }} 
          data={{
            labels: weekDays,
            datasets: [{
              label: '',
              data: barData,
              backgroundColor: 'rgba(0, 0, 255, 0.7)',
            }],
          }} 
        />
      </div>

     
      <DayTransactionsModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedDate={selectedDate}
        token={token}
      />
    </Card>
  );
};

export default Barchart;