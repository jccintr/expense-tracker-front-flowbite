import Barchart from "../../components/charts/Barchart"

const Dashboard = () => {
  return (
    <div className='w-full p-5  mx-auto'>

      <div className='flex w-full flex-row justify-between mb-4'>
        <h1 className='text-3xl font-semibold'>Dashboard</h1>
      </div>
      <Barchart/>
     
    </div>
  )
}

export default Dashboard