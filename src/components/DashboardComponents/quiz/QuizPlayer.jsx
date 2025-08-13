import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { urls } from "../../constants";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { safetyhelmets } from "../../../assets";

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
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [generating, setGenerating] = useState(false);

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
      if (getScorePercent() >= 80) {
        generateCertificate();
      }
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setSubmitted(false);
    setSelectedOption("");
    setCertificateUrl(null);
  };

  const getScorePercent = () => {
    return Math.round((score / quiz.questions.length) * 100);
  };

  const generateCertificateNumber = () => {
    return `CERT-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
  };

  const generateCertificate = () => {
    setGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [800, 600],
      });

      // Set background
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 0, 800, 600, "F");

      // Add border
      doc.setDrawColor(66, 32, 16); // #432010
      doc.setLineWidth(10);
      doc.rect(20, 20, 760, 560);

      // Inner border with golden color
      doc.setDrawColor(218, 165, 32); // Golden color
      doc.setLineWidth(2);
      doc.rect(40, 40, 720, 520);

      // Add logo at the top
      doc.addImage(safetyhelmets, "PNG", 350, 50, 100, 100); // Adjust position and size as needed

      // Certificate title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(40);
      doc.setTextColor(66, 32, 16);
      doc.text("Certificate of Completion", 400, 180, { align: "center" });
      // Add decorative line under title
      doc.setLineWidth(2);
      doc.setDrawColor(218, 165, 32);
      doc.line(250, 190, 550, 190);

      // Certificate text
      doc.setFontSize(20);
      doc.setFont("helvetica", "normal");
      doc.text("This is to certify that", 400, 250, { align: "center" });

      // Recipient name
      doc.setFontSize(30);
      doc.setFont("helvetica", "bold");
      const nameWidth = doc.getTextWidth(username.toUpperCase());

      // Add underline for name
      doc.setDrawColor(218, 165, 32);
      doc.line(400 - nameWidth / 2, 310, 400 + nameWidth / 2, 310);
      doc.text(username.toUpperCase(), 400, 300, { align: "center" });

      // Course completion text
      doc.setFontSize(20);
      doc.setFont("helvetica", "normal");
      doc.text("has successfully completed the course", 400, 350, {
        align: "center",
      });

      // Course name
      doc.setFontSize(25);
      doc.setFont("helvetica", "bold");
      doc.text(quiz.title, 400, 400, { align: "center" });

      // Add signature lines
      // doc.setLineWidth(1);
      // doc.setDrawColor(66, 32, 16);

      // Left signature
      // doc.line(200, 500, 300, 500);
      doc.setFontSize(13);
      doc.text("Authorized Signature", 250, 520, { align: "center" });
      doc.text("Safety Manager", 250, 535, { align: "center" }); // Added Safety Manager title

      // Right signature
      // doc.line(500, 500, 600, 500);
      // doc.text("Date", 550, 520, { align: "center" });

      // Date and certificate number
      const date = format(new Date(), "MMMM dd, yyyy");
      const certNumber = generateCertificateNumber();

      doc.setFontSize(15);
      doc.text(`Date: ${date}`, 400, 450, { align: "center" });
      doc.text(`Certificate Number: ${certNumber}`, 400, 470, {
        align: "center",
      });
      doc.text(`Score: ${getScorePercent()}%`, 400, 490, { align: "center" });

      // Add watermark
      doc.setFont("helvetica", "bold");
      doc.setFontSize(60);
      doc.setTextColor(245, 245, 245);
      doc.save();
      doc.rotate(45, 400, 300);
      doc.text("SKILLBASE", 400, 300, { align: "center" });
      doc.restore();

      // Convert to data URL for preview
      const dataUrl = doc.output("dataurlstring");
      setCertificateUrl(dataUrl);
      setGenerating(false);

      return doc;
    } catch (error) {
      console.error("Error generating certificate:", error);
      setGenerating(false);
    }
  };


 
  
  const handleDownload = () => {
    try {
      const doc = generateCertificate();
      doc.save(`${username}_${quiz.title}_certificate.pdf`);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#432010] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="text-center mt-10 text-lg text-red-600">
        No quiz available for this course.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl min-h-screen mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h2>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-6 text-left">
              Good Luck on the Assessment{" "}
              <span className="capitalize">{username}</span>
            </h2>
            <h3 className="text-lg font-semibold mb-4">
              Question {currentQ + 1} of {quiz.questions.length}
            </h3>
            <p className="mb-6 text-gray-700 font-medium">
              {quiz.questions[currentQ].question}
            </p>

            <ul className="space-y-3">
              {quiz.questions[currentQ].options.map((option, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name={`q${currentQ}`}
                      value={option}
                      checked={selectedOption === option}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="mr-3 h-4 w-4 accent-[#432010]"
                    />
                    <span className="text-lg">{option}</span>
                  </label>
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!selectedOption}
              className={`mt-6 px-6 py-2 rounded-full text-white transition-all duration-300 ${
                selectedOption
                  ? "bg-[#432010] hover:bg-opacity-90"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {currentQ === quiz.questions.length - 1 ? "Submit" : "Next"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-4">
              Your Score: {getScorePercent()}%
            </h3>

            {getScorePercent() >= 80 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-green-600 font-medium mb-4">
                  🎉 Congratulations!{" "}
                  <span className="capitalize">{username}</span> You passed.
                </p>

                {certificateUrl && (
                  <div className="mb-6">
                    <div className="relative w-full max-w-md mx-auto h-64 border-4 border-[#432010] rounded-lg overflow-hidden">
                      <img
                        src={certificateUrl}
                        alt="Certificate Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  disabled={generating}
                  className="mt-4 mb-4 px-6 py-2 bg-[#432010] text-white rounded-full hover:bg-opacity-90 transition-all duration-300"
                >
                  {generating ? "Generating..." : "Download Certificate"}
                </motion.button>

                <br />
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="/dashboard"
                  className="mt-4 text-blue-600 hover:underline inline-block"
                >
                  Back to Dashboard
                </motion.a>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-600 font-medium mb-4">
                  You didn't pass. Please try again.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetry}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-opacity-90 transition-all duration-300"
                >
                  Retry Quiz
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default QuizPlayer;
