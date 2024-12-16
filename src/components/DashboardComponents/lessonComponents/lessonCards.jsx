function LessonCard({ title, content, image }) {
  return (
    <div className="mb-6 px-2 lg:px-12 py-6">
      <img
        src={image}
        // src="https://cdn.easyfrontend.com/pictures/blog/blog_13_3.jpg"
        alt=""
        className="max-h-[600px] w-full  rounded-md object-cover"
      />
      <h2 className="text-2xl p-2 ml-[-12] font-bold">{title}</h2>
      <p className="mt-2 p-2 border-double border-0.5 border-gray-300 rounded-lg border text-base">
        {content}
      </p>
    </div>
  );
}

export default LessonCard;
