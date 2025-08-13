import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

function htmlToText(html) {
  const div = document.createElement("div");
  // Sanitize then read text content
  div.innerHTML = DOMPurify.sanitize(html || "", {
    USE_PROFILES: { html: true },
  });
  return (div.textContent || div.innerText || "").trim();
}

function truncate(str, n) {
  if (!str) return "";
  return str.length > n ? `${str.slice(0, n)}…` : str;
}

export default function CourseCard({ course }) {
  const safeTitle = truncate(htmlToText(course?.title), 75);
  const safeDesc = truncate(htmlToText(course?.description), 120);

  return (
    <div className="mx-auto p-2 hover:scale-105 flex justify-center items-center">
      <Link
        to={`/lessons/courses/${course._id}/`}
        className="block max-w-sm w-full h-32 p-2 rounded border border-[#432010] border-double shadow-lg hover:bg-gray-200 group overflow-hidden"
      >
        <h5 className="mb-2 text-sm font-bold tracking-tight text-[#432010] group-hover:text-black line-clamp-2">
          {safeTitle}
        </h5>
        <p className="font-normal text-sm text-gray-700 group-hover:text-black line-clamp-3">
          {safeDesc}
        </p>
      </Link>
    </div>
  );
}
