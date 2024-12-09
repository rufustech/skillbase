

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
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <h2 className="text-4xl md:text-[40px] text-[#432010] font-bold leading-normal mb-4 p-4">
                Your Safety, Our Commitment
              </h2>
              <p className="text-[24px] leading-normal text-slate-700 p-4 bg-white/85 backdrop-blur-md rounded-md mb-4">
                These safety courses are more than training—they’re a promise. A
                promise to protect you, so you can return home to your family
                safely every day. Because here at Diamond Mine your safety is
                our Priority.
              </p>
              <h3 className="p-4 text-center text-3xl bg-[#432010] rounded-full text-white font-bold shadow-lg shadow-brown-300">
                Click on the Courses to Begin
              </h3>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-2 gap-6 gap-x-5">
                <div className="col-span-2 md:col-span-1">
                  <div>
                    <div className="shadow h-full p-3">
                      <div className="p-4 lg:p-8">
                        <div className="text-[40px] text-blue-600 mb-2">
                          <i className="fas fa-cannabis" />
                        </div>
                        <h5 className="text-xl font-medium my-4">
                          Mine Emergency Preparedness and Response
                        </h5>
                        <p className="opacity-75 mt-3">
                          Learn how to effectively respond to emergencies,
                          including evacuations, first aid, and communication
                          protocols in mining environments.
                        </p>
                      </div>
                    </div>
                    <div className="shadow h-full p-3 mt-4">
                      <div className="p-4 lg:p-8">
                        <div className="text-[40px] text-blue-600 mb-2">
                          <i className="fas fa-ribbon" />
                        </div>
                        <h5 className="text-xl font-medium my-6">
                          Hazard Identification and Risk Assessment
                        </h5>
                        <p className="opacity-75 mt-4">
                          Equip yourself with the skills to identify potential
                          hazards and assess risks to ensure a safer mining
                          workplace.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="md:mt-12">
                    <div className="bg-white shadow h-full p-3 md:mt-4">
                      <div className="p-4 lg:p-8">
                        <div className="text-[40px] text-blue-600 mb-2">
                          <i className="fas fa-camera" />
                        </div>
                        <h5 className="text-xl font-medium my-6">
                          Workplace Safety for Underground Mining
                        </h5>
                        <p className="opacity-75 mt-4">
                          Understand the unique safety challenges of underground
                          mining and learn best practices for mitigating risks.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white  shadow h-full p-3 mt-4">
                      <div className="p-4 lg:p-8">
                        <div className="text-[40px] text-blue-600 mb-2">
                          <i className="fab fa-asymmetrik" />
                        </div>
                        <h5 className="text-xl font-medium my-6">
                          Equipment Operation and Maintenance Safety
                        </h5>
                        <p className="opacity-75 mt-4">
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

  )
}

export default CourseHero
