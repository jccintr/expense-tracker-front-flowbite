import Barchart from "../../components/charts/Barchart"
import PizzaChart from "../../components/charts/PizzaChart"
import DonnutChart from "../../components/charts/DonnutChart"

const Dashboard = () => {
  return (
    <div className='w-full p-5 mx-auto'>
      <div className='flex w-full flex-row justify-between mb-4'>
        <h1 className='text-3xl font-semibold'>Dashboard</h1>
      </div>

      <div className='grid grid-cols-1 overflow-y-auto'>
        <Barchart/>
      </div>
      
      <div className='grid grid-cols-1 overflow-y-auto gap-4 mt-4 md:grid-cols-2'>
        <DonnutChart/>
        <PizzaChart/>
      </div>
     
    </div>
  )
}

export default Dashboard