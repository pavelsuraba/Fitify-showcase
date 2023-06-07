import useSWR from 'swr'

export const EXERCISE_PACKS_URL =
  'https://static.gofitify.com/exercises/manifest_v6.json'

type Tool = {
  code: string
  exercise_count: number
  size: number
  version: number
}

export type ExercisePacksResponse = { tools: Tool[] }

export const getExercisePackUrl = (pack: string) =>
  `https://static.gofitify.com/exercises/${pack}/exercises_${pack}_v5.json`

export const getExerciseThumbnailUrl = (pack: string, exercise: string) =>
  `https://static.gofitify.com/exercises/${pack}/thumbnails/${exercise}.jpg`

export const getExerciseVideoUrl = (pack: string, exercise: string) =>
  `https://static.gofitify.com/exercises/${pack}/videos/${exercise}.mp4`

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const fetcherMultiple = (urls: string[]) => {
  return Promise.all(urls.map((url) => fetcher(url)))
}

export const useFitifyData = <T>(url: string) => {
  const response = useSWR<T>(url, fetcher)

  return response
}

export type ExerciseCode = string

export type Exercise = {
  code: ExerciseCode
  title: string
  hints: string[]
  tool: string
}

type DBExercise = {
  code: ExerciseCode
  title: string
  tool: string | null
  instructions: {
    hints: string[]
  }
}

type ExercisesResponse = Array<{ exercises: DBExercise[] }>

export type ExerciseDictionary = Record<
  ExerciseCode,
  { title: DBExercise['title']; hints: DBExercise['instructions']['hints'] }
>

const swrOptions = {
  revalidateOnFocus: false,
}

export const useFitifyExerciseListData = (urls: string[]) => {
  const { data: rawData, ...rest } = useSWR<ExercisesResponse>(
    urls,
    fetcherMultiple,
    swrOptions,
  )
  const data: Exercise[] = []

  if (rawData) {
    rawData.forEach(({ exercises }) => {
      exercises.forEach((exercise) => {
        data.push({
          code: exercise.code,
          title: exercise.title,
          hints: exercise.instructions?.hints,
          tool: exercise.tool || 'bodyweight', // TODO(missing tool code for bodyweight)
        })
      })
    })
  }

  return {
    data,
    ...rest,
  }
}
