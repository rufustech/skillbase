import { useState } from "react";
import { urls } from "../constants";

const LessonFormSubmit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Validate form inputs
  const validateInputs = () => {
    let isValid = true;

    if (title.trim().length < 5) {
      setTitleError("Lesson title must be at least 5 characters.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (content.trim().length === 0) {
      setContentError("Lesson content cannot be empty.");
      isValid = false;
    } else {
      setContentError("");
    }

    return isValid;
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const lessonData = {
      title,
      content,
    };

    try {
      const response = await fetch(`${urls.url}/api/lesson/createLesson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Lesson created successfully!");
        console.log(result);
        setTitle(""); // Clear form inputs
        setContent("");
      } else {
        setMessage("Failed to create lesson. Please try again Bozo.");
      }
    } catch (error) {
      setMessage("An error occurred while creating the lesson.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create a New Lesson</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="title">Lesson Title:</label>
          <input
            className="w-72 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <p className="text-red-500">{titleError}</p>}
        </div>

        <div>
          <label htmlFor="content">Lesson Content:</label>
          <textarea
            className="w-72 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="content"
            name="content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          {contentError && <p className="text-red-500">{contentError}</p>}
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Create Lesson
        </button>
      </form>

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default LessonFormSubmit;
