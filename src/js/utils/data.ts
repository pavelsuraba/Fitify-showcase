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

export const getExercisePackUrl = (code: string) =>
  `https://static.gofitify.com/exercises/${code}/exercises_${code}_v5.json`

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const useFitifyData = <T>(url: string) => {
  const response = useSWR<T>(url, fetcher)

  return response
}
