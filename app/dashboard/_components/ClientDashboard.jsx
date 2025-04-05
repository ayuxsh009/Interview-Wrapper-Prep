"use client";

import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import CourseList from "./CourseList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

function ClientDashboard() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4 sm:p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <WelcomeBanner />
        
        {/* Mobile Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center mt-6 sm:hidden gap-3"
        >
          <Link href="/create" className="w-1/2">
            <Button 
              className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white 
                        shadow-lg hover:shadow-blue-500/20 transition-all duration-300
                        h-12 rounded-xl font-medium text-sm"
            >
              <span className="drop-shadow-md">+ Create New</span>
            </Button>
          </Link>
          <Link href="/dashboard/upgrade" className="w-1/2">
            <Button 
              className="w-full bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 
                        text-white shadow-lg hover:shadow-emerald-500/20 transition-all duration-300
                        h-12 rounded-xl font-medium text-sm"
            >
              <span className="drop-shadow-md">Upgrade</span>
            </Button>
          </Link>
        </motion.div>

        {/* Desktop Action Buttons (floating) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden sm:flex justify-end gap-4 mt-6"
        >
          <Link href="/create">
            <Button 
              className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white 
                        px-6 py-3 shadow-lg hover:shadow-blue-500/20 transition-all duration-300
                        rounded-xl font-medium flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              <span className="drop-shadow-md">Create New</span>
            </Button>
          </Link>
         
        </motion.div>

        {/* Course List with subtle entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10"
        >
          <CourseList />
        </motion.div>
      </div>
    </div>
  );
}
export default ClientDashboard;