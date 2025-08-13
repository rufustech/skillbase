// components/admin/AdminDashboard.jsx
import { useState } from "react";
import CourseForm from "./CourseForm";
import LessonForm from "./LessonForm";
import QuizForm from "./QuizForm";
import CourseManagement from "./CourseManagement";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("courses");

  const tabs = [
    { id: "courses", label: "Create Course" },
    { id: "lessons", label: "Create Lesson" },
    { id: "quizzes", label: "Create Quiz" },
    { id: "manage", label: "Manage Courses" },
  ];

  return (
    <div className="p-4 sm:ml-64">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#432010] mb-8">
          Admin Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full transition-all ${
                activeTab === tab.id
                  ? "bg-[#432010] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === "courses" && <CourseForm />}
          {activeTab === "lessons" && <LessonForm />}
          {activeTab === "quizzes" && <QuizForm />}
          {activeTab === "manage" && <CourseManagement />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
