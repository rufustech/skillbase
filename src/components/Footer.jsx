import { safetyhelmets } from "../assets";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="w-full bg-gray-100 bottom-0 rounded-lg shadow m-4 z-50">
      <div className="w-full  mx-auto md:py-8">
        <div className="sm:flex px-20 sm:items-center sm:justify-between">
          <a
            href="https://skillbase.ca/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={safetyhelmets} className="h-16" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#432010]">
              Skillbase
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 " />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {currentYear}{" "}
          <a href="https://www.rufarodev.com/" className="hover:underline">
            Rufaro Mucheri
          </a>
          . All Rights Reserved. Skillbase™
        </span>
      </div>
    </footer>
  );
}

export default Footer;
