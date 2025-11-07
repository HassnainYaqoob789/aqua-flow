// app/page.tsx (unchanged from my previous update)
import DashboardPage from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <DashboardPage />
      </DefaultLayout>
    </>
  );
}
