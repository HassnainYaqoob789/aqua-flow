"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  AlertCircle,
  Send,
  Download,
  Users,
} from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

export default function CustomerManagement() {

  const [customers] = useState([
    {
      id: "CUS-001",
      name: "John Doe",
      type: "individual",
      phone: "+1 555-0123",
      location: "Zone A",
      lastOrder: "Nov 4, 2025",
      lastOrderTime: "Today",
      spent: "$1,890",
      dueAmount: "$48.50",
      empties: 2,
      security: "$80",
      status: "active",
    },
    {
      id: "CUS-002",
      name: "Acme Corporation",
      type: "business",
      phone: "+1 555-0124",
      location: "Zone B",
      lastOrder: "Nov 4, 2025",
      lastOrderTime: "Today",
      spent: "$5,640",
      dueAmount: "Paid",
      empties: 5,
      security: "$400",
      status: "active",
    },
    {
      id: "CUS-003",
      name: "Jane Smith",
      type: "individual",
      phone: "+1 555-0125",
      location: "Zone A",
      lastOrder: "Nov 3, 2025",
      lastOrderTime: "Yesterday",
      spent: "$1,344",
      dueAmount: "$24.00",
      empties: 0,
      security: "$60",
      status: "active",
    },
    {
      id: "CUS-004",
      name: "City Hospital",
      type: "business",
      phone: "+1 555-0126",
      location: "Zone C",
      lastOrder: "Aug 15, 2025",
      lastOrderTime: "81 days ago",
      spent: "$3,780",
      dueAmount: "$240.00",
      empties: 10,
      security: "$600",
      status: "sleeping",
    },
    {
      id: "CUS-005",
      name: "TechStart Inc",
      type: "business",
      phone: "+1 555-0127",
      location: "Zone B",
      lastOrder: "Nov 2, 2025",
      lastOrderTime: "2 days ago",
      spent: "$4,320",
      dueAmount: "$96.00",
      empties: 3,
      security: "$300",
      status: "active",
    },
    {
      id: "CUS-006",
      name: "Robert Lee",
      type: "individual",
      phone: "+1 555-0128",
      location: "Zone C",
      lastOrder: "Oct 2, 2025",
      lastOrderTime: "33 days ago",
      spent: "$1,176",
      dueAmount: "$42.00",
      empties: 0,
      security: "$40",
      status: "sleeping",
    },
  ]);

  const [activeTab, setActiveTab] = useState("All");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border border-green-200";
      case "sleeping":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      case "overdue":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const sleepingCustomers = customers.filter(
    (c) => c.status === "sleeping",
  ).length;
  const overdueCustomers = customers.filter(
    (c) => c.dueAmount !== "Paid",
  ).length;
  const outstandingAmount = customers
    .reduce((sum, c) => {
      if (c.dueAmount !== "Paid") {
        return sum + parseFloat(c.dueAmount.replace("$", ""));
      }
      return sum;
    }, 0)
    .toFixed(2);

  const stats = [
    { label: "Total Customers", value: totalCustomers.toString() },
    {
      label: "Active",
      value: activeCustomers.toString(),
      color: "text-green-600",
    },
    {
      label: "Sleeping",
      value: sleepingCustomers.toString(),
      color: "text-orange-500",
    },
    {
      label: "Outstanding",
      value: `$${outstandingAmount}`,
      color: "text-red-600",
    },
  ];

  const tabs = [
    `All Customers (${totalCustomers})`,
    `Active (${activeCustomers})`,
    `Sleeping (${sleepingCustomers})`,
    `Overdue (${overdueCustomers})`,
  ];

  const filteredCustomers = customers.filter((customer) => {
    switch (activeTab) {
      case "All":
        return true;
      case "Active":
        return customer.status === "active";
      case "Sleeping":
        return customer.status === "sleeping";
      case "Overdue":
        return customer.dueAmount !== "Paid";
      default:
        return true;
    }
  });

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Customer Management"
        description="Manage and track all water delivery orders"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-3 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6 sm:py-8">
          <div className="flex justify-end">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 sm:text-sm">
                Export Data
              </button>
              <Link href="/customer/add-customer" className="sm:ml-auto">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto">
                  <Plus size={20} />
                  Add Customer
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-6">
          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-3 sm:gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, ID, phone..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-xs outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 sm:text-sm"
              />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 sm:text-sm">
              <Filter size={16} className="sm:size-[18px]" />
              <span>Filters</span>
            </button>
          </div>
          {/* Stats Cards */}
          <div className="mb-6 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6"
              >
                <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                  {stat.label}
                </p>
                <p
                  className={`mt-2 text-lg font-bold sm:text-2xl ${stat.color || "text-gray-900 dark:text-white"}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          {/* Filter Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(tab.split(" ")[0])}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  activeTab === tab.split(" ")[0]
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Customers Table - Responsive */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700">
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white sm:px-6 sm:py-4 sm:text-sm">
                    Customer
                  </th>
                  <th className="hidden px-3 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white sm:px-6 sm:py-4 sm:text-sm md:table-cell">
                    Contact & Location
                  </th>
                  <th className="hidden px-3 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white sm:px-6 sm:py-4 sm:text-sm lg:table-cell">
                    Last Order
                  </th>
                  <th className="hidden px-3 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white sm:px-6 sm:py-4 sm:text-sm lg:table-cell">
                    Financial
                  </th>
                  <th className="hidden px-3 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white sm:px-6 sm:py-4 sm:text-sm xl:table-cell">
                    Bottles & Empties
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white sm:px-6 sm:py-4 sm:text-sm">
                    Status
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white sm:px-6 sm:py-4 sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
                          {customer.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 sm:mt-1">
                          {customer.id} • {customer.type}
                        </p>
                        <div className="mt-1 space-y-0.5 md:hidden">
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            📞 {customer.phone}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            📍 {customer.location}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {customer.lastOrder} • {customer.lastOrderTime}
                          </p>
                          <p className="text-xs font-medium text-gray-900 dark:text-white">
                            {customer.spent} spent
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              customer.dueAmount === "Paid"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {customer.dueAmount}{" "}
                            {customer.dueAmount !== "Paid" ? "due" : ""}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            🚚 {customer.empties} empties • Security:{" "}
                            {customer.security}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 sm:px-6 sm:py-4 md:table-cell">
                      <div className="text-xs text-gray-900 dark:text-white sm:text-sm">
                        <p className="flex items-center gap-1">
                          📞 {customer.phone}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          📍 {customer.location}
                        </p>
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 sm:px-6 sm:py-4 lg:table-cell">
                      <div className="text-xs sm:text-sm">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {customer.lastOrder}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          ⏰ {customer.lastOrderTime}
                        </p>
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 sm:px-6 sm:py-4 lg:table-cell">
                      <div className="text-xs sm:text-sm">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {customer.spent} spent
                        </p>
                        <p
                          className={`mt-1 text-xs font-medium ${
                            customer.dueAmount === "Paid"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {customer.dueAmount}{" "}
                          {customer.dueAmount !== "Paid" ? "due" : ""}
                        </p>
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 sm:px-6 sm:py-4 xl:table-cell">
                      <div className="text-xs sm:text-sm">
                        <p className="flex items-center gap-1 font-medium text-gray-900 dark:text-white">
                          🚚 {customer.empties} empties
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Security: {customer.security}
                        </p>
                      </div>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(customer.status)}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <button className="p-1 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <Eye size={16} className="sm:size-[18px]" />
                        </button>
                        <button className="p-1 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <MoreVertical size={16} className="sm:size-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Alert Banner - Shows when Sleeping tab is active */}
        {activeTab === "Sleeping" && filteredCustomers.length > 0 && (
          <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20 sm:p-6">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600 dark:text-orange-500" />
              <div className="flex-1">
                <h3 className="mb-1 font-semibold text-orange-900 dark:text-orange-100">
                  Sleeping Customers Detected
                </h3>
                <p className="mb-4 text-sm text-orange-800 dark:text-orange-200">
                  {filteredCustomers.length} customer
                  {filteredCustomers.length !== 1 ? "s" : ""} haven't placed
                  orders in 15+ days. Re-engage them with promotional offers or
                  follow-up calls to boost retention.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700">
                    <Send size={16} />
                    Send Bulk Re-engagement SMS
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50 dark:border-orange-800 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700">
                    <Download size={16} />
                    Export List
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50 dark:border-orange-800 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700">
                    <Users size={16} />
                    Assign to Recovery Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
