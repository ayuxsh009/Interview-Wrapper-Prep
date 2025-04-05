import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-bold text-white">Interview-Wrapper</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/dashboard">
            <button className="px-3 md:px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-sm md:text-base">
              Dashboard
            </button>
          </Link>
        </div>
      </nav>

      {/* New Badge Banner */}
   

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 mt-8 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Icon */}
          <div className="hidden md:flex md:col-span-3 justify-end">
            <div className="relative transform -rotate-12">
              <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-1">
                    <div className="w-4 h-12 bg-yellow-400 rounded"></div>
                    <div className="w-4 h-8 bg-yellow-400 rounded"></div>
                    <div className="w-4 h-10 bg-yellow-400 rounded"></div>
                  </div>
                  <div className="w-4 h-4 bg-red-500 rounded-full mt-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="md:col-span-6 text-center">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
                <div className="flex flex-wrap justify-center whitespace-normal md:whitespace-nowrap">
                  <span className="text-white">AI-Powered </span>
                  <span className="text-blue-400">Interview Prep</span>
                </div>
                <div className="mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  Material Generator
                </div>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-xl px-4">
                Your AI Interview Prep: Effortless Study Material at Your
                Fingertips
              </p>
              <div className="flex justify-center mt-6 md:mt-8">
                <Link href="/dashboard">
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 font-semibold text-base md:text-xl">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Icon */}
          <div className="hidden md:flex md:col-span-3 justify-start">
            <div className="transform rotate-12">
              <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-3xl md:text-4xl font-mono text-blue-400">
                  {"</>"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Removed the "Made with" section as requested */}
      <footer className="py-4 md:py-6"></footer>
    </div>
  );
};

export default LandingPage;