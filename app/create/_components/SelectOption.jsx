import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

function SelectOption({ selectedStudyType }) {
  const Options = [
    {
      name: "DSA",
      icon: "/job.png",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "Development",
      icon: "/practice.png",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Core Fundamentals",
      icon: "/code.png",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Other",
      icon: "/knowledge.png",
      color: "from-orange-500 to-orange-600"
    },
  ];
  
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm text-white p-6 rounded-xl border border-gray-700 shadow-lg">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 text-xl font-semibold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent"
      >
        What type of preparation do you need?
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {Options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`p-5 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300 border-2
              ${option.name === selectedOption 
                ? `border-transparent bg-gradient-to-br ${option.color} shadow-lg`
                : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:shadow-md'}`}
            onClick={() => {
              setSelectedOption(option.name);
              selectedStudyType(option.name);
            }}
          >
            <div className={`p-3 rounded-lg mb-3 ${option.name === selectedOption ? 'bg-white/10' : 'bg-gray-700/50'}`}>
              <Image 
                src={option.icon} 
                alt={option.name} 
                width={40} 
                height={40} 
                className="filter brightness-125"
              />
            </div>
            <h2 className="text-sm font-medium text-center">{option.name}</h2>
            
            {option.name === selectedOption && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-2 text-xs text-white/80"
              >
                ✓ Selected
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SelectOption;