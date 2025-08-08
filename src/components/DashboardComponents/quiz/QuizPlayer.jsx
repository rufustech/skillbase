import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urls } from "../../constants";

function QuizPlayer() {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {

    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }

    async function fetchQuiz() {
      try {
        const res = await fetch(`${urls.url}/api/quiz/course/${courseId}`);
        const data = await res.json();
        console.log("Fetched quiz data:", data);

        if (Array.isArray(data) && data.length > 0) {
          setQuiz(data[0]);
        } else {
          setQuiz(null);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [courseId]);

  const handleNext = () => {
    const currentQuestion = quiz.questions[currentQ];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [
      ...prev,
      { question: currentQuestion.question, selected: selectedOption },
    ]);
    setSelectedOption("");

    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setSubmitted(false);
    setSelectedOption("");
  };

  const getScorePercent = () => {
    return Math.round((score / quiz.questions.length) * 100);
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading quiz...</div>;
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="text-center mt-10 text-lg">No quiz available for this course.</div>;
  }

  const currentQuestion = quiz.questions[currentQ];

  return (
    <div className="max-w-3xl min-h-screen  mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
     
      <h2 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h2>

      {!submitted ? (
        <div>
           <h2 className="text-xl font-bold mb-6 text-left">Good Luck on the Assessment <span className="capitalize">{username}</span> </h2>
          <h3 className="text-lg font-semibold mb-4">
            Question {currentQ + 1} of {quiz.questions.length}
          </h3>
          <p className="mb-6 text-gray-700 font-medium">{currentQuestion.question}</p>

          <ul className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <li key={idx}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`q${currentQ}`}
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="mr-2 accent-blue-600"
                  />
                  <span>{option}</span>
                </label>
              </li>
            ))}
          </ul>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {currentQ === quiz.questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">
            Your Score: {getScorePercent()}%
          </h3>

          {getScorePercent() >= 80 ? (
            <>
              <p className="text-green-600 font-medium mb-4">
                🎉 Congratulations! <span className="capitalize">{username}</span>  You passed.
              </p>
              <button className="mt-4 mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Download Certificate
              </button>
              <br/>
              <a className="mt-4   text-blue-600 rounded hover:scale-105" href="/dashboard">Back to Dashboard</a>
            </>
          ) : (
            <>
              <p className="text-red-600 font-medium mb-4">
                You didn’t pass. Please try again.
              </p>
              <button
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleRetry}
              >
                Retry Quiz
              </button>



            </>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizPlayer;
