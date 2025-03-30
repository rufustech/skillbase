import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { urls } from "../constants";
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
    if (!courseName.trim()) validationErrors.courseName = "Course name is required.";
    if (!courseDescription.trim()) validationErrors.courseDescription = "Course description is required.";
    return validationErrors;
  };

  const validateLessonForm = () => {
    const validationErrors = {};
    if (!lessonTitle.trim()) validationErrors.lessonTitle = "Lesson title is required.";
    if (!lessonContent.trim()) validationErrors.lessonContent = "Lesson content is required.";
    if (!selectedCourseId.trim()) validationErrors.selectedCourseId = "Please select a course.";
    return validationErrors;
  };

  const validateQuizForm = () => {
    const validationErrors = {};
    if (!quizTitle.trim()) validationErrors.quizTitle = "Quiz title is required.";
    if (questions.length === 0) validationErrors.questions = "Please add at least one question.";
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
        body: JSON.stringify({ title: courseName, description: courseDescription }),
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
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
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
      setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
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
    <div className="p-4 sm:ml-64">
      <SideBar />
      <section className="py-4 mx-auto container">
        <h3 className="text-3xl text-[#432010] font-semibold mb-16">Manage Courses and Lessons</h3>
        
        {/* Create Course Form */}
        <div className="grid md:grid-cols-2">
          <div className="p-4 mb-8">
            <img className="rounded-lg" src={courseCreate} alt="" />
          </div>
          <div className="lg:px-24">
            <form onSubmit={handleCreateCourse} className="mt-0 ">
              <label className="text-xl" htmlFor="courseName">Course Name:</label>
              <input
                id="courseName"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
              />
              {errors.courseName && <p className="text-red-600">{errors.courseName}</p>}

              <label htmlFor="courseDescription" className="mt-4 text-xl">Course Description:</label>
              <Editor
                apiKey="rdv7ujfih6cx5hcufff5nek3ou95gq2ghxncjnyiq3njan9l"  // Use your API key here
                value={courseDescription}
                onEditorChange={(newValue) => setCourseDescription(newValue)}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: ['advlist autolink lists link image charmap print preview anchor'],
                  toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                }}
              />
              {errors.courseDescription && <p className="text-red-600">{errors.courseDescription}</p>}

              <button
                type="submit"
                className="mt-5 px-12 font-semibold py-3 bg-[#432010] text-white rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Course"}
              </button>
            </form>
          </div>
        </div>

        {/* Create Lesson Form */}
        <div className="grid md:grid-cols-2 mb-8 mt-16">
          <div className="lg:px-12">
            <form onSubmit={handleCreateLesson} className="mt-2">
              <label htmlFor="selectedCourse" className="mt-4">Select Course</label>
              <select
                id="selectedCourse"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>{course.title}</option>
                ))}
              </select>
              {errors.selectedCourseId && <p className="text-red-600">{errors.selectedCourseId}</p>}

              <label htmlFor="lessonTitle" className="mt-4">Lesson Title</label>
              <input
                id="lessonTitle"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Enter lesson title"
              />
              {errors.lessonTitle && <p className="text-red-600">{errors.lessonTitle}</p>}

              <label htmlFor="lessonContent" className="mt-4">Lesson Content</label>
              <Editor
                apiKey="rdv7ujfih6cx5hcufff5nek3ou95gq2ghxncjnyiq3njan9l"  // Use your API key here
                value={lessonContent}
                onEditorChange={(newValue) => setLessonContent(newValue)}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: ['advlist autolink lists link image charmap print preview anchor'],
                  toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                }}
              />
              {errors.lessonContent && <p className="text-red-600">{errors.lessonContent}</p>}

              <label htmlFor="imageURL" className="mt-4">Image URL</label>
              <input
                id="imageURL"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Enter image URL"
              />

              <button
                type="submit"
                className="mt-5 px-12 font-semibold py-3 bg-[#432010] text-white rounded-full"
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

        {/* Quiz Creation Section */}
        <div className="grid md:grid-cols-2 mt-2">
          <div className="lg:px-12">
            <form onSubmit={handleCreateQuiz} className="mt-4">
              <label htmlFor="quizTitle" className="mt-4 text-2xl font-bold">Quiz Title</label>
              <input
                id="quizTitle"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
              {errors.quizTitle && <p className="text-red-600">{errors.quizTitle}</p>}

              <label htmlFor="selectedCourse" className="mt-4">Select Course</label>
              <select
                id="selectedCourse"
                className="block w-full h-14 p-2 mt-2 border rounded-lg"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>{course.title}</option>
                ))}
              </select>
              {errors.selectedCourseId && <p className="text-red-600">{errors.selectedCourseId}</p>}

              {/* Render Questions */}
              {questions.map((question, index) => (
                <div key={index} className="mt-8">
                  <label htmlFor={`question${index}`} className="mt-4">Question {index + 1}</label>
                  <input
                    id={`question${index}`}
                    name="question"
                    className="block w-full h-14 p-2 mt-2 border rounded-lg"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, e)}
                    placeholder={`Enter question ${index + 1}`}
                  />

                  <label className="mt-4">Options</label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type="text"
                        name={`option-${optionIndex}`}
                        className="block w-full h-14 p-2 mt-2 border rounded-lg"
                        value={option}
                        onChange={(e) => handleOptionChange(index, optionIndex, e)}
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    </div>
                  ))}

                  <label htmlFor={`correctAnswer${index}`} className="mt-4">Correct Answer</label>
                  <select
                    id={`correctAnswer${index}`}
                    name="correctAnswer"
                    value={question.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(index, e)}
                    className="block w-full h-14 p-2 mt-2 border rounded-lg"
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
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full"
                  >
                    Remove Question
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddQuestion}
                className="mt-5 px-12 py-3 bg-[#432010] text-white rounded-full"
              >
                Add New Question
              </button>

              <button
                type="submit"
                className="mt-5 px-12 font-semibold py-3 bg-[#432010] text-white rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Quiz"}
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
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full"
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
