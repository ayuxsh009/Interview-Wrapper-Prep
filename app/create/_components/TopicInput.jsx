import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

function TopicInput({ setTopic, setDifficultyLevel }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/80 backdrop-blur-sm text-white p-6 rounded-xl border border-gray-700 shadow-lg"
    >
      <motion.h2 
        whileHover={{ x: 2 }}
        className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
      >
        What topic would you like to study?
      </motion.h2>
      
      <motion.div whileHover={{ scale: 1.005 }}>
        <Textarea
          placeholder="Example: Explain React hooks like useState and useEffect..."
          className="mt-2 min-h-[150px] bg-gray-800/50 text-white border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
          onChange={(event) => setTopic(event.target.value)}
        />
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-6 mb-3 text-lg font-medium text-gray-300"
      >
        Select difficulty level
      </motion.h2>
      
      <Select onValueChange={(value) => setDifficultyLevel(value)}>
        <motion.div whileHover={{ y: -1 }}>
          <SelectTrigger className="w-full bg-gray-800/50 text-white border-gray-600 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all">
            <SelectValue placeholder="Choose difficulty..." />
          </SelectTrigger>
        </motion.div>
        <SelectContent className="bg-gray-800 border-gray-600 shadow-xl">
          <SelectItem 
            value="Easy" 
            className="text-green-400 hover:bg-gray-700/50 focus:text-green-400"
          >
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Easy
            </span>
          </SelectItem>
          <SelectItem 
            value="Moderate" 
            className="text-yellow-400 hover:bg-gray-700/50 focus:text-yellow-400"
          >
            <span className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Moderate
            </span>
          </SelectItem>
          <SelectItem 
            value="Hard" 
            className="text-red-400 hover:bg-gray-700/50 focus:text-red-400"
          >
            <span className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Hard
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-3 text-sm text-gray-400">
        We'll tailor the material to match the selected difficulty level.
      </motion.p>
    </motion.div>
  );
}

export default TopicInput;