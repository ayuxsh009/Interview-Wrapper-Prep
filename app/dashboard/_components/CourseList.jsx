"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { motion, AnimatePresence } from "framer-motion";

function CourseList() {
  const { user, isLoaded } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setTotalCourse } = useContext(CourseCountContext);

  useEffect(() => {
    if (isLoaded && user) {
      GetCourseList();
    }
  }, [isLoaded, user]);

  const GetCourseList = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      setLoading(true);
      const result = await axios.post("/api/courses", {
        createdBy: user.primaryEmailAddress.emailAddress,
      });
      setCourseList(result.data.result || []);
      setTotalCourse(result.data.result.length);
    } catch (error) {
      console.error("Error fetching course list:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !user) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 bg-gray-900/80 backdrop-blur-sm text-white p-6 rounded-xl border border-gray-700 shadow-xl">
      <div className="flex justify-between items-center">
        <motion.h2 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
        >
          Your Study Material
        </motion.h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={GetCourseList}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-blue-400 hover:text-blue-300 transition-all"
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <AnimatePresence>
          {!loading ? (
            courseList?.map((course, index) => (
              <motion.div
                key={course.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CourseCardItem course={course} />
              </motion.div>
            ))
          ) : (
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-64 w-full bg-gray-800 rounded-xl animate-pulse"
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {!loading && courseList.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              <path d="M16 8V6H8v2" />
              <path d="M12 6v7" />
              <path d="M10 13h4" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-300">No courses found</h3>
          <p className="text-gray-500 mt-2 max-w-md">
            Create your first study material to get started with your learning journey
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default CourseList;