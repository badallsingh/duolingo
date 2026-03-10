import LessonNode from "./LessonNode";

export default function LevelCard({ level, onLessonClick }) {
return ( <div className="bg-[#0f172a] rounded-xl p-4 mb-6">


  <h2 className="text-lg font-semibold mb-4">
    Level {level.level}
  </h2>

  <div className="flex gap-4 flex-wrap">

    {level.lessons.map((lesson) => (
      <LessonNode
        key={lesson.lesson_id}
        lesson={lesson}
        level={level.level}
        onClick={() =>
          onLessonClick(level.level, lesson.lesson_id)
        }
      />
    ))}

  </div>

</div>


);
}
