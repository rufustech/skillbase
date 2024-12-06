import React, { useState } from "react";

const LessonFormSubmit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const lessonData = {
      title,
      content,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/lesson/createLesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lessonData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessage("Lesson created successfully!");
        console.log(result); // Optionally log the result
      } else {
        setMessage("Failed to create lesson. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while creating the lesson.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create a New Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Lesson Title:</label>
          <input
            className="w-72 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">Lesson Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Lesson</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LessonFormSubmit;
