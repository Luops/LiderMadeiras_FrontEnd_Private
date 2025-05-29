"use client";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

// Context
import { useAuth } from "../../../context/AuthContext";

// Components
import { DashboardAside } from "../../../components/DashboardAside";
import ImageGallery from "@/src/components/ImageGallery";
import ImageManager from "@/src/components/ImageManager";

function Dashboard() {
  const [refreshFlag, setRefreshFlag] = React.useState(false);

  const { user } = useAuth();

  const refreshImages = () => {
    setRefreshFlag((f) => !f);
  };

  if (!user) {
    redirect("/");
  }
  return (
    <main className="flex min-h-screen">
      <div className="flex-grow md">
        <DashboardAside />
        <div className="min-[768px]:pl-64">
          <ImageGallery refreshFlag={refreshFlag} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
