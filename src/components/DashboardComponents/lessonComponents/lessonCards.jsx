function LessonCard({ title, content, image }) {
    return (
      <div className="mb-6 px-16 py-6">
           <img
            src={image}
            // src="https://cdn.easyfrontend.com/pictures/blog/blog_13_3.jpg"
            alt=""
            className="max-h-[600px] w-full  rounded-md object-cover"
          />
        <h2 className="text-2xl ml-[-12] font-bold">{title}</h2>
        <p className="mt-2 text-base">{content}</p>
      </div>
    );
  }

  export default LessonCard;
  