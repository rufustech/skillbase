function IncidentReporting() {
  return (
    <div>
      <section className="py-4 text-gray-800 sm:py-24">
        <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <form className=" p-4">
            <div className="border border-gray-100 shadow-gray-500/20 my-4 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
              <div className="relative border-b border-gray-300 p-4 py-8 sm:px-8">
                <h3 className="mb-1 text-3xl font-medium">Lesson Title</h3>
              </div>
              <div className="p-4 sm:p-8">
                <label htmlFor="course">Select Course:</label>
                <select
                  id="course"
                  className="peer my-4 w-full resize-y rounded-lg border px-4 py-2"

                  //   value={selectedCourseId}
                  //   onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <label htmlFor="lessonTitle">Lesson Name:</label>
                <input
                  id="lessonTitle"
                  type="text"
                  className="mt-4 w-full resize-y rounded-lg border px-4 py-2"
                  placeholder="Enter Lesson Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="imageUrl">Lesson Image URL:</label>
                <input
                  id="imageUrl"
                  type="text"
                  className="mt-2 w-full resize-y rounded-lg border px-4 py-2"
                  placeholder="Enter Lesson Image URL"
                  value={image}
                  onChange={(e) => setImageURL(e.target.value)}
                />
                <label className="mt-5 mb-2 inline-block">
                  Lesson Content:
                </label>
                <textarea
                  id="content"
                  className="mb-8 w-full resize-y rounded-lg border px-4 py-2"
                  placeholder="Enter Lesson Content"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleCreateLesson}
                  className="w-full rounded-lg bg-blue-700 p-3 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "SUBMIT"}
                </button>
              </div>
            </div>
          </form>
          <div className="max-w-2xl px-4 text-left">
            <p className="mb-2 text-blue-600">Upload Courses and Lessons</p>
            <h3 className="mb-5 text-3xl font-semibold">Upload a Course</h3>
            <p className="mb-16 text-lg text-gray-600">
              Manage courses and lessons efficiently with this interface.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IncidentReporting;
