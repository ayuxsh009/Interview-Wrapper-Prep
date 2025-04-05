"use client";
import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

function CreateCourse() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateCourseOutline = async () => {
    if (!formData.topic || !formData.difficultyLevel) {
      toast.error("Please fill in all fields");
      return;
    }

    const courseId = uuidv4();
    setLoading(true);
    
    try {
      await axios.post("/api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      toast.success("Your course is being generated!", {
        description: "This may take a few moments...",
      });
      
      router.replace("/dashboard");
    } catch (error) {
      toast.error("Failed to generate course", {
        description: error.message || "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center p-5 md:p-10 lg:p-12 xl:p-16 mt-4 md:mt-10 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl max-w-6xl mx-auto"
      >
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Build Your Personal Study Material
          </h2>
          <p className="text-gray-400 mt-3 text-base md:text-lg">
            Follow these simple steps to create customized learning content
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
          {[0, 1].map((stepIndex) => (
            <React.Fragment key={stepIndex}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${step === stepIndex ? 'bg-emerald-600 text-white' : 
                    step > stepIndex ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                {stepIndex + 1}
              </div>
              {stepIndex < 1 && (
                <div className="w-10 h-1 bg-gray-700"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: step === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: step === 0 ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 0 ? (
                <SelectOption
                  selectedStudyType={(value) => handleUserInput("courseType", value)}
                />
              ) : (
                <TopicInput
                  setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
                  setTopic={(value) => handleUserInput("topic", value)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between w-full md:w-2/3 mt-12 mb-6">
          {step !== 0 ? (
            <motion.div whileHover={{ x: -2 }}>
              <Button 
                variant="outline" 
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-900/50 px-6 py-3 hover:text-emerald-300"
                onClick={() => setStep(0)}
                disabled={loading}
              >
                Back
              </Button>
            </motion.div>
          ) : (
            <div></div>
          )}

          {step === 0 ? (
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button 
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 shadow-lg"
                onClick={() => setStep(1)}
                disabled={!formData.courseType}
              >
                Continue
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 shadow-lg"
                onClick={GenerateCourseOutline} 
                disabled={loading || !formData.topic || !formData.difficultyLevel}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></span>
                    Generating...
                  </span>
                ) : "Generate Material"}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default CreateCourse;