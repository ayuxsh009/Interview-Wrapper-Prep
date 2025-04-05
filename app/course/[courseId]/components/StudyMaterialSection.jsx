import React, { useEffect, useState } from "react";
import MaterialCardItem from "./MaterialCardItem";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";

function StudyMaterialSection({ courseId, course }) {
  const [studyTypeContent, setStudyTypeContent] = useState();
  const [loading, setLoading] = useState(true);

  const MaterialList = [
    {
      name: "Notes/Chapters",
      desc: "Read notes to prepare",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      desc: "Flashcards help to remember the concepts",
      icon: "/flashcard.png",
      path: "/flashcards",
      type: "flashcard",
    },
    {
      name: "Quiz",
      desc: "Great way to test your knowledge",
      icon: "/quiz.png",
      path: "/quiz",
      type: "quiz",
    },
    {
      name: "Question/Answer",
      desc: "Help to practice your learning",
      icon: "/qa.png",
      path: "/qa",
      type: "qa",
    },
  ];

  useEffect(() => {
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "ALL",
      });
      setStudyTypeContent(result?.data);
    } catch (error) {
      toast.error("Failed to load study materials");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="mt-8"
    >
      <h2 className="font-semibold text-2xl text-gray-200 mb-6">
        Study Material
      </h2>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index}
              className="h-40 bg-gray-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {MaterialList.map((item, index) => (
            <MaterialCardItem
              key={index}
              item={item}
              studyTypeContent={studyTypeContent}
              course={course}
              refreshData={GetStudyMaterial}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default StudyMaterialSection;