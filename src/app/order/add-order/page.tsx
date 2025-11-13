// src/app/order/add-order/page.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Package,
  User,
  DollarSign,
  CreditCard,
  Clock,
  Truck,
  Save,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  Water19L,
  Water10L,
  Water5L,
  Water1_5L,
  Water500mlPack,
  Milk1L,
  Milk2L,
  Milk500mlPack,
} from "@/components/icons/BottleSVG";
interface OrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  icon: React.ReactNode;
  price: number;
}

interface FormData {
  customer: string;
  address: string;
  items: OrderItem[];
  date: string;
  time: string;
  driver: string;
  amount: string;
  payment: "COD" | "Card" | "Wallet";
  status: "Pending";
}

interface Errors {
  [key: string]: string;
}


/* ------------------------------------------------------------------
   2. PRODUCTS WITH PRICES & ICONS
   ------------------------------------------------------------------ */
const PRODUCTS = [
  { id: "water-19l", name: "Water Bottle", size: "19L", price: 5.99, icon: Water19L },
  { id: "water-10l", name: "Water Bottle", size: "10L", price: 3.49, icon: Water10L },
  { id: "water-5l", name: "Water Bottle", size: "5L", price: 2.49, icon: Water5L },
  { id: "water-1.5l", name: "Water Bottle", size: "1.5L", price: 1.49, icon: Water1_5L },
  { id: "water-500ml", name: "Water Bottle", size: "500ml (Pack of 6)", price: 2.99, icon: Water500mlPack },
  { id: "milk-1l", name: "Milk Bottle", size: "1L", price: 2.99, icon: Milk1L },
  { id: "milk-2l", name: "Milk Bottle", size: "2L", price: 4.99, icon: Milk2L },
  { id: "milk-500ml", name: "Milk Bottle", size: "500ml (Pack of 6)", price: 3.99, icon: Milk500mlPack },
];

/* ------------------------------------------------------------------
   3. MAIN COMPONENT
   ------------------------------------------------------------------ */
