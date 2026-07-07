import { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { Card, Label } from 'flowbite-react';
import AuthContext from '../../context/AuthContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { months, gerarCorHexAleatoria } from '../../util/util';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    datalabels: {
      formatter: (value, context) => {
        const total = context.chart._metasets[context.datasetIndex].total;
        const percentage = ((value / total) * 100).toFixed(1) + '%';
        return percentage;
      },
      color: '#ffffff',
    }
  },
};

const DonnutChart = () => {
  const { token } = useContext(AuthContext);
  const [chartData, setChartData] = useState(null);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    setDate(today);
    const mes = today.getMonth() + 1;
    const ano = today.getFullYear();
    getData(mes, ano);
  }, []);

  const getData = async (mes, ano) => {
    const response = await api.donutChart(token, mes, ano);
    if (response.ok) {
      const json = await response.json();
      if (json.categories?.length > 0) {
        createChartData(json.categories);
        setTotal(json.total_amount);
      } else {
        setChartData(null);
        setTotal(json.total_amount || 0);
      }
    }
  };

  const createChartData = (arr) => {
    const categories = [];
    const amounts = [];
    const colors = [];

    arr.forEach(item => {
      categories.push(item.category);
      amounts.push(item.total_amount);
      colors.push(gerarCorHexAleatoria());
    });

    setChartData({
      labels: categories,
      datasets: [{
        label: '',
        data: amounts,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      }],
    });
  };

  const nextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
    getData(newDate.getMonth() + 1, newDate.getFullYear());
  };

  const previousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
    getData(newDate.getMonth() + 1, newDate.getFullYear());
  };

  return (
    <Card className="h-[420px] flex flex-col">
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row items-center gap-2">
          <LuChevronLeft onClick={previousMonth} className="w-7 h-7 cursor-pointer" />
          <span className="text-base">
            {date ? `${months[date.getMonth()]} ${date.getFullYear()}` : ''}
          </span>
          <LuChevronRight onClick={nextMonth} className="w-7 h-7 cursor-pointer" />
        </div>
        <Label className="text-xl font-semibold">R$ {total.toFixed(2)}</Label>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {chartData && (
          <Doughnut 
            data={chartData} 
            options={options} 
            plugins={[ChartDataLabels]} 
          />
        )}
      </div>
    </Card>
  );
};

export default DonnutChart;