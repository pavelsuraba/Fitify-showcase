import {
  EXERCISE_PACKS_URL,
  ExercisePacksResponse,
  getExercisePackUrl,
  useFitifyData,
  useFitifyExerciseListData,
} from '../utils/data'
import { ExerciseList } from './ExerciseList'

export const ExerciseListWithData = () => {
  const { data, isLoading } =
    useFitifyData<ExercisePacksResponse>(EXERCISE_PACKS_URL)

  if (isLoading) {
    return <>Loading</>
  }

  if (data) {
    const urls = data.tools.map((tool) => getExercisePackUrl(tool.code))

    return <MergedExercisePacksWithData urls={urls} />
  }

  return null
}

const MergedExercisePacksWithData = ({ urls }: { urls: string[] }) => {
  const { data, isLoading } = useFitifyExerciseListData(urls)

  if (isLoading) {
    return <>Loading</>
  }

  if (data) {
    return <ExerciseList data={data} />
  }

  return null
}
