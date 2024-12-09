import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

function CourseCards() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  async function fetchCourses() {
    try {
      const url = "http://localhost:5000/api/courses";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      console.log("API response data:", result);
      if (result.success && Array.isArray(result.data)) {
        setCourses(result.data); // Extract the array from the `data` key
      } else {
        throw new Error("API response does not contain a valid 'data' array.");
      }
    } catch (error) {
      console.error("Unable to fetch data:", error);
      setError("Failed to load courses. Please try again later.");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  if (!Array.isArray(courses)) {
    return <p>No courses available.</p>;
  }

  return (
    <div className="p-4 sm:ml-64 mx-auto">
      <h2 className="text-center text-4xl p-4 text-[#432010] font-bold">
        More Safety Courses
      </h2>
      <section className="py-8">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 px-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} /> // Pass the entire course object as a prop
            ))
          ) : (
            <p className="text-lg text-[#432010]">No courses available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CourseCards;
