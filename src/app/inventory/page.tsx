"use client";

import React, { useState } from "react";
import { Search, Filter, Plus, MoreVertical, Droplets, AlertTriangle, DollarSign, Clock, User, Check, RotateCcw, Eye } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function InventoryManagement() {
  const [bottles] = useState([
    {
      size: "20L",
      price: "$12.00",
      issued: 345,
      available: 155,
      percentage: 31,
      security: "$0.00",
      lowStock: true,
    },
    {
      size: "10L",
      price: "$8.00",
      issued: 180,
      available: 120,
      percentage: 40,
      security: "$500.00",
    },
    {
      size: "5L",
      price: "$5.00",
      issued: 85,
      available: 115,
      percentage: 57,
      security: "$950.00",
    },
  ]);

  const [transactions] = useState([
    {
      type: "issue",
      customer: "John Doe",
      date: "Nov 2, 2025",
      time: "2:30 PM",
    },
    {
      type: "return",
      customer: "Green Valley",
      date: "Nov 5, 2025",
      time: "11:45 AM",
    },
    {
      type: "issue",
      customer: "TechStart",
      date: "Nov 4, 2025",
      time: "4:20 PM",
    },
  ]);

  const [customers] = useState([
    {
      name: "Acme Corp",
      issued: 20,
      returned: 15,
      pending: 5,
      deposit: "$400",
      lastReturn: "Nov 3, 2025",
    },
    {
      name: "City Hospital",
      issued: 30,
      returned: 20,
      pending: 10,
      deposit: "$600",
      lastReturn: "Nov 15, 2025",
    },
    {
      name: "TechStart Inc",
      issued: 15,
      returned: 12,
      pending: 3,
      deposit: "$300",
      lastReturn: "Nov 1, 2025",
    },
    {
      name: "John Doe",
      issued: 4,
      returned: 2,
      pending: 2,
      deposit: "$80",
      lastReturn: "Oct 28, 2025",
    },
  ]);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Inventory Management"
        description="Track bottles, empties, and securities"
      />

      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="block sm:hidden">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Inventory Management
          </h2>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 sm:ml-auto sm:w-auto">
          <Plus size={20} />
          Record Transaction
        </button>
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
            placeholder="Search bottles, customers..."
            className="w-full rounded-lg border border-stroke bg-transparent py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
          />
        </div>
        <div className="flex gap-3 sm:gap-4">
          <select className="flex-1 rounded-lg border border-stroke bg-transparent px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input sm:flex-none sm:px-4 sm:text-base">
            <option value="">All Items</option>
            <option value="20l">20L Bottles</option>
            <option value="10l">10L Bottles</option>
            <option value="5l">5L Bottles</option>
          </select>
          <button className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-stroke px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4 sm:px-4 sm:text-base">
            <Filter size={20} />
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-4">
        <div className="relative rounded-sm border border-stroke bg-white px-4 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            <Droplets className="inline mr-1 h-3 w-3" />
            Total Bottles
          </p>
          <p className="text-2xl font-bold text-black dark:text-white sm:text-3xl">1,000</p>
        </div>
        <div className="relative rounded-sm border border-stroke bg-white px-4 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            <Check className="inline mr-1 h-3 w-3 text-green-600" />
            Issued
          </p>
          <p className="text-2xl font-bold text-green-600 sm:text-3xl">610</p>
        </div>
        <div className="relative rounded-sm border border-stroke bg-white px-4 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            <Clock className="inline mr-1 h-3 w-3 text-orange-500" />
            Pending
          </p>
          <p className="text-2xl font-bold text-orange-500 sm:text-3xl">85</p>
        </div>
        <div className="relative rounded-sm border border-stroke bg-white px-4 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
          <p className="mb-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            <DollarSign className="inline mr-1 h-3 w-3 text-purple-600" />
            Security Deposits
          </p>
          <p className="text-2xl font-bold text-purple-600 sm:text-3xl">$1,045</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {bottles.some((b) => b.lowStock) && (
        <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Low Stock Alert
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                20L bottles are low (31% available). Consider restocking.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stock Levels and Recent Transactions */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bottle Stock Levels */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Bottle Stock Levels</h3>
          {bottles.map((bottle, key) => (
            <div key={key} className="mb-6 last:mb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-black dark:text-white">{bottle.size} Bottle</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{bottle.price} per bottle</p>
                  </div>
                </div>
                {bottle.lowStock && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                    <AlertTriangle size={12} />
                    Low
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Issued</span>
                  <span className="font-medium">{bottle.issued}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Available</span>
                  <span className="font-medium">{bottle.available}</span>
                </div>
                <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-2 rounded-full ${
                      bottle.lowStock ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${bottle.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{bottle.percentage}%</span>
                  <span>Security Deposit {bottle.security}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((trans, key) => (
              <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className={`p-2 rounded-full ${
                  trans.type === "issue" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                }`}>
                  {trans.type === "issue" ? (
                    <Check size={16} />
                  ) : (
                    <RotateCcw size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-black dark:text-white">{trans.customer}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{trans.date} • {trans.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empties & Securities Tracking Table */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stroke dark:border-strokedark">
          <h3 className="text-lg font-semibold text-black dark:text-white">Empties & Securities Tracking</h3>
          <button className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-stroke px-3 py-2 text-sm transition-colors hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4">
            <RotateCcw size={16} />
            Reconcile Returns
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-6 py-4 font-medium text-black dark:text-white">Customer</th>
                <th className="px-6 py-4 font-medium text-black dark:text-white">Issued</th>
                <th className="px-6 py-4 font-medium text-black dark:text-white">Returned</th>
                <th className="px-6 py-4 font-medium text-black dark:text-white">Pending Return</th>
                <th className="px-6 py-4 font-medium text-black dark:text-white">Security Deposit</th>
                <th className="px-6 py-4 font-medium text-black dark:text-white">Last Return</th>
                <th className="px-6 py-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-6 py-5 dark:border-strokedark">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                        <User size={14} />
                      </div>
                      <p className="font-medium text-black dark:text-white">{customer.name}</p>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] px-6 py-5 dark:border-strokedark">
                    <span className="font-medium text-black dark:text-white">{customer.issued}</span>
                  </td>
                  <td className="border-b border-[#eee] px-6 py-5 dark:border-strokedark">
                    <span className="font-medium text-black dark:text-white">{customer.returned}</span>
                  </td>
                  <td className="border-b border-[#eee] px-6 py-5 dark:border-strokedark">
                    <span className="font-medium text-orange-600">{customer.pending}</span>
                  </td>
                  <td className="border-b border-[#eee] px-6 py-5 dark:border-strokedark">
                    <span className="font-medium text-black dark:text-white">{customer.deposit}</span>
                  </td>
                  <td className="border-b border-[#eee] px-6 py-5 dark:border-strokedark">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{customer.lastReturn}</span>
                  </td>
                  <td className="border-b border-[#eee] px-6 py-5 dark:border-strokedark">
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                      <RotateCcw size={14} />
                      Record Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}