import { useState } from 'react'
import pluralize from 'pluralize'
import Highlighter from 'react-highlight-words'
import LazyLoad from 'react-lazy-load'

import { Exercise } from '../utils/data'
import { filterValue } from '../utils/string'
import { ExerciseListItem } from './ExerciseListItem'

import { Dialog } from './Dialog'
import { ExerciseDetail } from './ExerciseDetail'
import { SearchIcon } from './Icons'

const getHeadingText = (count: number) => {
  return count > 0
    ? `${count} ${pluralize('exercise', count)}`
    : 'No exercises found'
}

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
          placeholder="Search..."
          className="px-2 pl-7 w-full rounded bg-gray-dark h-7 outline-0 border border-transparent focus:border-gray-300"
          onChange={handleSearch}
          value={query}
        />
      </div>

      {filteredData.length > 0 && (
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
        {selectedExercise && <ExerciseDetail exercise={selectedExercise} />}
      </Dialog>
    </div>
  )
}
