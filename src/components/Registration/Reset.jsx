function Reset() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f9fafb]">
       <div className="w-96 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Enter your Email
                </label>
                <input
                  className="appearance-none h-16 bg-white border-double border-1 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="example@email.com"
                //   onChange={(e) => {
                //     const value = e.target.value;
                //     setEmail(value);
                //     emailConditions(value);
                //   }}
                />
                 <button
              className="px-12 py-3 m-2 bg-transparent hover:border-white border-double border-4 border-yellow-700 text-lg border-[#954535] hover:text-white rounded-full hover:grow hover:bg-[#954535] disabled:bg-slate-600 disabled:text-gray-300 bg-[#432010]"
              id="SubmitBtn"
            //   disabled={!isFormValid}
            //   onClick={(e) => {
            //     e.preventDefault();
            //     isCreateAcc ? handleCreateAcc() : handleSignIn(username);
            //   }}
            >
              Submit
            </button>
              </div>
    </div>
  )
}

export default Reset
