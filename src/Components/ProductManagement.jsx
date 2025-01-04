import React, { useState } from "react";
import Sidebar from "./Sidebar";

const ProductManagement = () => {
  // const initialProducts = [
  //     {
  //       id: 1,
  //       productName: "Cisco ISR 1101",
  //       description: "ISR 1101 4 Ports GE Ethernet WAN Router",
  //       productImage: "",
  //       category: "Router",
  //       modelNumber: "XYZ123",
  //       serialNumber: "6a38028c-6a71-4f44-b8f6-253bc7086a0a",
  //       stockLevel: 500,
  //       reorderPoint: 150,
  //       supplierName: "Cisco",
  //       supplierMail: "abcd@mail.com",
  //       supplierContact: "1234567890",
  //       orderDate: "2023-01-15",
  //       quantity: 500,
  //       orderStatus: "Delivered",
  //     },
  //     {
  //       id: 2,
  //       productName: "HP 5406zl",
  //       description: "HP ProCurve Switch 5406zl",
  //       productImage: "",
  //       category: "Switch",
  //       modelNumber: "ABC456",
  //       serialNumber: "7edc108e-45e0-4997-bc59-17852d16b689",
  //       stockLevel: 300,
  //       reorderPoint: 100,
  //       supplierName: "HP",
  //       supplierMail: "abhp@mail.com",
  //       supplierContact: "1980762345",
  //       orderDate: "2023-11-05",
  //       quantity: 300,
  //       orderStatus: "InProgress",
  //     },
  //     {
  //       id: 3,
  //       productName: "DOCSIS 3.1 Cable Modem",
  //       description: "Superfast speeds up to 10 gigabits per second (Gbps)",
  //       productImage: "modem.jpg",
  //       category: "Modem",
  //       modelNumber: "LMN789",
  //       serialNumber: "e41e2e16-2945-4c0c-a584-48935742fe94",
  //       stockLevel: 200,
  //       reorderPoint: 50,
  //       supplierName: "Netgear",
  //       supplierMail: "Neger@mail.com",
  //       supplierContact: "9256476541",
  //       orderDate: "2023-08-06",
  //       quantity: 200,
  //       orderStatus: "Delivered",
  //     },
  //     // Add more products...
  //   ];

  //   const [products, setProducts] = useState(initialProducts);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected array, but got:", data);
          setProducts([]); // Fallback to empty array if the response is not an array
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]); // Ensure that products is always an array
      });
  }, []);
  

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = () => {
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({});
      })
      .catch((err) => console.error(err));
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:5000/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? data : p))
        );
        setEditingProduct(null);
      })
      .catch((err) => console.error(err));
  };
  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const closeEditModal = () => {
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    (product.productName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  

  const renderForm = (product, isEditing = false) => {
    const handleChange = (e) => handleInputChange(e, isEditing);

    return (
      <div>
        {[
          { label: "Product Name", name: "productName" },
          { label: "Description", name: "description" },
          { label: "Product Image URL", name: "productImage" },
          { label: "Product Category", name: "productCategory" },
          { label: "Model Number", name: "modelNumber" },
          { label: "Serial Number", name: "serialNumber" },
          { label: "Stock Level", name: "stockLevel", type: "number" },
          { label: "Reorder Point", name: "reorderPoint", type: "number" },
          { label: "Supplier Name", name: "supplierName" },
          { label: "Supplier Email", name: "supplierMail", type: "email" },
          { label: "Supplier Contact", name: "supplierContact" },
          { label: "Order Date", name: "orderDate", type: "date" },
          { label: "Quantity", name: "quantity", type: "number" },
          { label: "Order Status", name: "orderStatus" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="mb-2">
            <label className="block font-bold mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={product[name] || ""}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        {/* Product Table */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Stock Level</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="border px-4 py-2">{product.productName}</td>
                  <td className="border px-4 py-2">
                    {product.productCategory}
                  </td>
                  <td className="border px-4 py-2">{product.stockLevel}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Product Form */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-xl font-bold">Add Product</h2>
          {renderForm(newProduct, false)}
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
          >
            Add Product
          </button>
        </div>

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white shadow-md rounded-lg p-4 w-3/4 md:w-1/2">
              <h2 className="text-xl font-bold">Edit Product</h2>
              {renderForm(editingProduct, true)}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={closeEditModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
