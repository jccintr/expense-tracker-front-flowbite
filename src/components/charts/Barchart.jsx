import {useState,useEffect,useContext} from 'react'
import api from '../../api/api'
import { LuChevronRight,LuChevronLeft } from "react-icons/lu";
import { getWeekNumber } from '../../util/util';
import { Card,Label } from 'flowbite-react';
import AuthContext from '../../context/AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement,ChartDataLabels);
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false,
        position: 'top' ,
      },
      title: {
        display: false,
        text: 'Gastos Semanais',
      },
      datalabels: {
        formatter: (value, context) => {
          let v = value.toFixed(2);
         
          return v;
      },
        color: '#ffffff',
      }
    },
  };


const weekDays = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  

const Barchart = () => {
    const [week,setWeek] = useState(0);
    const [firstDay,setFirstDay] = useState(null);
    const [lastDay,setLastDay] = useState(null);
    const [total,setTotal] = useState(0);
    const {token} = useContext(AuthContext);
    const [barData,setBarData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);


    useEffect(()=>{
        const today = new Date(Date.now());
        const weekAtual = getWeekNumber(today);
        setWeek(weekAtual);
        getData(weekAtual);
   },[]);

   const createBarData = (arr) => {
    let arrData = [];
    for(let i=0;i<arr.length;i++){
        arrData.push(arr[i].total_amount)
    }
    setBarData(arrData);
    }

    const getData = async (w) => {
        setIsLoading(true);
        const response = await api.weekChart(token,w);
        if(response.ok){
          const json = await response.json()
          createBarData(json.week_days)
          setTotal(json.total_amount);
          setFirstDay(new Date(json.first_day+'T00:00:00'));
          setLastDay(new Date(json.last_day +'T00:00:00'));
        }
        setIsLoading(false)
    }

    const previousWeek = async () => {
        const w = week - 1;
        setWeek(w);
        getData(w);
    }
    
    const nextWeek = async () => {
      const w = week + 1;
      setWeek(w);
      getData(w);
    }


  return (
    <Card >
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
               <LuChevronLeft  onClick={previousWeek} className='w-7 h-7'/>
               <span className="text-base h-7">{`${firstDay?.getDate()} ${months[firstDay?.getMonth()]} - ${lastDay?.getDate()} ${months[lastDay?.getMonth()]}`}</span>
               <LuChevronRight  onClick={nextWeek} className='w-7 h-7'/>
            </div>
            <Label className="text-xl font-semibold">R$ {total.toFixed(2)}</Label>
       </div>
       <Bar  options={options} data={{
                labels:weekDays,
                datasets:[
                    {
                        label:'',
                        data:barData,
                        backgroundColor: 'rgba(0,0,255,0.7)'
                    }
                ],
            }}/>
    </Card>
  )
}

export default Barchart