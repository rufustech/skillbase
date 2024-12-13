import { constructionindustry, womanengineer, workers } from "../assets";

function About() {
  return (
    <div>
      <section className="bg-white">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-700 ">
              Safety First with Skillbase:
            </h2>
            <h3 className="text-2xl text-gray-600 pb-2">
              Your Trusted Partner in Risk Management
            </h3>
            <p className="mb-4 text-xl text-gray-600">
              At Skillbase, we are safety experts, consultants, and problem
              solvers. Innovators and risk mitigators. Small enough to provide
              personalized attention, but large enough to tackle complex
              challenges with precision and efficiency. We understand the
              importance of safety and are committed to delivering comprehensive
              solutions that protect people, assets, and environments at every
              level. From risk assessments to training programs, we ensure
              safety is integrated seamlessly into your operations.
            </p>
            <p className="text-gray-600 text-xl">
              Our team ensure that every aspect of your safety framework is
              robust, effective, and future-ready. Our safety solutions are
              designed to be flexible and scalable, addressing the unique needs
              of each organization. Whether you’re in construction,
              manufacturing, healthcare, or any other industry, we equip you
              with the tools and knowledge to prevent accidents, reduce risks,
              and maintain a secure environment. With Skillbase, safety is not
              just a priority; it’s a cornerstone of your success.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src={womanengineer}
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src={constructionindustry}
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
