"use client";
import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { motion } from "framer-motion";

function SideBar() {
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
  ];

  const { totalCourse } = useContext(CourseCountContext);
  const path = usePathname();
  const creditsRemaining = 100 - totalCourse;

  return (
    <div className="h-screen shadow-lg p-5 bg-gray-900/90 backdrop-blur-sm border-r border-gray-700 text-gray-100 flex flex-col">
      {/* Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 items-center p-2"
      >
        <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
          <Image 
            src={"/logo.png"} 
            alt="logo" 
            width={32} 
            height={32} 
            className="filter brightness-125"
          />
        </div>
        <h2 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Interview-Wrapper
        </h2>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-8">
        {/* Create New Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mb-8"
        >
          <Link href={"/create"} className="w-full">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-700/30 transition-all">
              + Create New
            </Button>
          </Link>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2">
          {MenuList.map((menu, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={menu.path}
                className={`flex gap-4 items-center p-3 rounded-lg transition-all ${
                  path === menu.path
                    ? "bg-gray-800 shadow-inner border border-gray-700"
                    : "hover:bg-gray-800/50"
                }`}
              >
                <menu.icon className={`h-5 w-5 ${
                  path === menu.path ? "text-blue-400" : "text-gray-400"
                }`} />
                <span className={`${
                  path === menu.path ? "text-white font-medium" : "text-gray-300"
                }`}>
                  {menu.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credits Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 mb-4"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-300">Available Credits</h3>
          <span className={`text-sm font-medium ${
            creditsRemaining < 20 ? "text-red-400" : "text-blue-400"
          }`}>
            {creditsRemaining}/100
          </span>
        </div>
        <Progress 
          value={totalCourse} 
          className="h-2 bg-gray-700" 
          indicatorClassName={`${
            creditsRemaining < 20 ? "bg-red-500" : "bg-gradient-to-r from-blue-500 to-blue-600"
          }`}
        />
        <p className="text-xs text-gray-400 mt-2">
          {totalCourse} credits used • {creditsRemaining} remaining
        </p>
        
        {creditsRemaining < 20 && (
          <Link href="/dashboard/upgrade">
            <Button 
              size="sm" 
              className="w-full mt-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs"
            >
              Upgrade Plan
            </Button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}

export default SideBar;