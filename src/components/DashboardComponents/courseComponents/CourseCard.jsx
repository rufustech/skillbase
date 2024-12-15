function CourseCard({ course }) {
  return (
    <div className="mx-auto p-2 hover:scale-105 flex  justify-center items-center">
      <a
        href={`/lessons/courses/${course._id}/`} // Link to the lessons page for the specific course
        className="block max-w-sm w-full h-52 p-6  rounded border-gray-700 shadow-lg border-double border-1 border-[#432010] border hover:bg-gray-200 group overflow-hidden"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#432010] group-hover:text-black line-clamp-2">
          {course.title}
        </h5>
        <p className="font-normal text-gray-700 group-hover:text-black line-clamp-3">
          {course.description}
        </p>
      </a>
    </div>
  );
}

export default CourseCard;

//TODO: Work with props https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
