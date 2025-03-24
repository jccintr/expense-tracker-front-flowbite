import {useState,useEffect,useContext} from 'react'
import api from '../../api/api'
import { LuChevronRight,LuChevronLeft } from "react-icons/lu";
import { Card,Label } from 'flowbite-react';
import AuthContext from '../../context/AuthContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { months,gerarCorHexAleatoria } from '../../util/util';

ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels);




 const options = {
  responsive: true,
  plugins: {
    legend: {
      display:true,
      position: 'bottom' ,
    },
    datalabels: {
      formatter: (value, context) => {
        let percentage = (value / context.chart._metasets
        [context.datasetIndex].total * 100)
            .toFixed(2) + '%';
        return percentage;
    },
      color: '#ffffff',
    }
  }
}


const PizzaChart = () => {
    const {token} = useContext(AuthContext);
    const [chartData,setChartData] = useState(null);
    const [total,setTotal] = useState(0);
    const [date,setDate] = useState(null)


    useEffect(()=>{
        const today = new Date(Date.now());
        setDate(today);
        const mes = today.getMonth()+1;
        const ano = today.getFullYear();
        getData(mes,ano);
    },[]);

    const getData = async (mes,ano) => {
   
     // setIsLoading(true);
      const response = await api.pieChart(token,mes,ano);
    
      if(response.ok){
        const json = await response.json();
        if(json.accounts.length>0){
        createChartData(json.accounts,json.total_amount);
        }
        else {
          setChartData(null);
        }
      
        setTotal(json.total_amount);
      }
    //  setIsLoading(false)
      
  }

    const createChartData = (arr,total) => {
        let arrData = [];
        let accounts = [];
        let colors = [];
        let amounts = [];
        for(let i=0;i<arr.length;i++){

           accounts.push(arr[i].account);
           amounts.push(arr[i].total_amount);
           colors.push(gerarCorHexAleatoria())
          
        }
         let data = {
          labels: accounts,
          datasets: [
            {
              label: '',
              data: amounts,
              backgroundColor:colors,
              borderColor: colors,
              borderWidth: 1,
             
            },
          ],
        };
        
        
        setChartData(data);
    }

    const nextMonth =  () => {
     
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() + 1);
        setDate(newDate);
        const mes = newDate.getMonth()+1;
        const ano = newDate.getFullYear();
         getData(mes,ano);
      }
  
      const previousMonth =  () => {
       
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() - 1);
        setDate(newDate);
        const mes = newDate.getMonth()+1;
        const ano = newDate.getFullYear();
        
        getData(mes,ano);
      }




  return (
     <Card >
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-2">
                   <LuChevronLeft  onClick={previousMonth} className='w-7 h-7'/>
                   <span className="text-base h-7">{months[date?.getMonth()]+' '+date?.getFullYear()}</span>
                   <LuChevronRight  onClick={nextMonth} className='w-7 h-7'/>
                </div>
                <Label className="text-xl font-semibold">R$ {total.toFixed(2)}</Label>
           </div>
           {chartData&&<Pie data={chartData} options={options} plugins={[ChartDataLabels]} />}
        </Card>
  )
}

export default PizzaChart