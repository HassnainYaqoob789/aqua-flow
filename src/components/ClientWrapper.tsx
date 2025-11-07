// src/components/ClientWrapper.tsx (naya file banao)
"use client";  // Top pe, pehli line!
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
interface ClientWrapperProps {
  children: React.ReactNode;
  onSidebarToggle?: (open: boolean) => void;  // Optional: Sidebar ke liye future
}
export default function ClientWrapper({ children, onSidebarToggle }: ClientWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);  // Loader 1 sec
  }, []);
  // Sidebar toggle handler (agar use karna ho future mein)
  const toggleSidebar = () => {
    const newOpen = !sidebarOpen;
    setSidebarOpen(newOpen);
    onSidebarToggle?.(newOpen);
  };
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? <Loader /> : children}
      {/* Sidebar state pass kar sakte ho props se, agar component mein chahiye */}
    </div>
  );
}