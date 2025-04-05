import React from "react";
import DashboardHeader from "../dashboard/_components/DashboardHeader";

function CourseViewLayout({ children }) {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <DashboardHeader />
      <div className=" dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}

export default CourseViewLayout;