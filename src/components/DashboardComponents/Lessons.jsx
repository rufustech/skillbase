
import { useParams } from "react-router-dom";
import { workerLesson } from "../../assets";
import SideBar from "../SideBar";
import { useEffect, useState } from "react";
import LessonCard from "./lessonComponents/lessonCards";

function Lessons() {

  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true);

  //TODO:
  //Get use the localhost:5000/api/

  //TODO: create Form for Course then  Lessons if time permits

// const [title, setTitle] = useState("");
 const {courseId} = useParams(); //Destructure get you the value TODO:
 console.log(courseId);

 async function fetchLesson() {
  
  try {
    const url = `http://localhost:5000/api/lessons/courses/${courseId}`
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

 useEffect(() => {
  fetchLesson();
}, [courseId]);
 
const mainTitle = lessons.length > 0 ? lessons[0].title : "Default Title";
 


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
    <div className="p-4 shadow shadow-lg rounded-lg dark:border-gray-700">
      <section className="ezy__blogdetails5 light py-4 md:py-8 bg-[#f9fafa] text-zinc-900 ">
        <div className="container mx-auto px-4">
           <h4 className="text-4xl font-medium text-[#432010]  justify-center text-center mx-auto mb-2"> {mainTitle}</h4>
           <div className="grid grid-cols-12 gap-5 md:gap-7">
      {/* sidebar */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 order-2 md:order-1">
              <div>
                <div>
            
            <p className="opacity-75">
              Holisticly re-engineer long-term high-impact convergence via
              emerging bandwidth. Distinctively repurpose real-time
              opportunities without long-term high-impact potentialities.
              Interactively monetize corporate outsourcing before unique core
              competencies.
            </p>
          </div>
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
      <div className="col-span-12 md:col-span-8 lg:col-span-9 order-1 md:order-2">
        <div className="border-gray-300 border shadow-xl p-4 rounded-lg">
          <img
            src={workerLesson}
            // src="https://cdn.easyfrontend.com/pictures/blog/blog_13_3.jpg"
            alt=""
            className="max-h-[600px] w-full rounded-md object-cover"
          />
          
           <h4 className="mt-6 text-[#432010] font-medium text-2xl opacity-75">
         
          </h4>
             
          {lessons.length > 0 ? (lessons.map((lesson) => (
    <LessonCard key={lesson._id} title={lesson.title} content={lesson.content} />
  ))
) : (
  <p>No lessons available.</p>
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
              <h5 className="font-medium text-xl mb-1">George Codex</h5>
              <p className="opacity-75 mb-2">
                15 Jan 2022 in Design, Develop, Wordpress
              </p>
              <p className="leading-relaxed text-justify opacity-75">
                In et volutpat risus. Vestibulum at elementum nibh, at laoreet
                mauris. Ut eget mi in nisl rhoncus suscipit. Donec sed elementum
                dui. Sed tempus sagittis gravida. Etiam sit amet aliquam mauris,
                non sodales sapien. Curabitur non arcu dignissim, consectetur mi
                ut.
              </p>
            </div>
          </div>
          {/* related posts */}
          <div className="mt-12 pt-6">
            <h4 className="text-2xl font-medium mb-4">MORE COURSES</h4>
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* post start */}
              <div className="mt-4">
                <div className="flex items-start">
                  <img
                    src="https://cdn.easyfrontend.com/pictures/blog/blog_12_4.png"
                    alt=""
                    width={50}
                    className="max-w-full h-auto mr-3"
                  />
                  <div>
                    <a href="#">
                      <h6 className="font-medium mb-2">
                        Decide what type of teacher you want to be
                      </h6>
                    </a>
                    <p className="opacity-75">Jun 29</p>
                  </div>
                </div>
              </div>
              {/* post start */}
              <div className="mt-4">
                <div className="flex items-start">
                  <img
                    src="https://cdn.easyfrontend.com/pictures/blog/blog_12_3.png"
                    alt=""
                    width={50}
                    className="max-w-full h-auto mr-3"
                  />
                  <div>
                    <a href="#">
                      <h6 className="font-medium mb-2">
                        How I’m Styling Everyday Black Outfits
                      </h6>
                    </a>
                    <p className="opacity-75">Aug 15</p>
                  </div>
                </div>
              </div>
              {/* post start */}
              <div className="mt-4">
                <div className="flex items-start">
                  <img
                    src="https://cdn.easyfrontend.com/pictures/blog/blog_12_5.png"
                    alt=""
                    width={50}
                    className="max-w-full h-auto mr-3"
                  />
                  <div>
                    <a
                      href="#"
                      className="font-semibold hover:text-blue-600 transition"
                    >
                      <h6 className="font-medium mb-2">
                        Long lasting fall scent for women sale offer
                      </h6>
                    </a>
                    <p className="opacity-75">Sep 17</p>
                  </div>
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
    </div>

      </div>
    </div>
  );
}

export default Lessons;
