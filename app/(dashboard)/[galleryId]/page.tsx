'use client';
import React from 'react'
import { useAuth } from "@clerk/nextjs";

interface DashboardParams {
  params: {
    galleryId: string
  }
}

const DashboardPage: React.FC<DashboardParams> = () => {
  return (
    <div>Dashboard</div>
  )
}

export default DashboardPage;