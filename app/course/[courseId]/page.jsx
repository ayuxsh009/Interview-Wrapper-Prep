"use client";
import DashboardHeader from "@/app/dashboard/_components/DashboardHeader";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseIntroCard from "./components/CourseIntroCard";
import StudyMaterialSection from "./components/StudyMaterialSection";
import ChapterList from "./components/ChapterList";
import { motion } from "framer-motion";
import { toast } from "sonner";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCourse();
  }, [courseId]);

  const GetCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/api/courses?courseId=${courseId}`);
      setCourse(result.data.result);
    } catch (error) {
      toast.error("Failed to load course", {
        description: error.response?.data?.message || "Please try again later",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* <DashboardHeader /> */}
      
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        {loading ? (
          <div className="flex-1 space-y-6">
            <div className="h-48 bg-gray-800 rounded-xl animate-pulse"></div>
            <div className="flex-1 bg-gray-800 rounded-xl animate-pulse"></div>
            <div className="flex-1 bg-gray-800 rounded-xl animate-pulse"></div>
          </div>
        ) : course ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col space-y-6"
          >
            {/* Course Intro - Fixed Height */}
            <div className="h-fit">
              <CourseIntroCard course={course} />
            </div>
            
            {/* Study Materials - Flexible Space */}
            <div className="flex-1 min-h-[300px]">
              <StudyMaterialSection courseId={courseId} course={course} />
            </div>
            
            {/* Chapter List - Flexible Space */}
            <div className="flex-1 min-h-[300px]">
              <ChapterList course={course} />
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-xl text-gray-400">Course not found</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default Course;