// components/SurveyForm.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

function SurveyForm() {
  // Dummy survey data
  const surveyData = {
    id: 1,
    title: "Safety Culture Assessment",
    description: "Help us improve workplace safety by completing this survey.",
    questions: [
      {
        id: 1,
        text: "How satisfied are you with current safety protocols?",
        type: "rating",
        options: [1, 2, 3, 4, 5],
      },
      {
        id: 2,
        text: "Do you feel adequately trained for emergency situations?",
        type: "yesNo",
      },
      {
        id: 3,
        text: "How often do you observe safety violations in your area?",
        type: "multiple",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
      },
      {
        id: 4,
        text: "What safety improvements would you suggest?",
        type: "text",
      },
    ],
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    // Here you would typically send the answers to your backend
    console.log("Submitted answers:", answers);
    setSubmitted(true);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "rating":
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">{question.text}</p>
            <div className="flex space-x-4">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(question.id, option)}
                  className={`w-12 h-12 rounded-full ${
                    answers[question.id] === option
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "yesNo":
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">{question.text}</p>
            <div className="flex space-x-4">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(question.id, option)}
                  className={`px-6 py-2 rounded-lg ${
                    answers[question.id] === option
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "multiple":
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">{question.text}</p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(question.id, option)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    answers[question.id] === option
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">{question.text}</p>
            <textarea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center"
      >
        <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Thank You for Your Response
        </h2>
        <p className="text-gray-600">
          Your feedback helps us improve workplace safety.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {surveyData.title}
        </h1>
        <p className="text-gray-600">{surveyData.description}</p>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestion + 1) / surveyData.questions.length) * 100
              }%`,
            }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Question {currentQuestion + 1} of {surveyData.questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          {renderQuestion(surveyData.questions[currentQuestion])}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 disabled:text-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (currentQuestion === surveyData.questions.length - 1) {
              handleSubmit();
            } else {
              setCurrentQuestion((prev) => prev + 1);
            }
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {currentQuestion === surveyData.questions.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}

export default SurveyForm;
