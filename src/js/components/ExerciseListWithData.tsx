import {
  EXERCISE_PACKS_URL,
  getExercisePackUrl,
  useFitifyData,
  useFitifyExerciseListData,
  type ExercisePacksResponse,
} from '../utils/data'
import { ExerciseList } from './ExerciseList'

const Loading = () => <div className="text-center">Loading...</div>
const Error = () => <div className="text-center">Failed to load</div>

export const ExerciseListWithData = () => {
  const { data, error, isLoading } =
    useFitifyData<ExercisePacksResponse>(EXERCISE_PACKS_URL)

  if (error) {
    return <Error />
  }

  if (isLoading) {
    return <Loading />
  }

  const urls = data
    ? data.tools.map((tool) => getExercisePackUrl(tool.code))
    : []

  return <MergedExercisePacksWithData urls={urls} />
}

const MergedExercisePacksWithData = ({ urls }: { urls: string[] }) => {
  const { data, error, isLoading } = useFitifyExerciseListData(urls)

  if (error) {
    return <Error />
  }

  if (isLoading) {
    return <Loading />
  }

  return <ExerciseList data={data} />
}
