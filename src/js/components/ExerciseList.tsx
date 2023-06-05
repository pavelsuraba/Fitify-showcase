import {
  EXERCISE_PACKS_URL,
  ExercisePacksResponse,
  getExercisePackUrl,
  useFitifyData,
} from '../utils/data'

export const ExerciseList = () => {
  const { data } = useFitifyData<ExercisePacksResponse>(EXERCISE_PACKS_URL)

  // const { data: aaa } = useFitifyData<ExercisePacksResponse>(
  //   'https://static.gofitify.com/exercises/trx/exercises_trx_v5.json',
  // )

  if (data) {
    const urls = data.tools.map((tool) => getExercisePackUrl(tool.code))

    console.log(data.tools)
    console.log(urls)
  }

  return <div>exercises</div>
}
