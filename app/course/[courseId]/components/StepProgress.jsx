import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";

function StepProgress({ stepCount, setStepCount, data }) {
  return (
    <div className="flex items-center gap-4 w-full">
      {stepCount > 0 && (
        <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => setStepCount((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </Button>
        </motion.div>
      )}

      <div className="flex flex-1 items-center gap-2">
        {data.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index < stepCount 
                ? "bg-gradient-to-r from-blue-500 to-blue-600" 
                : "bg-gray-700"
            }`}
          />
        ))}
      </div>

      <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          onClick={() =>
            setStepCount((prev) => Math.min(prev + 1, data.length - 1))
          }
          disabled={stepCount >= data.length - 1}
        >
          Next
        </Button>
      </motion.div>
    </div>
  );
}

export default StepProgress;