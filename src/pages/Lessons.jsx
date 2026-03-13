
import { useNavigate , useParams} from "react-router-dom";
import LevelCard from "../components/LevelCard";


export default function Lesson() {
const { level, lessonId } = useParams();
const navigate = useNavigate();


const startLesson = (lesson) => {
  navigate(`/lessonplay/${lesson.level}/${lesson.lesson_id}`);
};
return ( <div className="min-h-screen bg-[#020617] text-white p-6"> <h1 className="text-xl font-bold">
Lesson {lessonId} (Level {level}) </h1>

  <p className="text-gray-400 mt-2">
    Ready to start this lesson?
  </p>

  <button
onClick={() => startLesson({ level, lesson_id: lessonId })}
  className="mt-4 bg-green-500 px-6 py-2 rounded"
>
  Start Lesson
</button>
</div>
);
}



