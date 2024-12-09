function CourseCard(props) {
    return (
      <div className="mx-auto p-2 hover:scale-105">
        <a href="#" className="block max-w-sm p-6 h-52 border border-gray-200 rounded-lg shadow hover:bg-gray-500 group">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 group-hover:text-white">
            {props.title}
          </h5>
          <p className="font-normal text-gray-700 group-hover:text-white">
            {props.description}
          </p>
        </a>
      </div>
    );
  }
  
  export default CourseCard
