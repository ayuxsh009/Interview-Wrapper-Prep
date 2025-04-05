import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function CourseIntroCard({ course }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-6 items-center p-6 border border-gray-700 bg-gray-800/50 rounded-xl shadow-lg hover:shadow-xl transition-all"
    >
      <div className="p-3 bg-gray-700 rounded-lg border border-gray-600 flex-shrink-0">
        <Image 
          src={"/knowledge.png"} 
          alt="Course icon" 
          width={60} 
          height={60}
          className="filter brightness-110"
        />
      </div>
      
      <div className="space-y-3">
        <h2 className="font-bold text-2xl text-gray-100">
          {course?.courseLayout?.courseTitle}
        </h2>
        <p className="text-gray-400">
          {course?.courseLayout?.courseSummary}
        </p>
        
        <div className="space-y-1">
          <Progress 
            className="h-2 bg-gray-700" 
            indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <p className="text-xs text-gray-500">Progress: 0%</p>
        </div>

        <h2 className="text-lg text-blue-400">
          Total Chapters: {course?.courseLayout?.chapters?.length}
        </h2>
      </div>
    </motion.div>
  );
}

export default CourseIntroCard;