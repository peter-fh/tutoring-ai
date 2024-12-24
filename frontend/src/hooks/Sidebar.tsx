import { Course, DetailLevel, QuestionType } from '../types/options'
import { useGlobalState } from '../GlobalState'
import './Sidebar.css'

function NewConversationButton() {
  return (
    <button onClick={ () => {
      window.location.reload()
    }} className="new-conversation-button">New Conversation</button>
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

      <select name="course-select" id="modal-course-select" className="select-box" onChange={onChange} defaultValue={course}> 
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
      <select className="select-box" onChange={onChange} value={question}>
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
  return (
    <div className="option">
      <h3>Level of Detail</h3>
      <select name="brevity-select" id="brevity-select" className="select-box" defaultValue={Object.values(DetailLevel)[2]}>
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
          <h2>Controls</h2>
          <NewConversationButton/>
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
