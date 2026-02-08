import LessonNode from "./LessonNode";

export default function LevelCard({ level, onLessonClick }) {
  return (
    <div className="bg-[#0f172a] rounded-xl p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        Level {level.level}
      </h2>

      <div className="flex gap-4 flex-wrap">
        {level.lessons.map((lesson) => (
          <LessonNode
            key={lesson.id}
            lesson={lesson}
            onClick={() => onLessonClick(level.level, lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}