export default function AddOrder() {
  const [formData, setFormData] = useState<FormData>({
    customer: "",
    address: "",
    items: [],
    date: "",
    time: "",
    driver: "",
    amount: "",
    payment: "COD",
    status: "Pending",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openModal = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = () => {
    if (!selectedProduct || quantity < 1) return;

    const existing = formData.items.find((i) => i.id === selectedProduct.id);
    const Icon = selectedProduct.icon;

    if (existing) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.id === selectedProduct.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          {
            id: selectedProduct.id,
            name: selectedProduct.name,
            size: selectedProduct.size,
            quantity,
            price: selectedProduct.price,
            icon: <Icon className="h-6 w-6" />,
          },
        ],
      }));
    }

    closeModal();
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0),
    }));
  };

  const handleRemoveItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== id),
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.customer.trim()) newErrors.customer = "Customer name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (formData.items.length === 0) newErrors.items = "Add at least one product";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time.trim()) newErrors.time = "Time slot is required";
    if (!formData.driver.trim()) newErrors.driver = "Driver is required";
    if (!formData.amount || isNaN(Number(formData.amount)) || parseFloat(formData.amount) <= 0)
      newErrors.amount = "Valid amount is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Order Created:", formData);
      alert("Order created successfully!");
      // Reset form
      setFormData({
        customer: "",
        address: "",
        items: [],
        date: "",
        time: "",
        driver: "",
        amount: "",
        payment: "COD",
        status: "Pending",
      });
    }
  };

  const totalItems = formData.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add New Order" description="Create a new water delivery order" />

      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 dark:bg-meta-4 dark:text-white dark:hover:bg-meta-3"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* Customer & Address */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" /> Customer Name *
              </label>
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full rounded-lg border ${errors.customer ? "border-red-500" : "border-stroke"} bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`}
              />
              {errors.customer && <p className="mt-1 text-xs text-red-500">{errors.customer}</p>}
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4" /> Delivery Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, Karachi"
                className={`w-full rounded-lg border ${errors.address ? "border-red-500" : "border-stroke"} bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`}
              />
              {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-6 rounded-lg border border-stroke bg-gray-50 p-4 dark:border-strokedark dark:bg-meta-4">
            <label className="mb-4 flex items-center gap-2 text-sm font-medium">
              <Package className="h-4 w-4" /> Select Products *
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {PRODUCTS.filter((p) => !formData.items.some((i) => i.id === p.id)).map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => openModal(p)}
                    className="flex flex-col items-center rounded-lg border border-stroke p-3 hover:border-primary hover:bg-white dark:border-strokedark dark:hover:bg-boxdark"
                  >
                    <Icon className="mb-2 h-12 w-12 text-primary" />
                    <p className="text-xs font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.size}</p>
                    <p className="mt-1 text-sm font-semibold">PKR{p.price.toFixed(2)}</p>
                  </button>
                );
              })}
            </div>

            {errors.items && <p className="mt-2 text-xs text-red-500">{errors.items}</p>}

            {/* Selected Items */}
            {formData.items.length > 0 && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stroke dark:border-strokedark">
                      <th className="py-2 px-1 text-left text-sm">Product</th>
                      <th className="py-2 px-1 text-center text-sm">Qty</th>
                      <th className="py-2 px-1 text-center text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item) => (
                      <tr key={item.id} className="border-b border-stroke dark:border-strokedark">
                        <td className="py-3 px-1">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-1">
                          <div className="flex items-center justify-center gap-1">
                            <button type="button" onClick={() => handleQuantityChange(item.id, -1)} className="rounded bg-gray-200 p-1 hover:bg-gray-300">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button type="button" onClick={() => handleQuantityChange(item.id, 1)} className="rounded bg-gray-200 p-1 hover:bg-gray-300">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-1 text-center">
                          <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 flex justify-end text-sm font-bold">
                  <span>Total Items: {totalItems}</span>
                </div>
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" /> Date *
              </label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className={`w-full rounded-lg border ${errors.date ? "border-red-500" : "border-stroke"} bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`} />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4" /> Time Slot *
              </label>
              <input type="text" name="time" value={formData.time} onChange={handleChange} placeholder="2:00 PM - 4:00 PM" className={`w-full rounded-lg border ${errors.time ? "border-red-500" : "border-stroke"} bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`} />
              {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}
            </div>
          </div>

          {/* Driver & Amount */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Truck className="h-4 w-4" /> Driver *
              </label>
              <input type="text" name="driver" value={formData.driver} onChange={handleChange} placeholder="Ahmed Khan" className={`w-full rounded-lg border ${errors.driver ? "border-red-500" : "border-stroke"} bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`} />
              {errors.driver && <p className="mt-1 text-xs text-red-500">{errors.driver}</p>}
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4" /> Amount (PKR) *
              </label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} step="0.01" min="0" placeholder="0.00" className={`w-full rounded-lg border ${errors.amount ? "border-red-500" : "border-stroke"} bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input`} />
              {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
            </div>
          </div>

          {/* Payment */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <CreditCard className="h-4 w-4" /> Payment Method
            </label>
            <select name="payment" value={formData.payment} onChange={handleChange} className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input">
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Card</option>
              <option value="Wallet">Wallet</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Save size={20} /> Create Order
          </button>
        </div>
      </form>

      {/* Quantity Modal */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-boxdark">
            <div className="mb-4 flex items-center gap-3">
              <selectedProduct.icon className="h-10 w-10 text-primary" />
              <div>
                <p className="font-medium">{selectedProduct.name}</p>
                <p className="text-sm text-gray-500">{selectedProduct.size}</p>
                <p className="text-sm font-semibold">PKR{selectedProduct.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="mb-6 flex items-center justify-center gap-4">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded bg-gray-200 p-2 hover:bg-gray-300">
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-12 text-center text-lg font-bold">{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)} className="rounded bg-gray-200 p-2 hover:bg-gray-300">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={handleAddProduct} className="flex-1 rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
                Add
              </button>
              <button type="button" onClick={closeModal} className="flex-1 rounded bg-gray-400 py-2 text-white hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}