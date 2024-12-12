import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useNavigate } from "react-router-dom";
import { urls } from "../constants";

function Admin() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImageURL] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseId, setid] =useState()

  const url =`${urls.url}/api/courses`;

  async function fetchCourses() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setCourses(result.data);
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

  async function handleCreateCourse(event) {
    event.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    try {
      const response = await fetch(`${urls.url}/api/courses`, {
        method: "POST",
        body: JSON.stringify({
          title: courseName,
          description: description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data[0])
      console.log("Course creation response:", data);
      alert("Course created successfully!");
      fetchCourses(); // Refresh the list of courses
      setCourseName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }
  

  async function handleCreateLesson(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${urls.url}/api/lessons/courses/${selectedCourseId}`, {
        
        
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: description,
          image: image,
          courseId: selectedCourseId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Lesson creation response:", data);
      alert("Lesson created successfully!");
      setTitle("")
      setError("");
      setDescription("");
      setImageURL("")
    } catch (error) {
      console.error("Error creating lesson:", error);
      alert("Failed to create lesson. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-4 sm:ml-64">
      <SideBar />
<section className="py-12 text-gray-800 sm:py-24">
  <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
    <div className="max-w-2xl px-4 lg:pr-24">
      <p className="mb-2 text-blue-600">Upload Courses and Lessons</p>
      <h3 className="mb-5 text-3xl font-semibold">Upload a Course</h3>
      <p className="mb-16 text-lg text-gray-600">
        Manage courses and lessons efficiently with this interface.
      </p>
    </div>
    <div className="border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
      <div className="relative border-b border-gray-300 p-4 py-8 sm:px-8">
        <h3 className="mb-1 text-3xl font-medium">Course Name</h3>
      </div>
      <form
        onSubmit={handleCreateCourse}
        className="p-4 sm:p-8"
      >
        <label htmlFor="name">Course Name:</label>
        <input
          id="name"
          type="text"
          className="mt-4 w-full resize-y rounded-lg border px-4 py-2"
          placeholder="Enter Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <label className="mt-5 mb-2 inline-block">Course Description</label>
        <textarea
          id="description"
          className="mb-8 w-full resize-y rounded-lg border px-4 py-2"
          placeholder="Enter Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 p-3 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "SUBMIT"}
        </button>
      </form>
    </div>
  </div>
</section>


      <section className="py-12 text-gray-800 sm:py-24">
        <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <form className="w-full p-4">
            <div className="border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
              <div className="relative border-b border-gray-300 p-4 py-8 sm:px-8">
                <h3 className="mb-1 text-3xl font-medium">Lesson Title</h3>
              </div>
              <div className="p-4 sm:p-8">
                <label htmlFor="course">Select Course:</label>
                <select
                  id="course"
                  className="peer my-4 w-full resize-y rounded-lg border px-4 py-2"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <label htmlFor="lessonTitle">Lesson Name:</label>
                <input
                  id="lessonTitle"
                  type="text"
                  className="mt-4 w-full resize-y rounded-lg border px-4 py-2"
                  placeholder="Enter Lesson Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="imageUrl">Lesson Image URL:</label>
                <input
                  id="imageUrl"
                  type="text"
                  className="mt-2 w-full resize-y rounded-lg border px-4 py-2"
                  placeholder="Enter Lesson Image URL"
                  value={image}
                  onChange={(e) => setImageURL(e.target.value)}
                />
                <label className="mt-5 mb-2 inline-block">Lesson Content:</label>
                <textarea
                  id="content"
                  className="mb-8 w-full resize-y rounded-lg border px-4 py-2"
                  placeholder="Enter Lesson Content"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleCreateLesson}
                  className="w-full rounded-lg bg-blue-700 p-3 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "SUBMIT"}
                </button>
              </div>
            </div>
          </form>
          <div className="max-w-2xl px-4 text-left">
  <p className="mb-2 text-blue-600">Upload Courses and Lessons</p>
  <h3 className="mb-5 text-3xl font-semibold">Upload a Course</h3>
  <p className="mb-16 text-lg text-gray-600">
    Manage courses and lessons efficiently with this interface.
  </p>
</div>

        </div>
      </section>
    </div>
  );
}

export default Admin;
