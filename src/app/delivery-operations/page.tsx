// "use client";

// import React, { useState } from "react";
// import {
//   MapPin,
//   Truck,
//   Phone,
//   Clock,
//   Check,
//   Users,
//   Package,
// } from "lucide-react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// export default function DeliveryOperations() {
//   const [isLive, setIsLive] = useState(true);

//   const stats = [
//     {
//       label: "Active Drivers",
//       value: "3/4",
//       icon: Users,
//       color: "text-blue-600",
//     },
//     { label: "In Transit", value: "8", icon: Truck, color: "text-green-600" },
//     {
//       label: "Completed Today",
//       value: "41",
//       icon: Check,
//       color: "text-emerald-600",
//     },
//     {
//       label: "Pending Assignment",
//       value: "12",
//       icon: Package,
//       color: "text-orange-600",
//     },
//   ];

//   const drivers = [
//     {
//       id: "TR-1234",
//       name: "Michael Johnson",
//       status: "delivering",
//       eta: "ETA 15 min",
//       completed: 8,
//       pending: 3,
//       color: "bg-blue-500",
//     },
//     {
//       id: "TR-1235",
//       name: "Sarah Williams",
//       status: "available",
//       eta: "",
//       completed: 12,
//       pending: 0,
//       color: "bg-green-500",
//     },
//     {
//       id: "TR-1236",
//       name: "David Brown",
//       status: "delivering",
//       eta: "ETA 25 min",
//       completed: 6,
//       pending: 1,
//       color: "bg-blue-500",
//     },
//     {
//       id: "TR-1237",
//       name: "Emma Davis",
//       status: "offline",
//       eta: "",
//       completed: 15,
//       pending: 0,
//       color: "bg-gray-500",
//     },
//   ];

//   const pendingOrders = [
//     {
//       id: "#1238",
//       customer: "John Smith",
//       address: "123 Oak St",
//       time: "2:30 PM",
//       items: "2x 20L",
//     },
//     {
//       id: "#1239",
//       customer: "Acme Corp",
//       address: "456 Business Ave",
//       time: "3:30 PM",
//       items: "10x 20L",
//     },
//     {
//       id: "#1240",
//       customer: "Green Valley School",
//       address: "789 School Ln",
//       time: "5:30 PM",
//       items: "5x 20L",
//     },
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "delivering":
//         return "bg-blue-100 text-blue-800";
//       case "available":
//         return "bg-green-100 text-green-800";
//       case "offline":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <DefaultLayout>
//       <Breadcrumb
//         pageName="Delivery Operations"
//         description="Real-time tracking & fleet management"
//       />

//       {/* Stats */}
//       <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
//         {stats.map((stat, i) => {
//           const Icon = stat.icon;
//           return (
//             <div
//               key={i}
//               className="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark"
//             >
//               <div className="mb-2 flex items-center justify-between">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {stat.label}
//                 </p>
//                 <Icon className={`h-5 w-5 ${stat.color}`} />
//               </div>
//               <p className="text-xl font-bold text-black dark:text-white">
//                 {stat.value}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Live GPS Tracking */}
//       <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark lg:col-span-2">
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-black dark:text-white">
//                 Live GPS Tracking
//               </h3>
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`h-2 w-2 rounded-full ${isLive ? "bg-green-500" : "bg-gray-400"}`}
//                 ></span>
//                 <span className="text-sm font-medium">
//                   {isLive ? "Live" : "Offline"}
//                 </span>
//               </div>
//             </div>
//             <div className="relative h-96 overflow-hidden rounded-lg bg-[#f7faff] dark:bg-slate-800">
//               <div
//                 className="absolute inset-0"
//                 style={{
//                   backgroundImage: `
//                     linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
//                     linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
//                   `,
//                   backgroundSize: "40px 40px",
//                 }}
//               />
//               <div className="absolute left-[25%] top-[35%]">
//                 <div className="rounded-full bg-red-500 p-1.5 shadow-md">
//                   <MapPin size={14} className="text-white" />
//                 </div>
//               </div>
//               <div className="absolute left-[40%] top-[50%] rotate-[25deg]">
//                 <div className="rounded-full bg-green-500 p-1.5 shadow-md">
//                   <Truck size={14} className="text-white" />
//                 </div>
//               </div>
//               <div className="absolute left-[55%] top-[60%] rotate-[40deg]">
//                 <div className="rounded-full bg-blue-500 p-1.5 shadow-md">
//                   <Truck size={14} className="text-white" />
//                 </div>
//               </div>
//               <div className="absolute left-[70%] top-[55%]">
//                 <div className="rounded-full bg-gray-400 p-1.5 shadow-md">
//                   <Truck size={14} className="text-white" />
//                 </div>
//               </div>
//               <div className="absolute left-[35%] top-[25%] rotate-[10deg]">
//                 <div className="rounded-full bg-green-500 p-1.5 shadow-md">
//                   <Truck size={14} className="text-white" />
//                 </div>
//               </div>
//               <div className="absolute left-[45%] top-[35%]">
//                 <div className="rounded-full bg-red-500 p-1.5 shadow-md">
//                   <MapPin size={14} className="text-white" />
//                 </div>
//               </div>
//             </div>
//           </div> */}

