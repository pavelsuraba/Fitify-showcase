import { Exercise, getExerciseVideoUrl } from '../utils/data'
import data from '../utils/instructions.json'

const instructions = data as Record<string, string>

type Props = {
  title: Exercise['title']
  hints: Exercise['hints']
  tool: Exercise['tool']
  code: Exercise['code']
}

export const ExerciseDetail = ({ title, hints, tool, code }: Props) => {
  return (
    <div>
      <div className="min-h-[220px]">
        <video
          className="w-[300px] mx-auto"
          src={getExerciseVideoUrl(tool, code)}
          autoPlay
          loop
        />
      </div>
      <p className="text-center font-medium text-xl mt-7">{title}</p>
      <p className="mt-5 mx-16">
        {hints.map((hint, i) => (
          <span key={i}>{`${instructions[hint]} `}</span>
        ))}
      </p>
    </div>
  )
}
