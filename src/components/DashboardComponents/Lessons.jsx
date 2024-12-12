
import { useParams } from "react-router-dom";
import { workerLesson } from "../../assets";
import SideBar from "../SideBar";
import { useEffect, useState } from "react";
import LessonCard from "./lessonComponents/lessonCards";
import SafetyTip from "./lessonComponents/SafetyTip";
import { urls } from "../constants";

function Lessons() {

  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true);
  const [courses, setCourseTitle] = useState("")

  //TODO:
  //Get use the localhost:5000/api/

  //TODO: create Form for Course then  Lessons if time permits

// const [title, setTitle] = useState("");
 const {courseId} = useParams(); //Destructure get you the value TODO:
 
 
 


 console.log(courseId);

 async function fetchLesson() {
  
  try {
    const url = `${urls.url}/api/lessons/courses/${courseId}`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log("API response data:", result.data);
    if (result.success) {
      setLessons(result.data); // Extract the array from the `data` key
    } else {
      throw new Error("API response does not contain a valid 'data' array.");
    }
  } catch (error) {
    console.error("Unable to fetch data:", error);
    
  }
  
 }

 // Fetch course title
 async function fetchCourseTitle() {
  try {
    const response = await fetch(`${urls.url}/api/courses/${courseId}`);
    const result = await response.json();
    if (result.success) {
      console.log("response data",result.data.title);
      
      setCourseTitle(result.data.title); // Assuming `title` is part of the returned data
    }
  } catch (error) {
    console.error("Error fetching course title:", error);
  }
}


 useEffect(() => {
  fetchLesson();
  fetchCourseTitle()
}, [courseId]);
 
const mainTitle = courses.length > 0 ? courses : "Default Title";
 
// const lessontitle = lessons.length > 0 ? lessons[0].title : "Default Title";


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

      
  <div className="p-4  sm:ml-64">
    <div className="p-4 shadow shadow rounded-lg dark:border-gray-700">
      <section className="ezy__blogdetails5 light py-4 md:py-8 bg-[#f9fafa] text-zinc-900 ">
        <div className="container mx-auto px-4">
           <h4 className="text-4xl font-medium text-[#432010]  justify-center text-center mx-auto mb-2"> {mainTitle}</h4>
           <div className="grid grid-cols-12 gap-5 md:gap-7">
      {/* sidebar */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 order-2 md:order-1">
              <div>
               
                         <SafetyTip />
           

        
          <div className="mt-12">
            <h4 className="text-2xl text-[#432010] font-medium mb-6">LATEST COURSES</h4>
            <div className="border dark:border-gray-600 rounded-md p-8">
              <ul className="flex flex-col">
                <li className="border-b dark:border-b-gray-600 py-2">
                  <i className="fas fa-comment mr-" />
                  
                  <a
                    href="#"
                    className="font-semibold hover:text-blue-600 transition"
                  >
                    Workplace Safety for Underground Mining
                  </a>
                </li>
                <li className="border-b dark:border-b-gray-600 py-2">
                  <i className="fas fa-comment " />
                  
                  <a
                    href="#"
                    className="font-semibold hover:text-blue-600 transition"
                  >
                     Hazard Identification and Risk Assessment
                  </a>
                </li>
                <li className="py-2">
                  <i className="fas fa-comment " />
                  
                  <a
                    href="#"
                    className="font-semibold hover:text-blue-600 transition"
                  >
                    Equipment Operation and Maintenance Safety
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* main contents */}
      <div className="col-span-12 ml-1 md:col-span-8 lg:col-span-9 order-1 md:order-2">
        <div className="border-gray-300 border shadow-xl p-4s rounded-lg">
       
          
          
             
          {lessons.length > 0 ? (lessons.map((lesson) => (
    <LessonCard key={lesson._id} image={lesson.image} title={lesson.title} content={lesson.content} />
  ))
) : (
  <p className="p-2">No lessons available.</p>
)}

         
           {/* comment */}
          <div className="bg-blue-600 bg-opacity-10 flex items-start p-6 md:p-12 mt-6 md:mt-12">
            <img
              src="https://cdn.easyfrontend.com/pictures/users/user13.jpg"
              alt=""
              className="max-w-full h-auto rounded-full"
              width={70}
            />
            <div className="ml-4">
              <h5 className="font-medium font-bold text-3xl mb-1 px-4 py-2 uppercase">acknowledgement</h5>
             
              <p className="leading-relaxed text-justify opacity-75">
              <label>
        <input className="w-8 h-8 border-2 border-blue-500 rounded-sm bg-white" type="checkbox" />
      
        <span className="px-4 py-2 justify-center text-2xl">Acknowledge You have read and understood the safety training</span> 
             
      </label>
      
              </p>
            </div>
          </div>
          {/* related posts */}
          <div className="mt-12 px-16 py-8">
            <h4 className="text-2xl font-medium mb-4">Take your Assessent</h4>


 <a
              href="/login"
              className="h-16 w-60 bg-[#432010] flex items-center justify-start rounded-full mt-5 p-1.5  hover:opacity-80 transition "
            >
              <span className="flex flex-1 items-center justify-center uppercase text-white text-lg font-bold">
                Start quiz
              </span>
              <div className=" h-9 w-9 bg-[white] rounded-full flex items-center justify-center -rotate-45 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <span className="sr-only">Arrow Right Icon</span>
              </div>
            </a>
          
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

export default Lessons;
