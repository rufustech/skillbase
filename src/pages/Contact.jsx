import { safetyhelmets, safetyImage, workers } from "../assets";

function Contact() {
  return (
    <div>
      <div className="container mx-auto">
        <section className="grid lg:grid-cols-2 gap-10 mt-16">
          <div className="p-4">
            <form
              id="contact_form"
              action="https://formspree.io/f/mrbgezwl"
              method="POST"
            >
              <h2 className="text-5xl font-bold text-[#432010]  mb-6">
                Contact Us
              </h2>
              <div className="flex mb-5 gap-2">
                <div className="w-1/2">
                  <label
                    htmlFor="name_field"
                    className="block text-sm text-gray-500"
                  >
                    Your Name:
                  </label>
                  <input
                    className="rounded border-gray-400 w-full p-2 border"
                    type="text"
                    name="name"
                    id="name_field"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="email_field"
                    className="block text-sm text-gray-500"
                  >
                    Email Address:
                  </label>
                  <input
                    className="rounded border-gray-400 w-full p-2 border"
                    type="email"
                    name="email"
                    id="email_field"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message_field"
                  className="block text-sm text-gray-500"
                >
                  Message:
                </label>
                <textarea
                  className="w-full rounded border-gray-400 p-2 border"
                  name="message"
                  id="message_field"
                  rows={6}
                  defaultValue={""}
                />
              </div>
              <button
                type="submit"
                className="rounded-full text-white font-bold bg-[#432010] px-12 py-2 hover:scale-95 hover:text-[#432010] hover:bg-[white] hover:border-4 hover:border-double border-yellow-700 cursor-pointer hover:opacity-80 transition"
              >
                Let Us Know
              </button>
            </form>
            <div>
              <p className="mt-20 text-gray-600 text-xl">
                At Skillbase, we are committed to providing innovative safety
                solutions that empower businesses to protect their workforce and
                ensure a secure working environment. Whether you're looking to
                improve your company's safety culture, implement new safety
                protocols, or require expert advice on managing workplace risks,
                we are here to help. Our team of experienced professionals is
                dedicated to offering tailored safety strategies that meet the
                unique needs of your business.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img width="" src={workers} alt="Logo" className="rounded" />
          </div>
        </section>
      </div>

      <script
        type="text/javascript"
        src="https://form.jotform.com/jsform/222894482731059"
      ></script>
    </div>
  );
}

export default Contact;
