import React, { useState } from "react";
import Sidebar from "./Sidebar";

const ProductManagement = () => {
  const initialProducts = [
    {
      id: 1,
      productName: "Cisco ISR 1101",
      description: "ISR 1101 4 Ports GE Ethernet WAN Router",
      productImage: "",
      productCategory: "Router",
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
      productCategory: "Switch",
      modelNumber: "ABC456",
      serialNumber: "7edc108e-45e0-4997-bc59-17852d16b689",
      stockLevel: 300,
      reorderPoint: 100,
      supplierName: "HP",
      supplierMail: "abhp@mail.com",
      supplierContact: "1980762345",
      orderDate: "2023-11-05",
      quantity: 300,
      orderStatus: "Delivered",
    },
    {
      id: 3,
      productName: "DOCSIS 3.1 Cable Modem",
      description: "Superfast speeds up to 10 gigabits per second (Gbps)",
      productImage: "modem.jpg",
      productCategory: "Modem",
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
    {
      id: 4,
      productName: "Cellular Duplexer Rx",
      description: "A multiplexer product that is RoHS6 compliant",
      productImage: "",
      productCategory: "Multiplexer",
      modelNumber: "DSC423",
      serialNumber: "6aac9135-9ceb-4535-a13a-fc04ad8dadd5",
      stockLevel: 200,
      reorderPoint: 50,
      supplierName: "Broadcom",
      supplierMail: "brcom@mail.com",
      supplierContact: "1759731673",
      orderDate: "2023-05-16",
      quantity: 200,
      orderStatus: "Delivered",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    const newId = products.length + 1;
    setProducts([...products, { id: newId, ...newProduct }]);
    setNewProduct({});
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    setProducts(filteredProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Product Management</h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 mb-4"
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
                        onClick={() => handleEditProduct(product)}
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
          {/* Add Product */}
          <h2 className="text-xl font-bold mt-4">Add Product</h2>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={newProduct.productName || ""}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          {/* Other fields */}
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
          >
            Add Product
          </button>

          {/* Edit Product */}
          {editingProduct && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={editingProduct.productName}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    productName: e.target.value,
                  })
                }
                className="border p-2 mb-2 w-full"
              />
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
