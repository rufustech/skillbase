import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { FaGraduationCap, FaClock, FaBook } from "react-icons/fa";

function htmlToText(html) {
  const div = document.createElement("div");
  div.innerHTML = DOMPurify.sanitize(html || "", {
    USE_PROFILES: { html: true },
  });
  return (div.textContent || div.innerText || "").trim();
}

function truncate(str, n) {
  if (!str) return "";
  return str.length > n ? `${str.slice(0, n)}…` : str;
}

export default function CourseCard({ course, gradient }) {
  const safeTitle = truncate(htmlToText(course?.title), 75);
  const safeDesc = truncate(htmlToText(course?.description), 120);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Link
        to={`/lessons/courses/${course._id}/`}
        className={`
          block
          w-full
          p-4
          rounded-xl shadow-lg
          bg-gradient-to-br ${gradient || 'from-blue-500 to-blue-600'}
          transform transition-all duration-300
          hover:shadow-xl
          overflow-hidden
          text-white
          mx-auto  /* Center the card */
        `}
      >
        <div className="flex flex-col h-full">
          {/* Icon - Fixed height */}
          <div className="h-[40px] flex items-center justify-center">
            <FaGraduationCap className="text-3xl" />
          </div>
          
          {/* Title - Fixed height */}
          <h5 className="h-[40px] mb-2 text-sm font-bold tracking-tight line-clamp-2 text-center">
            {safeTitle}
          </h5>
          
          {/* Description - Fixed height */}
          <p className="h-[48px] font-normal text-sm opacity-90 line-clamp-2 text-center">
            {safeDesc}
          </p>

          {/* Metadata - Fixed height */}
          <div className="h-[28px] mt-auto pt-2 border-t border-white/20 w-full flex justify-between text-xs opacity-75">
            <span className="flex items-center gap-1">
              <FaBook className="text-xs" />
              {course.lessons?.length || 0} Lessons
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-xs" />
              2h
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
