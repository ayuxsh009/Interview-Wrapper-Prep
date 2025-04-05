"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";

function WelcomeBanner() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 w-full text-white rounded-xl border border-gray-700 flex items-center gap-6 shadow-lg overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-600/10 rounded-full blur-xl"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-400/5 rounded-full blur-xl"></div>
      
      {/* Image with subtle animation */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="hidden sm:block"
      >
        <Image 
          src={"/laptop.png"} 
          alt="laptop" 
          width={120} 
          height={120} 
          className="drop-shadow-lg"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Hello, {user?.fullName || "there"} 👋
        </h2>
        <p className="text-gray-300 mt-2 max-w-md">
          Welcome back to your learning journey! Ready to ace your next interview?
        </p>
        
        {/* Progress indicator (example) */}
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>All systems operational</span>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeBanner;