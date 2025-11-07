// src/app/order/all-orders/page.tsx (updated – server component)
import React from "react"; // React import rakha, but useState nahi chahiye ab
import { Search, Filter, Plus, MoreVertical } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { Metadata } from "next";

// Metadata export (server-side only – yeh kaam karega ab)
export const metadata: Metadata = {
  title: "AquaFlow", // Updated to match page content (Medication Checker tha galat copy-paste)
  description: "Manage and track all water delivery orders", // Page ke hisaab se
};

// Static data – no useState needed, server pe render ho jaayega
const orders = [
  {
    id: "#1234",
    customer: "John Doe",
    address: "123 Main St, NY 10001",
    items: "2x 20L Bottles",
    date: "Nov 4, 2025",
    time: "2:00 PM - 4:00 PM",
    driver: "Michael Johnson",
    amount: "$24.00",
    payment: "COD",
    status: "In Progress",
  },
  {
    id: "#1235",
    customer: "Acme Corporation",
    address: "456 Business Ave, NY 10002",
    items: "10x 20L Bottles",
    date: "Nov 4, 2025",
    time: "10:00 AM - 12:00 PM",
    driver: "Unassigned",
    amount: "$120.00",
    payment: "Card",
    status: "Pending",
  },
  {
    id: "#1236",
    customer: "Jane Smith",
    address: "789 Oak Rd, NY 10003",
    items: "1x 20L, 2x 10L",
    date: "Nov 4, 2025",
    time: "12:00 PM - 2:00 PM",
    driver: "Sarah Williams",
    amount: "$28.00",
    payment: "Wallet",
    status: "Delivered",
  },
  {
    id: "#1237",
    customer: "TechStart Inc",
    address: "321 Tech Park, NY 10004",
    items: "5x 20L Bottles",
    date: "Nov 4, 2025",
    time: "4:00 PM - 6:00 PM",
    driver: "David Brown",
    amount: "$60.00",
    payment: "COD",
    status: "In Progress",
  },
  {
    id: "#1238",
    customer: "Green Valley School",
    address: "555 School Lane, NY 10005",
    items: "8x 20L Bottles",
    date: "Nov 5, 2025",
    time: "10:00 AM - 12:00 PM",
    driver: "Unassigned",
    amount: "$96.00",
    payment: "Card",
    status: "Pending",
  },
  {
    id: "#1239",
    customer: "City Hospital",
    address: "777 Health St, NY 10006",
    items: "15x 20L Bottles",
    date: "Nov 4, 2025",
    time: "2:00 PM - 4:00 PM",
    driver: "N/A",
    amount: "$180.00",
    payment: "Card",
    status: "Cancelled",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-gray-900 text-white";
    case "In Progress":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "Delivered":
      return "bg-green-50 text-green-700 border border-green-200";
    case "Cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function OrderManagement() {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Order Management"
        description="Manage and track all water delivery orders"
      />
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="block sm:hidden">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Order Management
          </h2>
        </div>
        <Link href="/order/add-order" className="sm:ml-auto">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto">
            <Plus size={20} />
            New Order
          </button>
        </Link>
      </div>
      {/* Search and Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search orders, customers..."
            className="w-full rounded-lg border border-stroke bg-transparent py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
          />
        </div>
        <div className="flex gap-3 sm:gap-4">
          <select className="flex-1 rounded-lg border border-stroke bg-transparent px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input sm:flex-none sm:px-4 sm:text-base">
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="progress">In Progress</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-stroke px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4 sm:px-4 sm:text-base">
            <Filter size={20} />
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-sm border border-stroke bg-white px-8 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            Total Orders
          </p>
          <p className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
            1,234
          </p>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-4 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            Pending
          </p>
          <p className="text-2xl font-bold text-blue-600 sm:text-3xl">120</p>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-4 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            In Progress
          </p>
          <p className="text-2xl font-bold text-orange-500 sm:text-3xl">180</p>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-4 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            Delivered
          </p>
          <p className="text-2xl font-bold text-green-600 sm:text-3xl">850</p>
        </div>
      </div>
      {/* Orders Table - Desktop */}
      <div className="hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:block">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Order ID
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Customer
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Items
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Date & Time
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Driver
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Payment
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {order.id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {order.customer}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.address}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{order.items}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{order.date}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.time}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{order.driver}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="font-medium text-black dark:text-white">
                      {order.amount}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {order.payment}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Orders Cards - Mobile & Tablet */}
      <div className="space-y-3 sm:space-y-4 lg:hidden">
        {orders.map((order, key) => (
          <div
            key={key}
            className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-black dark:text-white">
                  {order.id}
                </h3>
                <p className="mt-1 text-sm font-medium text-black dark:text-white">
                  {order.customer}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {order.address}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="space-y-2 border-t border-stroke pt-3 dark:border-strokedark">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Items:</span>
                <span className="font-medium text-black dark:text-white">
                  {order.items}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Date & Time:
                </span>
                <div className="text-right">
                  <div className="font-medium text-black dark:text-white">
                    {order.date}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {order.time}
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Driver:
                </span>
                <span className="font-medium text-black dark:text-white">
                  {order.driver}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Amount:
                </span>
                <span className="font-semibold text-black dark:text-white">
                  {order.amount}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Payment:
                </span>
                <span className="font-medium text-black dark:text-white">
                  {order.payment}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Status:
                </span>
                <span
                  className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
}
