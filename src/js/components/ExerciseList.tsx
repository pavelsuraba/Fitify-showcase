import { useState } from 'react'
import pluralize from 'pluralize'
import Highlighter from 'react-highlight-words'
import LazyLoad from 'react-lazy-load'

import { Exercise } from '../utils/data'
import { filterValue } from '../utils/string'
import { ExerciseListItem } from './ExerciseListItem'

import { Dialog } from './Dialog'
import { ExerciseDetail } from './ExerciseDetail'

const getHeadingText = (count: number) => {
  return count > 0
    ? `${count} ${pluralize('exercise', count)}`
    : 'No exercises found'
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 12 12"
  >
    <path
      fill="#BDBDBD"
      d="M8.333 7.333h-.526l-.187-.18a4.314 4.314 0 0 0 1.047-2.82 4.333 4.333 0 1 0-4.334 4.334c1.074 0 2.06-.394 2.82-1.047l.18.187v.526l3.334 3.327.993-.993-3.327-3.334Zm-4 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Z"
    />
  </svg>
)

type Props = {
  data: Exercise[]
}

export const ExerciseList = ({ data }: Props) => {
  const [query, setQuery] = useState('')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const filteredData =
    query.length > 0
      ? data.filter((exercise) => filterValue(exercise.title, query))
      : data

  const hasResults = filteredData.length > 0

  return (
    <div className="px-4 py-5 bg-gray-light rounded-[10px]">
      <p className="text-base font-medium">
        {getHeadingText(filteredData.length)}
      </p>

      <div className="mt-6 relative">
        <div className="absolute left-2 top-2">
          <SearchIcon />
        </div>
        <input
          aria-label="Search"
          type="text"
          className="px-2 pl-7 w-full rounded bg-gray-dark h-7 outline-0 border border-transparent focus:border-gray-300"
          onChange={handleSearch}
          value={query}
        />
      </div>

      {hasResults && (
        <ul className="mt-2 max-h-[45vh] flex flex-col overflow-auto gap-1">
          {filteredData.map((exercise) => (
            <li key={exercise.code}>
              <LazyLoad height={46}>
                <ExerciseListItem
                  code={exercise.code}
                  tool={exercise.tool}
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <Highlighter
                    highlightClassName="font-bold"
                    searchWords={[query]}
                    textToHighlight={exercise.title}
                  />
                </ExerciseListItem>
              </LazyLoad>
            </li>
          ))}
        </ul>
      )}

      <Dialog
        isVisible={Boolean(selectedExercise)}
        onClose={() => setSelectedExercise(null)}
      >
        {selectedExercise && (
          <ExerciseDetail
            title={selectedExercise.title}
            hints={selectedExercise.hints}
            tool={selectedExercise.tool}
            code={selectedExercise.code}
          />
        )}
      </Dialog>
    </div>
  )
}
