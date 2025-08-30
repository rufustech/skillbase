import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { safetycertificate } from "../../assets";
import { urls } from "../constants";
import SideBar from "../SideBar";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const endpoint = `${urls?.url}/api/certificates/user-certificates`;

      console.log("[CERTS] endpoint:", endpoint, "token present:", !!token);

      if (!urls?.url) {
        throw new Error(
          "Config error: urls.url is undefined (check constants import/path/export)."
        );
      }
      if (!token) {
        throw new Error("You are not logged in. Please log in again.");
      }

      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        // credentials not needed since you use Bearer, but harmless:
        // credentials: "include",
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (response.status === 401) {
        // Token invalid/expired
        setError(data?.message || "Session expired. Please log in again.");
        // optional: localStorage.clear(); navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Failed to fetch certificates (HTTP ${response.status})`
        );
      }

      if (!data?.success) {
        throw new Error(data?.message || "Failed to fetch certificates");
      }

      setCertificates(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("[CERTS] Fetch error:", err);
      setError(err.message || "Unexpected error fetching certificates");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:ml-64 flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#432010] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:ml-64 flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={fetchCertificates}
            className="mt-4 px-4 py-2 bg-[#432010] text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <SideBar />
      <div className="p-4 sm:ml-64 container mx-auto mt-2">
        <div className="p-4 shadow-lg rounded-lg">
          <section className="py-4 md:py-12 bg-white relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
              <div className="grid grid-cols-12 mb-12 relative">
                <div className="col-span-12 md:col-span-8 lg:col-span-5 xl:col-span-4 text-start text-zinc-900">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl leading-none text-[#432010] md:text-[45px]  mb-6"
                  >
                    Your Certificates
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg opacity-80 leading-6 mb-6"
                  >
                    Hello{" "}
                    <span className="font-bold">
                      {username}, {}
                    </span>
                    your completed courses
                  </motion.p>
                </div>
              </div>

              <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                  <div className="relative bg-white shadow-xl p-4 md:p-16">
                    {certificates.length === 0 ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500 py-8"
                      >
                        No certificates found. Complete courses to earn
                        certificates!
                      </motion.p>
                    ) : (
                      <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-6 text-center">
                        {certificates.map((cert, index) => (
                          <motion.div
                            key={cert._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="col-span-2 md:col-span-1"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="bg-white text-[#432010] h-72 shadow-2xl relative rounded-xl p-2 lg:p-6"
                            >
                              <img
                                src={safetycertificate}
                                alt=""
                                className="max-w-full h-auto mx-auto rounded-xl max-h-[200px] object-cover mb-3"
                              />
                              <h4 className="text-md font-semibold mb-4">
                                {cert.course.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                <span className="font-bold">Issued:</span>{" "}
                                {new Date(cert.issuedAt).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-400">
                                ID: {cert.certificateId}
                              </p>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Certificates;
