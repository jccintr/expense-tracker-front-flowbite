import Barchart from "../../components/charts/Barchart";
import PizzaChart from "../../components/charts/PizzaChart";
import DonnutChart from "../../components/charts/DonnutChart";

const Dashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Gráfico de Barras - Full width com altura controlada */}
      <div className="mb-8">
        <Barchart />
      </div>

      {/* Gráficos circulares */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonnutChart />
        <PizzaChart />
      </div>
    </div>
  );
};

export default Dashboard;