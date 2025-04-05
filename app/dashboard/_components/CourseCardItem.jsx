"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function CourseCardItem({ course }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="border border-gray-700 rounded-xl shadow-lg p-6 bg-gray-800/80 hover:bg-gray-800 text-white backdrop-blur-sm 
                 transition-all duration-300 hover:shadow-blue-900/20 hover:border-gray-600"
    >
      <div>
        <div className="flex justify-between items-start">
          <div className="p-2 bg-gray-700 rounded-lg">
            <Image 
              src={"/knowledge.png"} 
              alt="Course icon" 
              width={40} 
              height={40} 
              className="filter brightness-125"
            />
          </div>
          <span className={`text-xs font-medium px-3 py-1 rounded-full 
                           ${course?.status === "Generating" ? 
                             'bg-yellow-500/20 text-yellow-400' : 
                             'bg-blue-500/20 text-blue-400'}`}>
            {course?.status}
          </span>
        </div>

        <h2 className="mt-4 font-semibold text-lg text-gray-100 line-clamp-2">
          {course?.courseLayout?.courseTitle}
        </h2>
        <p className="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
          {course?.courseLayout?.courseSummary}
        </p>

        <div className="mt-5 space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progress</span>
            <span>0%</span>
          </div>
          <Progress 
            value={0} 
            className="h-2 bg-gray-700/50" 
            indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-600"
          />
        </div>

        <div className="mt-6 flex justify-end">
          {course?.status == "Generating" ? (
            <Button 
              disabled 
              className="bg-gray-700 text-gray-300 px-5 py-2 rounded-lg
                        border border-gray-600 hover:bg-gray-700 cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                </span>
                Generating...
              </span>
            </Button>
          ) : (
            <Link href={"/course/" + course?.courseId}>
              <Button 
                className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                          text-white px-5 py-2 rounded-lg shadow-md hover:shadow-blue-700/30 transition-all duration-300"
              >
                View Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CourseCardItem;