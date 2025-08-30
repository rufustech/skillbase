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
    if (!token) throw new Error("No authentication token found");

    const payload = {
      courseId, // ✅ matches backend
      quizId: quiz._id, // ✅ matches backend
      score: finalScore,
    };

    const res = await fetch(`${urls.url}/api/certificates/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    let body;
    try {
      body = await res.json();
    } catch {
      throw new Error(
        `Create certificate failed: HTTP ${res.status} ${res.statusText}`
      );
    }

    if (!res.ok || !body?.success) {
      throw new Error(
        body?.message || `Create certificate failed with ${res.status}`
      );
    }
    return body.data; // certificate doc
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
    setGenerating(true);
    try {
      if (scorePercent < 80) {
        alert("Certificate is only available for scores 80% and above.");
        return null;
      }
      const cert = await saveCertificateToDb(scorePercent);
      setSavedCertificate(cert);

      const doc = buildCertificatePdf(cert);
      const previewUrl = doc?.output("dataurlstring");
      if (previewUrl) setCertificateUrl(previewUrl);

      return { doc, certificate: cert };
    } catch (error) {
      console.error("Generate cert error:", error);
      alert(error.message || "Failed to generate certificate.");
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
        const result = await generateCertificate();
        if (!result?.certificate) return;
        cert = result.certificate;
      }

      const doc = buildCertificatePdf(cert);
      if (!doc) throw new Error("Could not build PDF");

      const safe = (s) => (s || "").toString().replace(/[^\w\-]+/g, "_");
      const fileName = `${safe(username || "student")}_${safe(
        quiz?.title || "course"
      )}_${cert.certificateId}.pdf`;
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={
                    savedCertificate ? handleDownload : generateCertificate
                  }
                  disabled={generating}
                  className="mt-2 mb-4 px-6 py-2 bg-[#432010] text-white rounded-full hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {generating
                    ? "Working..."
                    : savedCertificate
                    ? "Download Certificate"
                    : "Generate Certificate"}
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
