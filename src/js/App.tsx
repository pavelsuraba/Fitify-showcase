import logo from '../assets/logo.svg'
import { ExerciseListWithData } from './components/ExerciseListWithData'

const App = () => {
  return (
    <div className="flex flex-col items-center">
      <img className="mt-14" src={logo} alt="Fitify logo" />

      <div className="mt-11 w-full max-w-[632px] px-4">
        <ExerciseListWithData />
      </div>
    </div>
  )
}

export default App
