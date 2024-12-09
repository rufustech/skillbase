import { ppe } from "../../assets";
import SideBar from "../SideBar";

function Certificates() {
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
        <div className="p-4 sm:ml-64">
          <div className="p-4 shadow shadow-lg rounded-lg ">
            
            <section className="ezy__featured52 light py-4 md:py-8 bg-white text-black dark:text-white relative overflow-hidden z-10">
  <div className="container px-4 mx-auto">
    <div className="flex max-w-3xl justify-center text-center mx-auto">
      <div>
        <h1 className="text-3xl text-[#432010] font-bold leading-tight md:text-[45px] mb-12">
        Certificates
        </h1>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6 items-center">
      <div className="col-span-2 md:col-span-1 md:order-2">
        <div className="relative mb-12">
          <img
            src={ppe}
            alt=""
            className="rounded-3xl max-w-full h-auto mx-auto"
          />
          {/* <img
            src={"https://cdn.easyfrontend.com/pictures/services/service19_1_2.png"}
            alt=""
            className="absolute -bottom-24 left-0 -md:left-32 max-w-full h-auto"
          /> */}
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 mt-12 md:mt-0 lg:mr-12">
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
        </div>
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
        </div>
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
        </div>
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
        </div>
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
        </div>
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
        </div>
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
        </div>
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
        </div>
        <div className="border border-black text-slate-700 flex items-center rounded-xl p-4 mb-4">
          <div className="flex justify-center items-center text-[15px] p-3 bg-blue-600 text-white rounded-full mr-3">
            <i className="fas fa-check" />
          </div>
          <h4 className="text-[17px]">
            Safety in Mining
          </h4>
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

export default Certificates;
