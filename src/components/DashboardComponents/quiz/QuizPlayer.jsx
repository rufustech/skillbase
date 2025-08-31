import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { urls } from "../../constants";
import { safetyhelmets } from "../../../assets";

function QuizPlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Quiz + UI
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // User + cert
  const [username, setUsername] = useState("");
  const [generating, setGenerating] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [savedCertificate, setSavedCertificate] = useState(null);

  // Load username and quiz
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${urls.url}/api/quiz/course/${courseId}`);
        const data = await res.json();
        setQuiz(Array.isArray(data) && data.length > 0 ? data[0] : null);
      } catch (e) {
        console.error("Fetch quiz error:", e);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [courseId]);

  // Score %
  const scorePercent = useMemo(() => {
    if (!quiz?.questions?.length) return 0;
    return Math.round((score / quiz.questions.length) * 100);
  }, [score, quiz]);

  // ---- API: save certificate (server generates certificateId)
  const saveCertificateToDb = async (finalScore) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not logged in (missing token).");

    // Verify all required da data is present
    if (!courseId || !quiz?._id) {
      throw new Error("Missing required course or quiz data");
    }

    const payload = {
      courseId,
      quizId: quiz._id,
      score: finalScore,
    };

    // Log the request for debugging
    console.log("Sending certificate request:", {
      endpoint: `${urls.url}/api/certificates/create`,
      payload,
    });

    try {
      const res = await fetch(`${urls.url}/api/certificates/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        // Add these options if you're dealing with cookies
        credentials: "include",
      });

      // Enhanced error handling
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Response:", {
          status: res.status,
          statusText: res.statusText,
          body: errorText,
        });

        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message;
        } catch {
          errorMessage = `Server error: ${res.status} ${res.statusText}`;
        }

        throw new Error(errorMessage);
      }

      const data = await res.json();

      // Validate response data
      if (!data.success || !data.data) {
        throw new Error("Invalid response format from server");
      }

      // Log successful response
      console.log("Certificate created successfully:", data.data);

      return data.data;
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        throw new Error(
          `Network error: Please check your connection and API URL (${urls.url})`
        );
      }
      throw error;
    }
  };

  // ---- PDF builder
  const buildCertificatePdf = (certificate) => {
    if (!certificate) return null;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [800, 600],
    });

    // Background
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 0, 800, 600, "F");

    // Borders
    doc.setDrawColor(66, 32, 16);
    doc.setLineWidth(10);
    doc.rect(20, 20, 760, 560);

    doc.setDrawColor(218, 165, 32);
    doc.setLineWidth(2);
    doc.rect(40, 40, 720, 520);

    // Logo (best effort)
    try {
      doc.addImage(safetyhelmets, "PNG", 350, 50, 100, 100);
    } catch {}

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(66, 32, 16);
    doc.text("Certificate of Completion", 400, 180, { align: "center" });
    doc.setLineWidth(2);
    doc.setDrawColor(218, 165, 32);
    doc.line(250, 190, 550, 190);

    // Body
    doc.setFontSize(20);
    doc.setFont("helvetica", "normal");
    doc.text("This is to certify that", 400, 250, { align: "center" });

    // Name
    const displayName = (username || "Student").toUpperCase();
    doc.setFontSize(30);
    doc.setFont("helvetica", "bold");
    const nameWidth = doc.getTextWidth(displayName);
    doc.setDrawColor(218, 165, 32);
    doc.line(400 - nameWidth / 2, 310, 400 + nameWidth / 2, 310);
    doc.text(displayName, 400, 300, { align: "center" });

    // Course
    doc.setFontSize(20);
    doc.setFont("helvetica", "normal");
    doc.text("has successfully completed the course", 400, 350, {
      align: "center",
    });
    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");
    doc.text(quiz.title, 400, 400, { align: "center" });

    // Meta
    const dateText = certificate?.completionDate
      ? format(new Date(certificate.completionDate), "MMMM dd, yyyy")
      : format(new Date(), "MMMM dd, yyyy");

    doc.setFontSize(15);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${dateText}`, 400, 450, { align: "center" });
    doc.text(`Certificate Number: ${certificate.certificateId}`, 400, 470, {
      align: "center",
    });
    doc.text(`Score: ${certificate.score}%`, 400, 490, { align: "center" });

    // Signature
    doc.setFontSize(13);
    doc.text("Authorized Signature", 250, 520, { align: "center" });
    doc.text("Safety Manager", 250, 535, { align: "center" });

    // Watermark
    doc.setFont("helvetica", "bold");
    doc.setFontSize(60);
    doc.setTextColor(245, 245, 245);
    doc.text("SKILLBASE", 400, 300, { align: "center" });

    return doc;
  };

  // ---- Generate (save + preview)
  const generateCertificate = async () => {
    if (generating) return;

    setGenerating(true);
    try {
      // Validate required data
      if (!quiz?._id) {
        throw new Error("Quiz data not available");
      }
      if (!courseId) {
        throw new Error("Course ID not available");
      }
      if (!username) {
        throw new Error("Username not available");
      }
      if (scorePercent < 80) {
        throw new Error("Score must be 80% or higher to generate certificate");
      }

      const cert = await saveCertificateToDb(scorePercent);
      if (!cert || !cert.certificateId) {
        throw new Error("Invalid certificate data received");
      }

      setSavedCertificate(cert);

      const doc = buildCertificatePdf(cert);
      if (!doc) {
        throw new Error("Failed to generate PDF");
      }

      const previewUrl = doc.output("dataurlstring");
      setCertificateUrl(previewUrl);

      return { doc, certificate: cert };
    } catch (error) {
      console.error("Certificate generation failed:", error);
      // Show error in UI
      setApiError(error.message);
      return null;
    } finally {
      setGenerating(false);
    }
  };

  // ---- Download (generate if needed)
  const handleDownload = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      let cert = savedCertificate;
      if (!cert) {
        console.log("No saved certificate, generating new one...");
        const result = await generateCertificate();
        console.log("Generate result:", result);
        if (!result?.certificate) return;
        cert = result.certificate;
      }

      console.log("Building PDF with cert:", cert);
      const doc = buildCertificatePdf(cert);
      if (!doc) {
        console.error("PDF generation failed");
        throw new Error("Could not build PDF");
      }

      const safe = (s) => (s || "").toString().replace(/[^\w\-]+/g, "_");
      const fileName = `${safe(username || "student")}_${safe(
        quiz?.title || "course"
      )}_${cert.certificateId}.pdf`;

      console.log("Saving PDF with filename:", fileName);
      doc.save(fileName);
    } catch (e) {
      console.error("Download error:", e);
      alert(e.message || "Error downloading certificate.");
    } finally {
      setGenerating(false);
    }
  };

  // ---- Quiz handlers
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
      setSubmitted(true); // show results; user can generate/download from there
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setSubmitted(false);
    setSelectedOption("");
    setCertificateUrl(null);
    setSavedCertificate(null);
  };

  // ---- UI
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
                  transition={{ delay: idx * 0.08 }}
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
              Your Score: {scorePercent}%
            </h3>

            {scorePercent >= 80 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-green-600 font-medium mb-4">
                  🎉 Congratulations!{" "}
                  <span className="capitalize">{username}</span> You passed.
                </p>
                {/* Preview (optional, appears after generation) */}
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
                {/* Single button: appears immediately after passing */}

                {apiError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline ml-2">{apiError}</span>
                    <button
                      onClick={() => setApiError(null)}
                      className="absolute top-0 right-0 px-4 py-3"
                    >
                      <span className="text-red-500">×</span>
                    </button>
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={
                    savedCertificate ? handleDownload : generateCertificate
                  }
                  disabled={generating}
                  className="mt-2 mb-4 px-6 py-2 bg-[#432010] text-white rounded-full 
             hover:bg-opacity-90 transition-all duration-300 
             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Working...
                    </span>
                  ) : savedCertificate ? (
                    "Download Certificate"
                  ) : (
                    "Generate Certificate"
                  )}
                </motion.button>
                <br />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/courses")}
                  className="mt-2 text-blue-600 hover:underline inline-block"
                >
                  Back to Trainings
                </motion.button>
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
