import { Course, DetailLevel, QuestionType } from '../types/options'
import { useGlobalState } from '../GlobalState'
import './Sidebar.css'

function Buttons() {
  const { setSave } = useGlobalState()
  return (
    <>
      <button onClick={ () => {
        window.location.reload()
      }} className="sidebar-button">
        <i className="fa-solid fa-plus"/>
      </button>
      <button onClick={ () => {
        setSave(true)
      }} className="sidebar-button">
        <i className="fa-solid fa-download"/>
      </button>
    </>
  )
}

function CourseSelect() {
  const { course, setCourse } = useGlobalState()
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCourse(event.target.value as Course)
  }

  return (
    <div className="option">
      <h3>Course</h3>

      <select className="interactive select-box" onChange={onChange} value={course}> 
        {Object.values(Course).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function QuestionTypeSelect() {
  const { question, setQuestion } = useGlobalState()
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestion(event.target.value as QuestionType)
  }
  return (
    <div className="option">
      <h3>Question Type</h3>
      <select className="select-box interactive" onChange={onChange} value={question}>
        {Object.values(QuestionType).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function BrevitySelect() {
  const { detailLevel, setDetailLevel} = useGlobalState()
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDetailLevel(event.target.value as DetailLevel)
  }
  return (
    <div className="option">
      <h3>Level of Detail</h3>
      <select className="select-box interactive" onChange={onChange} value={detailLevel}>
        {Object.values(DetailLevel).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}


function Attribution() {
  return (
    <a className="attribution" href="https://www.flaticon.com/free-icons/robot" title="robot icons">Robot icons created by Fajriah Robiatul Adawiah - Flaticon</a>
  )
}

function Sidebar() {

  return (
    <>
      <div className="sidebar">
        <div className="options">
          <Buttons/>
          <CourseSelect/>
          <QuestionTypeSelect/>
          <BrevitySelect/>
        </div>
        <Attribution/>
      </div>
    </>
  )
}

export default Sidebar
