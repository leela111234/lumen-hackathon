import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
  import { useState } from "react";
  import { Bar, Pie, Line } from "react-chartjs-2";
  import Sidebar from "./Sidebar";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  
  const Staff_dashboard = () => {
    const initialProducts = [
      {
        id: 1,
        productName: "Cisco ISR 1101",
        description: "ISR 1101 4 Ports GE Ethernet WAN Router",
        category: "Router",
        modelNumber: "XYZ123",
        stockLevel: 500,
        reorderPoint: 150,
        orderStatus: "Delivered",
        orderDate: "2023-01-15",
      },
      {
        id: 2,
        productName: "HP 5406zl",
        description: "HP ProCurve Switch 5406zl",
        category: "Switch",
        modelNumber: "ABC456",
        stockLevel: 300,
        reorderPoint: 100,
        orderStatus: "InProgress",
        orderDate: "2023-11-05",
      },
      {
        id: 3,
        productName: "HP 5406zl",
        description: "HP ProCurve Switch 5406zl",
        category: "Switch",
        modelNumber: "ABC456",
        stockLevel: 300,
        reorderPoint: 100,
        orderStatus: "InProgress",
        orderDate: "2023-11-06",
      },
      {
        id: 4,
        productName: "DOCSIS 3.1 Cable Modem",
        description: "Superfast speeds up to 10 gigabits per second (Gbps)",
        category: "Modem",
        modelNumber: "LMN789",
        stockLevel: 200,
        reorderPoint: 50,
        orderStatus: "Delivered",
        orderDate: "2023-08-06",
      },
      // Add more products...
    ];
  
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      const filtered = initialProducts.filter((product) =>
        product.productName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    };
  
    const totalProducts = filteredProducts.length;
    const totalStock = filteredProducts.reduce(
      (acc, product) => acc + product.stockLevel,
      0
    );
    const productsBelowReorder = filteredProducts.filter(
      (product) => product.stockLevel <= product.reorderPoint
    ).length;
  
    // Stock Levels Chart (Bar Chart)
    const stockChartData = {
      labels: filteredProducts.map((product) => product.productName),
      datasets: [
        {
          label: "Stock Levels",
          data: filteredProducts.map((product) => product.stockLevel),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  
    // Order Status Chart (Pie Chart)
    const orderStatusData = {
      labels: ["Delivered", "InProgress"],
      datasets: [
        {
          label: "Order Status",
          data: [
            filteredProducts.filter((product) => product.orderStatus === "Delivered").length,
            filteredProducts.filter((product) => product.orderStatus === "InProgress").length,
          ],
          backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
        },
      ],
    };
  
    // Monthly Order Trends (Line Chart)
    const getMonthlyOrderData = () => {
      const monthlyData = {};
      filteredProducts.forEach((product) => {
        const month = new Date(product.orderDate).toLocaleString("default", { month: "long" });
        monthlyData[month] = (monthlyData[month] || 0) + 1;
      });
  
      const months = Object.keys(monthlyData);
      const ordersPerMonth = months.map((month) => monthlyData[month]);
  
      return {
        labels: months,
        datasets: [
          {
            label: "Orders per Month",
            data: ordersPerMonth,
            fill: false,
            borderColor: "rgba(75, 192, 192, 0.6)",
            tension: 0.1,
          },
        ],
      };
    };
  
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Staff Dashboard</h2>
  
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Total Stock</h3>
              <p className="text-2xl font-bold">{totalStock}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">Reorder Alerts</h3>
              <p className="text-2xl font-bold">{productsBelowReorder}</p>
            </div>
          </div>
  
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Products"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
  

  
          {/* Product Stock Table */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-8">
            <table className="min-w-full table-auto mb-8">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Product Name</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Stock Level</th>
                  <th className="py-2 px-4 text-left">View</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="py-2 px-4">{product.productName}</td>
                    <td className="py-2 px-4">{product.category}</td>
                    <td className="py-2 px-4">{product.stockLevel}</td>
                    <td className="py-2 px-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

                    {/* Charts for Stock Levels, Order Status, and Monthly Orders */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Stock Levels Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Stock Levels</h3>
              <Bar data={stockChartData} />
            </div>
  
            {/* Order Status Chart */}
            <div className="bg-white shadow-md rounded-lg p-4 py-8 h-96">
              <h3 className="text-lg font-semibold">Order Status</h3>
              <Pie data={orderStatusData} />
            </div>
  
            {/* Monthly Orders Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Monthly Order Trends</h3>
              <Line data={getMonthlyOrderData()} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Staff_dashboard;
  