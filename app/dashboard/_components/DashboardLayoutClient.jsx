"use client";
import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import DashboardHeader from "./DashboardHeader";
import { CourseCountContext } from "../../_context/CourseCountContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function DashboardLayoutClient({ children }) {
  const [totalCourse, setTotalCourse] = useState(0);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  if (!mounted || !isLoaded || !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      <div className="bg-gradient-to-br from-gray-900 to-gray-900 text-white min-h-screen">
        {/* Sidebar with subtle animation */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed hidden md:block w-64 h-full z-40"
        >
          <SideBar />
        </motion.div>

        {/* Main content area */}
        <div className="md:ml-64 transition-all duration-300">
          <DashboardHeader />
          
          {/* Content with smooth entrance */}
          <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-6 sm:p-8 md:p-10 min-h-[calc(100vh-64px)]"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </CourseCountContext.Provider>
  );
}

export default DashboardLayoutClient;