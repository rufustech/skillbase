import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { urls } from "../constants";
import DOMPurify from "dompurify";
import { courseCreate, engwomanCreateCourse } from "../../assets";
import { Editor } from "@tinymce/tinymce-react"; // Import Editor from TinyMCE

function Admin() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${urls.url}/api/courses`);
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setCourses(result.data);
      } else {
        throw new Error("Invalid course data format.");
      }
    } catch (error) {
      console.error(error);
      setErrors({ fetchCourses: "Failed to load courses." });
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

  const validateQuizForm = () => {
    const validationErrors = {};
    if (!quizTitle.trim())
      validationErrors.quizTitle = "Quiz title is required.";
    if (questions.length === 0)
      validationErrors.questions = "Please add at least one question.";
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

      if (!response.ok) throw new Error("Failed to create course.");

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
      // Sanitize the content before sending to server
      const sanitizedContent = DOMPurify.sanitize(lessonContent, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "div",
          "span",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "strong",
          "em",
          "b",
          "i",
          "a",
          "img",
          "table",
          "tr",
          "td",
          "th",
          "tbody",
          "thead",
          "blockquote",
          "pre",
          "code",
        ],
        ALLOWED_ATTR: [
          "href",
          "src",
          "alt",
          "class",
          "target",
          "style",
          "id",
          "width",
          "height",
        ],
      });

      const response = await fetch(
        `${urls.url}/api/lessons/courses/${selectedCourseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: lessonTitle,
            content: sanitizedContent, // Send sanitized content
            image: imageURL,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create lesson.");

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

  // Quiz creation function
  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleCreateQuiz = async (event) => {
    event.preventDefault();

    const validationErrors = validateQuizForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${urls.url}/api/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: quizTitle,
          questions: questions,
          course: selectedCourseId,
        }),
      });

      if (!response.ok) throw new Error("Failed to create quiz.");

      alert("Quiz created successfully!");
      setQuizTitle("");
      setQuestions([
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ]);
      setSelectedCourseId("");
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Failed to create quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-[#432010] mb-8">
            Manage Courses and Lessons
          </h1>

          {/* Course Management */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl text-[#432010] mb-6">Create New Course</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  className="rounded-lg w-full h-auto"
                  src={courseCreate}
                  alt="Create Course"
                />
              </div>
              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div>
                  <label
                    className="block text-md font-medium text-gray-700"
                    htmlFor="courseName"
                  >
                    Course Name
                  </label>
                  <input
                    id="courseName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="Enter course name"
                  />
                  {errors.courseName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.courseName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-md font-medium text-gray-700"
                    htmlFor="courseDescription"
                  >
                    Course Description
                  </label>
                  <Editor
                    apiKey="rdv7ujfih6cx5hcufff5nek3ou95gq2ghxncjnyiq3njan9l"
                    value={courseDescription}
                    onEditorChange={(newValue) =>
                      setCourseDescription(newValue)
                    }
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                    }}
                  />
                  {errors.courseDescription && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.courseDescription}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#432010] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Course"}
                </button>
              </form>
            </div>
          </div>

          {/* Lesson Management */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-[#432010] mb-6">
              Create New Lesson
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <form onSubmit={handleCreateLesson} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="selectedCourse"
                  >
                    Select Course
                  </label>
                  <select
                    id="selectedCourse"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                    <p className="text-red-600 text-sm mt-1">
                      {errors.selectedCourseId}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="lessonTitle"
                  >
                    Lesson Title
                  </label>
                  <input
                    id="lessonTitle"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="Enter lesson title"
                  />
                  {errors.lessonTitle && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.lessonTitle}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="lessonContent"
                  >
                    Lesson Content
                  </label>
                  <Editor
                    apiKey="rdv7ujfih6cx5hcufff5nek3ou95gq2ghxncjnyiq3njan9l"
                    value={lessonContent}
                    onEditorChange={(newValue) => setLessonContent(newValue)}
                    init={{
                      height: 300,
                      menubar: true,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar: `
      undo redo | formatselect | bold italic backcolor | 
      alignleft aligncenter alignright alignjustify | 
      bullist numlist outdent indent | removeformat | 
      table image link | help
    `,
                      content_style: `
      body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; }
      p { margin: 0; padding: 0.5em 0; }
    `,
                      formats: {
                        h1: { block: "h1", classes: "text-3xl font-bold" },
                        h2: { block: "h2", classes: "text-2xl font-bold" },
                        h3: { block: "h3", classes: "text-xl font-bold" },
                      },
                      setup: function (editor) {
                        editor.on("init", function () {
                          editor.getBody().style.fontSize = "16px";
                        });
                      },
                    }}
                  />

                  {errors.lessonContent && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.lessonContent}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="imageURL"
                  >
                    Image URL
                  </label>
                  <input
                    id="imageURL"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    placeholder="Enter image URL"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#432010] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Lesson"}
                </button>
              </form>
              <div>
                <img
                  className="rounded-lg w-full h-auto"
                  src={engwomanCreateCourse}
                  alt="Create Lesson"
                />
              </div>
            </div>
          </div>

          {/* Quiz Management */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-[#432010] mb-6">
              Create Quiz
            </h2>
            <form onSubmit={handleCreateQuiz} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="quizTitle"
                >
                  Quiz Title
                </label>
                <input
                  id="quizTitle"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="Enter quiz title"
                />
                {errors.quizTitle && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.quizTitle}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="quizCourse"
                >
                  Select Course
                </label>
                <select
                  id="quizCourse"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                  <p className="text-red-600 text-sm mt-1">
                    {errors.selectedCourseId}
                  </p>
                )}
              </div>
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-4 space-y-4"
                >
                  <h3 className="font-medium">Question {index + 1}</h3>
                  <input
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, e)}
                    placeholder={`Enter question ${index + 1}`}
                  />
                  {question.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                  ))}
                  <select
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={question.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(index, e)}
                  >
                    <option value="">Select the correct answer</option>
                    {question.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Remove Question
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
              >
                Add New Question
              </button>
              <button
                type="submit"
                className="w-full bg-[#432010] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Quiz"}
              </button>
            </form>
          </div>

          {/* Course Deletion */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#432010] mb-6">
              Delete Course
            </h2>
            <div className="flex items-end space-x-4">
              <div className="flex-grow">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="deleteCourse"
                >
                  Select Course to Delete
                </label>
                <select
                  id="deleteCourse"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              </div>
              <button
                type="button"
                onClick={handleDeleteCourse}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete Selected Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
