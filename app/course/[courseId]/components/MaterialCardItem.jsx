import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);
  const isReady = studyTypeContent?.[item.type]?.length > 0;

  const GenerateContent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let chapters = course?.courseLayout?.chapters
        .map(chapter => chapter?.chapterTitle)
        .join(',');

      await axios.post("/api/study-type-content", {
        courseId: course?.courseId,
        type: item.name,
        chapters: chapters,
      });

      refreshData(true);
      toast.success(`${item.name} content generated successfully`);
    } catch (error) {
      toast.error(`Failed to generate ${item.name} content`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        href={isReady ? `/course/${course?.courseId}${item.path}` : '#'}
        onClick={e => !isReady && e.preventDefault()}
      >
        <div
          className={`border border-gray-700 shadow-lg rounded-xl p-5 flex flex-col items-center bg-gray-800/50 hover:bg-gray-800 transition-all ${
            !isReady && "grayscale hover:grayscale-0"
          }`}
        >
          <div className={`px-3 py-1 rounded-full text-xs font-medium mb-3 ${
            isReady ? "bg-green-600/20 text-green-400" : "bg-gray-700 text-gray-400"
          }`}>
            {isReady ? "Ready" : "Generate"}
          </div>

          <div className="p-3 bg-gray-700 rounded-lg mb-3">
            <Image 
              src={item.icon} 
              alt={item.name} 
              width={40} 
              height={40}
              className="filter brightness-125"
            />
          </div>

          <h2 className="font-medium text-gray-200 text-center">{item.name}</h2>
          <p className="text-gray-400 text-sm text-center mt-1">{item.desc}</p>

          {!isReady ? (
            <Button
              className="mt-4 w-full bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200"
              onClick={GenerateContent}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </span>
              ) : "Generate"}
            </Button>
          ) : (
            <Button 
              className="mt-4 w-full bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/30 text-blue-400"
            >
              View Content
            </Button>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default MaterialCardItem;