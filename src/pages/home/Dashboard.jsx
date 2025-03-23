import Barchart from "../../components/charts/Barchart"
import PizzaChart from "../../components/charts/PizzaChart"

const Dashboard = () => {
  return (
    <div className='w-full p-5  mx-auto'>

      <div className='flex w-full flex-row justify-between mb-4'>
        <h1 className='text-3xl font-semibold'>Dashboard</h1>
      </div>
      <PizzaChart/>
     
    </div>
  )
}

export default Dashboard