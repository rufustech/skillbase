function LessonCard({ title, content }) {
    return (
      <div className="mb-6 px-16 py-6">
        <h2 className="text-2xl ml-[-12] font-bold">{title}</h2>
        <p className="mt-2 text-base">{content}</p>
      </div>
    );
  }

  export default LessonCard;
  