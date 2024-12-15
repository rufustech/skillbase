import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { urls } from "../constants";
import { courseCreate, engwomanCreateCourse, workers } from "../../assets";

function Admin() {
  const [courses, setCourses] = useState([]);
  const [courseDescription, setCourseDescription] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [courseName, setCourseName] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${urls.url}/api/courses`);
      if (!response.ok) {
        throw new Error(`Failed to fetch courses. Status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setCourses(result.data);
      } else {
        throw new Error("Invalid course data format.");
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        fetchCourses: "Failed to load courses.",
      }));
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const validateCourseForm = () => {
    const validationErrors = {};
    if (!courseName.trim())
      validationErrors.courseName = "Course name is required.";
    if (!courseDescription.trim())
      validationErrors.courseDescription = "Course description is required.";
    return validationErrors;
  };

  const validateLessonForm = () => {
    const validationErrors = {};
    if (!lessonTitle.trim())
      validationErrors.lessonTitle = "Lesson title is required.";
    if (!lessonContent.trim())
      validationErrors.lessonContent = "Lesson content is required.";
    if (!selectedCourseId.trim())
      validationErrors.selectedCourseId = "Please select a course.";
    return validationErrors;
  };

  const handleCreateCourse = async (event) => {
    event.preventDefault();
    const validationErrors = validateCourseForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${urls.url}/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseName,
          description: courseDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create course. Status: ${response.status}`);
      }

      alert("Course created successfully!");
      fetchCourses();
      setCourseName("");
      setCourseDescription("");
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateLesson = async (event) => {
    event.preventDefault();
    const validationErrors = validateLessonForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${urls.url}/api/lessons/courses/${selectedCourseId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: lessonTitle,
            content: lessonContent,
            image: imageURL,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create lesson. Status: ${response.status}`);
      }

      alert("Lesson created successfully!");
      setLessonTitle("");
      setLessonContent("");
      setImageURL("");
      setSelectedCourseId("");
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Failed to create lesson. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!selectedCourseId) {
      alert("Please select a course to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${urls.url}/api/courses/${selectedCourseId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete course. Status: ${response.status}`);
      }

      alert("Course deleted successfully!");
      fetchCourses(); // Refresh the course list
      setSelectedCourseId(""); // Reset the selected course
    } catch (error) {
      console.error(error);
      alert("Failed to delete course. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <SideBar />
      <section className="py-4 mx-auto container">
        <h3 className="text-3xl text-[#432010] font-semibold mb-16">
          Manage Courses and Lessons
        </h3>
        <div className="grid md:grid-cols-2">
          <div className="p-4 mb-16">
            <img className="rounded-lg" src={courseCreate} alt="" />
          </div>
          <div className="lg:p-24">
            <form onSubmit={handleCreateCourse} className="mt-8 ">
              <label className="text-xl" htmlFor="courseName">
                Course Name:
              </label>
              <input
                id="courseName"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
              />
              {errors.courseName && (
                <p className="text-red-600">{errors.courseName}</p>
              )}

              <label htmlFor="courseDescription" className="mt-4 text-xl">
                Course Description:
              </label>
              <textarea
                id="courseDescription"
                className="block w-full p-2 mt-2 border rounded"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Enter course description"
              />
              {errors.courseDescription && (
                <p className="text-red-600">{errors.courseDescription}</p>
              )}

              <button
                type="submit"
                className="mt-5 px-6 font-semibold py-3 bg-[#432010] text-white rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Course"}
              </button>
            </form>
          </div>
          <div></div>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="p-12">
            <form onSubmit={handleCreateLesson} className="mt-16">
              <label htmlFor="selectedCourse">Select Course</label>
              <select
                id="selectedCourse"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
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
              {errors.selectedCourseId && (
                <p className="text-red-600">{errors.selectedCourseId}</p>
              )}

              <label htmlFor="lessonTitle" className="mt-4">
                Lesson Title
              </label>
              <input
                id="lessonTitle"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Enter lesson title"
              />
              {errors.lessonTitle && (
                <p className="text-red-600">{errors.lessonTitle}</p>
              )}

              <label htmlFor="lessonContent" className="mt-4">
                Lesson Content
              </label>
              <textarea
                id="lessonContent"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                placeholder="Enter lesson content"
              />
              {errors.lessonContent && (
                <p className="text-red-600">{errors.lessonContent}</p>
              )}

              <label htmlFor="imageURL" className="mt-4">
                Image URL
              </label>
              <input
                id="imageURL"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Enter image URL"
              />

              <button
                type="submit"
                className="mt-5 px-6 font-semibold py-3 bg-[#432010] text-white rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Lesson"}
              </button>
            </form>
          </div>
          <div className="p-4 mb-16">
            <img className="rounded-lg" src={engwomanCreateCourse} alt="" />
          </div>
        </div>
      </section>
      <section className="py-4 mx-auto container">
        <div className="grid md:grid-cols-2">
          <div className="">
            <label htmlFor="selectedCourse">Select Course</label>
            <select
              id="selectedCourse"
              className="block w-full h-14 p-2 mt-2 border rounded-lg"
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
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
              onClick={handleDeleteCourse}
            >
              Delete Selected Course
            </button>
          </div>
          <div className="lg:w-1/2 pl-12">
            <img
              src="https://www.randomnoun.com/wpf/shell32-avi/tshell32_162.gif"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;
