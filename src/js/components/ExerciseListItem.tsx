import { ExerciseCode, getExerciseThumbnailUrl } from '../utils/data.ts'
import { PropsWithChildren } from 'react'

type Props = {
  code: ExerciseCode
  tool: string
}

export const ExerciseListItem = ({
  code,
  tool,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className="flex items-center h-[46px] px-2.5 bg-white rounded border border-gray-dark text-xs cursor-pointer">
      <img
        src={getExerciseThumbnailUrl(tool, code)}
        className="w-[30px] mr-1"
        alt=""
      />
      {children}
    </div>
  )
}
