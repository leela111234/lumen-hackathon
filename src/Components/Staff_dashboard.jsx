import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Staff_dashboard = () => {
  const initialProducts = [
    {
      id: 1,
      productName: "Cisco ISR 1101",
      description: "ISR 1101 4 Ports GE Ethernet WAN Router",
      productImage: "",
      category: "Router",
      modelNumber: "XYZ123",
      serialNumber: "6a38028c-6a71-4f44-b8f6-253bc7086a0a",
      stockLevel: 500,
      reorderPoint: 150,
      supplierName: "Cisco",
      supplierMail: "abcd@mail.com",
      supplierContact: "1234567890",
      orderDate: "2023-01-15",
      quantity: 500,
      orderStatus: "Delivered",
    },
    {
      id: 2,
      productName: "HP 5406zl",
      description: "HP ProCurve Switch 5406zl",
      productImage: "",
      category: "Switch",
      modelNumber: "ABC456",
      serialNumber: "7edc108e-45e0-4997-bc59-17852d16b689",
      stockLevel: 300,
      reorderPoint: 100,
      supplierName: "HP",
      supplierMail: "abhp@mail.com",
      supplierContact: "1980762345",
      orderDate: "2023-11-05",
      quantity: 300,
      orderStatus: "InProgress",
    },
    {
      id: 3,
      productName: "DOCSIS 3.1 Cable Modem",
      description: "Superfast speeds up to 10 gigabits per second (Gbps)",
      productImage: "modem.jpg",
      category: "Modem",
      modelNumber: "LMN789",
      serialNumber: "e41e2e16-2945-4c0c-a584-48935742fe94",
      stockLevel: 200,
      reorderPoint: 50,
      supplierName: "Netgear",
      supplierMail: "Neger@mail.com",
      supplierContact: "9256476541",
      orderDate: "2023-08-06",
      quantity: 200,
      orderStatus: "Delivered",
    },
    // Add more products...
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [filterDate, setFilterDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = initialProducts.filter((product) =>
      product.productName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDateFilterChange = (e) => {
    const date = e.target.value;
    setFilterDate(date);
    const filtered = initialProducts.filter((product) =>
      product.orderDate.startsWith(date)
    );
    setFilteredProducts(filtered);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce(
    (acc, product) => acc + product.stockLevel,
    0
  );
  const productsBelowReorder = filteredProducts.filter(
    (product) => product.stockLevel <= product.reorderPoint
  ).length;

  // Chart for stock levels
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

  // Chart for order status (Delivered vs InProgress)
  const orderStatusData = {
    labels: ["Delivered", "InProgress"],
    datasets: [
      {
        label: "Order Status",
        data: [
          filteredProducts.filter(
            (product) => product.orderStatus === "Delivered"
          ).length,
          filteredProducts.filter(
            (product) => product.orderStatus === "InProgress"
          ).length,
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
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

        {/* Date Filter Input */}
        <div className="mb-4">
          <label
            htmlFor="dateFilter"
            className="block text-sm font-semibold mb-2"
          >
            Filter by Date
          </label>
          <input
            id="dateFilter"
            type="date"
            value={filterDate}
            onChange={handleDateFilterChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Product Stock Table */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold mb-4">Product Stock</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Products"
              className="mb-4 p-2 border border-gray-300 rounded"
            />
          </div>

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
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts for Stock Levels and Order Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Stock Levels Chart */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Stock Levels</h3>
            <Bar data={stockChartData} />
          </div>

          {/* Order Status Chart */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <Bar data={orderStatusData} />
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <p>
              <strong>Product Name:</strong> {selectedProduct.productName}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>Model Number:</strong> {selectedProduct.modelNumber}
            </p>
            <p>
              <strong>Stock Level:</strong> {selectedProduct.stockLevel}
            </p>
            <p>
              <strong>Reorder Point:</strong> {selectedProduct.reorderPoint}
            </p>
            <p>
              <strong>Supplier Name:</strong> {selectedProduct.supplierName}
            </p>
            <p>
              <strong>Supplier Email:</strong> {selectedProduct.supplierMail}
            </p>
            <p>
              <strong>Supplier Contact:</strong>{" "}
              {selectedProduct.supplierContact}
            </p>
            <p>
              <strong>Order Date:</strong> {selectedProduct.orderDate}
            </p>
            <p>
              <strong>Order Status:</strong> {selectedProduct.orderStatus}
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff_dashboard;
