function LessonCard({ title, content }) {
    return (
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-base">{content}</p>
      </div>
    );
  }

  export default LessonCard;
  