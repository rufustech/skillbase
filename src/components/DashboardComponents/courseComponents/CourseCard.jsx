function CourseCard({ course }) {
  return (
    <div className="mx-auto p-2 hover:scale-105 flex justify-center items-center">
      <a
        href={`/course/${course._id}/lessons`} // Link to the lessons page for the specific course
        className="block max-w-sm w-full h-52 p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-500 group overflow-hidden"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#432010] group-hover:text-white line-clamp-2">
          {course.title}
        </h5>
        <p className="font-normal text-gray-700 group-hover:text-white line-clamp-3">
          {course.description}
        </p>
      </a>
    </div>
  );
}

export default CourseCard;



