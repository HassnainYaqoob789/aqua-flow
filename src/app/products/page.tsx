// app/products/page.tsx (or wherever you want the CRUD)
"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Product {
  id: string;
  name: string;
  size: string;
  category: "water" | "milk";
  price: number;
  description?: string;
}

interface FormData {
  name: string;
  size: string;
  category: "water" | "milk";
  price: number;
  description: string;
}

interface Errors {
  [key: string]: string;
}

// Initial products data
const INITIAL_PRODUCTS: Product[] = [
  { id: "1", name: "Water Bottle", size: "19L", category: "water", price: 5.99 },
  { id: "2", name: "Water Bottle", size: "10L", category: "water", price: 3.49 },
  { id: "3", name: "Water Bottle", size: "5L", category: "water", price: 2.49 },
  { id: "4", name: "Water Bottle", size: "1.5L", category: "water", price: 1.49 },
  { id: "5", name: "Water Bottle", size: "500ml (Pack of 6)", category: "water", price: 2.99 },
  { id: "6", name: "Milk Bottle", size: "1L", category: "milk", price: 2.99 },
  { id: "7", name: "Milk Bottle", size: "2L", category: "milk", price: 4.99 },
  { id: "8", name: "Milk Bottle", size: "500ml (Pack of 6)", category: "milk", price: 3.99 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    size: "",
    category: "water",
    price: 0,
    description: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.size.trim()) newErrors.size = "Size is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingId) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                size: formData.size,
                category: formData.category,
                price: formData.price,
                description: formData.description,
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        size: formData.size,
        category: formData.category,
        price: formData.price,
        description: formData.description,
      };
      setProducts([...products, newProduct]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      size: "",
      category: "water",
      price: 0,
      description: "",
    });
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      size: product.size,
      category: product.category,
      price: product.price,
      description: product.description || "",
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const waterProducts = products.filter((p) => p.category === "water");
  const milkProducts = products.filter((p) => p.category === "milk");

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Manage Products"
        description="Add, edit, and delete water and milk bottles"
      />

      {/* Add New Product Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 dark:bg-blue-500"
        >
          <Plus size={20} />
          {showForm ? "Cancel" : "Add New Product"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-lg font-bold text-black dark:text-white">
            {editingId ? "Edit Product" : "Add New Product"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Water Bottle, Milk Bottle"
                  className={`w-full rounded-lg border PKR{
                    errors.name ? "border-red-500" : "border-stroke"
                  } bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Size *
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="e.g., 19L, 500ml (Pack of 6)"
                  className={`w-full rounded-lg border PKR {
                    errors.size ? "border-red-500" : "border-stroke"
                  } bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`}
                />
                {errors.size && (
                  <p className="mt-1 text-xs text-red-500">{errors.size}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="water">Water</option>
                  <option value="milk">Milk</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Price (PKR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border PKR{
                    errors.price ? "border-red-500" : "border-stroke"
                  } bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Optional product description"
                rows={2}
                className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input resize-none"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-white font-medium hover:bg-green-700"
              >
                <Save size={18} />
                {editingId ? "Update Product" : "Add Product"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 rounded-lg bg-gray-400 px-6 py-2 text-white font-medium hover:bg-gray-500"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Tables */}
      <div className="space-y-8">
        {/* Water Products */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="text-lg font-bold text-black dark:text-white">
              Water Bottles ({waterProducts.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-strokedark">
                  <th className="py-3 px-6 text-left text-sm font-medium">Name</th>
                  <th className="py-3 px-6 text-left text-sm font-medium">Size</th>
                  <th className="py-3 px-6 text-center text-sm font-medium">Price</th>
                  <th className="py-3 px-6 text-center text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {waterProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-stroke dark:border-strokedark"
                  >
                    <td className="py-4 px-6 text-sm">{product.name}</td>
                    <td className="py-4 px-6 text-sm">{product.size}</td>
                    <td className="py-4 px-6 text-center text-sm font-medium">
                      PKR{product.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Milk Products */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-4 dark:border-strokedark">
            <h3 className="text-lg font-bold text-black dark:text-white">
              Milk Bottles ({milkProducts.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-strokedark">
                  <th className="py-3 px-6 text-left text-sm font-medium">Name</th>
                  <th className="py-3 px-6 text-left text-sm font-medium">Size</th>
                  <th className="py-3 px-6 text-center text-sm font-medium">Price</th>
                  <th className="py-3 px-6 text-center text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {milkProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-stroke dark:border-strokedark"
                  >
                    <td className="py-4 px-6 text-sm">{product.name}</td>
                    <td className="py-4 px-6 text-sm">{product.size}</td>
                    <td className="py-4 px-6 text-center text-sm font-medium">
                      PKR{product.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}