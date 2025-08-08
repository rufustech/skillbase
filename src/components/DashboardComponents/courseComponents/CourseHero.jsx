function CourseHero() {
  return (
    <div className="p-4 sm:ml-64 mx-autos">
      <section className="ezy__service20 light py-4 md:py-12  mx-auto text-zinc-900  relative z-[1] overflow-hidden">
        {/* shape one */}
        <svg
          className="absolute -bottom-[20%] left-0 -z-[1]"
          width={405}
          height={626}
          viewBox="0 0 405 626"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="-302.65"
            y="296.986"
            width="433.92"
            height={140}
            rx="73.8464"
            transform="rotate(-33.796 -302.65 296.986)"
            fill="#7434F8"
            fillOpacity="0.5"
          />
          <rect
            x={-315}
            y="502.403"
            width="666.584"
            height={140}
            rx="73.8464"
            transform="rotate(-33.796 -315 502.403)"
            fill="#FAA515"
            fillOpacity="0.5"
          />
        </svg>

        <svg
          className="absolute -top-[20%] right-0 -z-[1]"
          width={340}
          height={658}
          viewBox="0 0 495 778"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={389} cy={389} r={389} fill="#0d6efd" fillOpacity="0.19" />
        </svg>
        <div className="container px-12 mx-auto">
          <div className="grid xl:grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <h2 className="text-4xl md:text-[40px] text-[#432010] font-semibold leading-normal mb-4 p-4">
                Your Safety, Our Commitment
              </h2>
              <p className="text-[18px] leading-normal text-slate-700 p-4 bg-white/85 backdrop-blur-md rounded-md mb-4">
                These safety courses are more than training—they’re a promise. A
                promise to protect you, so you can return home to your family
                safely every day. Because here at Diamond Mine your safety is
                our Priority.
              </p>
              <h3 className="p-2 text-center md:text-xl xl:text-2xl bg-white/85 rounded-full text-[#432010] font-semibold shadow-lg border-double border-0.5 border-[#432010] border">
                Get your safety training
              </h3>
            </div>
            <div className="col-span-12 md:col-span-8 mt-16">
              <div className="grid lg:grid-cols-2 gap-6 gap-x-5">
                <div className="col-span-2 md:col-span-1">
                  <div>
                    <div className="shadow-lg border-double border border-[#432010] p-1">
                      <div className="p-2 lg:p-2">
                        <div className="text-[40px] text-blue-600 mb-2">
                          <i className="fas fa-cannabis" />
                        </div>
                        <h5 className="text-lg font-medium">
                          Mine Emergency Preparedness and Response
                        </h5>
                        <p className="text-md mt-1">
                          Learn how to respond to emergencies, incl evacuations,
                          first aid, & communication protocols in mining
                          environments.
                        </p>
                      </div>
                    </div>
                    <div className="shadow-lg border-double  border-[#432010] border  h-full p-1 mt-4">
                      <div className="p-2 lg:p-2">
                        <div className="text-[40px] text-blue-600 mb-2">
                          <i className="fas fa-ribbon" />
                        </div>
                        <h5 className="text-lg font-medium ">
                          Hazard Identification and Risk Assessment
                        </h5>
                        <p className="mt-3 text-md">
                          Equip yourself with the skills to identify potential
                          hazards and assess risks to ensure a safer mining
                          workplace.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2  md:col-span-1">
                  <div className="md:mt-12">
                    <div className="bg-white opacity-90 shadow-lg border-double border border-[#432010] p-1 md:mt-4">
                      <div className="p-2 lg:p-2">
                        <div className="text-[40px] text-blue-600 mb-2">
                          <i className="fas fa-camera" />
                        </div>
                        <h5 className="text-lg font-medium">
                          Workplace Safety for Underground Mining
                        </h5>
                        <p className="text-md mt-4">
                          Understand the unique safety challenges of underground
                          mining and learn best practices for mitigating risks.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white shadow-lg border-double border border-[#432010]  h-full p-1 mt-4">
                      <div className="p-2 lg:p-2">
                        <div className="text-[40px] text-blue-600 mb-2">
                          <i className="fab fa-asymmetrik" />
                        </div>
                        <h5 className="text-lg font-medium">
                          Equipment Operation and Maintenance Safety
                        </h5>
                        <p className="text-md mt-4">
                          Gain knowledge on safely operating and maintaining
                          mining equipment to prevent accidents and equipment
                          failures.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseHero;
