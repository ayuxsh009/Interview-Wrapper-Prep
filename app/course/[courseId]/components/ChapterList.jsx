import React from "react";
import { motion } from "framer-motion";

function ChapterList({ course }) {
  const CHAPTERS = course?.courseLayout?.chapters;
  
  return (
    <div className="mt-8">
      <h2 className="font-semibold text-xl text-gray-200 mb-4">Course Chapters</h2>
      
      <div className="space-y-3">
        {CHAPTERS?.map((chapter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="flex gap-4 items-center p-4 border border-gray-700 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            <div className="text-2xl p-2 bg-gray-700 rounded-lg flex-shrink-0">
              {chapter?.emoji}
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-gray-100 truncate">{chapter?.chapterTitle}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">{chapter?.chapterSummary}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;