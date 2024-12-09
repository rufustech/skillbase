import { safetycertificate } from "../../assets";
import SideBar from "../SideBar";

function Completions() {
  return (
    <div>
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        <SideBar />
        <div className="p-4 sm:ml-64 container mx-auto">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* <h1 className="text-green-700 text-4xl">Completed Courses</h1> */}


<section className="ezy__featured34 light py-14 md:py-24 bg-white  text-zinc-900  relative overflow-hidden z-10">
  <div className="container px-4 mx-auto">
    <div className="grid grid-cols-12 mb-12 relative">
      <div className="absolute -right-full -bottom-48   min-w-[250vw] h-[1000px] md:right-1/4" />
      <div className="col-span-12 md:col-span-8 lg:col-span-5 xl:col-span-4 text-start text-zinc-900  relative">
        <h2 className="text-2xl leading-none md:text-[45px] font-bold mb-6">
          Completed Courses
        </h2>
        <p className="text-lg opacity-80 leading-6 mb-6">
          Hello Rufaro your Completed Courses
        </p>
      </div>
    </div>
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-10 lg:col-start-2">
        <div className="relative bg-white  shadow-xl p-4 md:p-16">
          <div className="grid grid-cols-2 gap-6 text-center">
            {/* item */}
            <div className="col-span-2 md:col-span-1">
              <div className="bg-white shadow-2xl relative rounded-xl p-6 lg:p-12">
                <img
                  src={safetycertificate}
                  alt=""
                  className="max-w-full h-auto mx-auto rounded-xl max-h-[200px] object-cover mb-6"
                />
                <h4 className="text-2xl font-bold mb-4">Product Design</h4>
                <p className="opacity-70">
                  Assumenda non repellendus distinctio nihil dicta sapiente,
                  quibusdam maiores, illum at, aliquid blanditiis eligendi qui.
                </p>
              </div>
            </div>
            {/* item */}
            <div className="col-span-2 md:col-span-1">
              <div className="bg-white shadow-2xl relative rounded-xl p-6 lg:p-12">
                <img
                  src={safetycertificate}
                  alt=""
                  className="max-w-full h-auto mx-auto rounded-xl max-h-[200px] object-cover mb-6"
                />
                <h4 className="text-2xl font-bold mb-4">Branding</h4>
                <p className="opacity-70">
                  Man our from light they're cattle upon created female. You
                  first land evening beast won't had bring first void meat.
                </p>
              </div>
            </div>
            {/* item */}
            <div className="col-span-2 md:col-span-1">
              <div className="bg-white  shadow-2xl relative rounded-xl p-6 lg:p-12">
                <img
                  src={safetycertificate}
                  alt=""
                  className="max-w-full h-auto mx-auto rounded-xl max-h-[200px] object-cover mb-6"
                />
                <h4 className="text-2xl font-bold mb-4">Photography</h4>
                <p className="opacity-70">
                  Bearing bearing form night spirit, for signs isn't, tree
                  fourth i there two land deep man without seasons fill itself.
                </p>
              </div>
            </div>
            {/* item */}
            <div className="col-span-2 md:col-span-1">
              <div className="bg-white  shadow-2xl relative rounded-xl p-6 lg:p-12">
                <img
                  src={safetycertificate}
                  alt=""
                  className="max-w-full h-auto mx-auto rounded-xl max-h-[200px] object-cover mb-6"
                />
                <h4 className="text-2xl font-bold mb-4">Marketing</h4>
                <p className="opacity-70">
                  Moving seasons, tree you're creeping third behold may be.
                  Whose living for moving female seas heaven unto winged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Completions;