//         {/* Active Drivers List */}
//         <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//           <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
//             Active Drivers
//           </h3>
//           <div className="space-y-4">
//             {drivers.map((driver, i) => (
//               <div key={i} className="rounded-lg border border-gray-200 p-3">
//                 <div className="mb-2 flex items-center justify-between">
//                   <div
//                     className={`h-2 w-2 rounded-full ${
//                       driver.status === "delivering"
//                         ? "bg-blue-500"
//                         : driver.status === "available"
//                           ? "bg-green-500"
//                           : "bg-gray-500"
//                     }`}
//                   ></div>
//                   <span
//                     className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
//                       driver.status,
//                     )}`}
//                   >
//                     {driver.status}
//                   </span>
//                 </div>
//                 <div className="mb-2 flex items-center gap-2">
//                   <div
//                     className={`h-8 w-8 rounded-full ${driver.color} flex items-center justify-center text-xs font-bold text-white`}
//                   >
//                     {driver.id.slice(-2)}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-black dark:text-white">
//                       {driver.name}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {driver.id}
//                     </p>
//                   </div>
//                 </div>
//                 {driver.eta && (
//                   <p className="mb-2 text-xs text-blue-600">{driver.eta}</p>
//                 )}
//                 <p className="text-xs text-gray-600 dark:text-gray-400">
//                   {driver.completed} completed • {driver.pending} pending
//                 </p>
//                 <button className="mt-2 flex w-full items-center justify-center gap-1 rounded bg-gray-100 py-1 text-xs hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
//                   <Phone size={12} />
//                   Call
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Pending Assignments */}
//       <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-strokedark">
//           <h3 className="text-lg font-semibold text-black dark:text-white">
//             Pending Assignment
//           </h3>
//           <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
//             Auto-assign
//           </button>
//         </div>
//         <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
//           {pendingOrders.map((order, i) => (
//             <div key={i} className="rounded-lg border border-gray-200 p-4">
//               <div className="mb-2 flex items-center justify-between">
//                 <h4 className="font-semibold text-black dark:text-white">
//                   {order.id}
//                 </h4>
//                 <div className="h-2 w-2 rounded-full bg-gray-300"></div>
//               </div>
//               <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
//                 {order.customer}
//               </p>
//               <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
//                 {order.address}
//               </p>
//               <div className="mb-3 flex items-center gap-2">
//                 <Clock size={12} className="text-gray-400" />
//                 <span className="text-xs text-gray-500 dark:text-gray-400">
//                   {order.time}
//                 </span>
//               </div>
//               <p className="mb-4 text-xs font-medium text-gray-700 dark:text-gray-300">
//                 {order.items}
//               </p>
//               <button className="w-full rounded-md bg-blue-600 py-2 text-xs font-medium text-white hover:bg-blue-700">
//                 Assign Driver
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// }
import { MapPin, Truck, Phone, Clock, Check, Users, Package } from "lucide-react";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function DeliveryOperations() {
  const stats = [
    {
      label: "Active Drivers",
      value: "3/4",
      icon: Users,
      color: "text-blue-600",
    },
    { label: "In Transit", value: "8", icon: Truck, color: "text-green-600" },
    {
      label: "Completed Today",
      value: "41",
      icon: Check,
      color: "text-emerald-600",
    },
    {
      label: "Pending Assignment",
      value: "12",
      icon: Package,
      color: "text-orange-600",
    },
  ];

  const drivers = [
    {
      id: "TR-1234",
      name: "Michael Johnson",
      status: "delivering",
      eta: "ETA 15 min",
      completed: 8,
      pending: 3,
      color: "bg-blue-500",
    },
    {
      id: "TR-1235",
      name: "Sarah Williams",
      status: "available",
      eta: "",
      completed: 12,
      pending: 0,
      color: "bg-green-500",
    },
    {
      id: "TR-1236",
      name: "David Brown",
      status: "delivering",
      eta: "ETA 25 min",
      completed: 6,
      pending: 1,
      color: "bg-blue-500",
    },
    {
      id: "TR-1237",
      name: "Emma Davis",
      status: "offline",
      eta: "",
      completed: 15,
      pending: 0,
      color: "bg-gray-500",
    },
  ];

  const pendingOrders = [
    {
      id: "#1238",
      customer: "John Smith",
      address: "123 Oak St",
      time: "2:30 PM",
      items: "2x 20L",
    },
    {
      id: "#1239",
      customer: "Acme Corp",
      address: "456 Business Ave",
      time: "3:30 PM",
      items: "10x 20L",
    },
    {
      id: "#1240",
      customer: "Green Valley School",
      address: "789 School Ln",
      time: "5:30 PM",
      items: "5x 20L",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "delivering":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "offline":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Delivery Operations"
        description="Real-time tracking & fleet management"
      />

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Active Drivers List */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:col-span-1">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Active Drivers
              </h3>
            </div>
            <div className="space-y-3 p-6">
              {drivers.map((driver, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`h-10 w-10 rounded-full ${driver.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}
                      >
                        {driver.id.slice(-2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {driver.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {driver.id}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`ml-2 inline-flex whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        driver.status
                      )}`}
                    >
                      {driver.status}
                    </span>
                  </div>
                  {driver.eta && (
                    <p className="mb-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                      ⏱️ {driver.eta}
                    </p>
                  )}
                  <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{driver.completed}</span> completed •{" "}
                    <span className="font-medium">{driver.pending}</span> pending
                  </p>
                  <button className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700">
                    <Phone size={14} />
                    Call Driver
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Overview & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Avg Delivery Time
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  23 min
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  On-time Rate
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  94%
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Total Distance
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  127 km
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Deliveries
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          Order #{1230 + item}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Completed at 2:{item}5 PM
                        </p>
                      </div>
                    </div>
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pending Assignment
            </h3>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Auto-assign
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
            {pendingOrders.map((order, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {order.id}
                  </h4>
                  <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                </div>
                <p className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {order.customer}
                </p>
                <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                  📍 {order.address}
                </p>
                <div className="mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {order.time}
                  </span>
                </div>
                <div className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  {order.items}
                </div>
                <button className="w-full rounded-lg bg-blue-600 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700">
                  Assign Driver
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}