import { useState } from 'react'
import { useGlobalState } from '../GlobalState'
import { QuestionType, Course } from '../types/options'
import './Modal.css'

function Modal() {

  const { setChatLoaded } = useGlobalState();
  const [showCourseSelect, setShowCourseSelect] = useState(true);
  const [showTypeSelect, setShowTypeSelect] = useState(true);
  const [showDislaimer, setShowDisclaimer] = useState(true);
  // TODO: Add "unspecified" option to course and don't allow closing the course modal
  // if unspecified is selected
  // This shouldn't be done until either more courses are added or rapid testing of the UI is not required anymore
  const { setQuestion, setCourse } = useGlobalState()

  /* The course-select select box can be changed to its own function/component if the sidebar version
   * should look identical to this modal version */
  const courseSelectModal = () => {
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCourse(event.target.value as Course)
    }
    return (
    <>

      <p>hello</p>
      <div className="course-modal">
	<div className="course-modal-content">
	  <p className="modal-text">Select the course you are taking</p>
	  <select className="interactive select-box" onChange={onChange}> 
	      {Object.values(Course).map((option) => (
	      <option key={option} value={option}>
	      {option}
	      </option>
	      ))}
	  </select>
	  <button onClick={() => {
	      setShowCourseSelect(false)
	    }} className="interactive modal-close-button">Done</button>

	</div>
      </div>
    </>
  )}

  const typeSelectModal = () => {

    return (

    <>
      <div id="TypeSelectModal" className="type-modal">
	<div className="type-modal-content">
	  <p className="modal-text">What type of question do you have?</p>
	  <button onClick={() => {
	      setShowTypeSelect(false)
	      setQuestion(QuestionType.CONCEPT)
	    }}className="interactive modal-close-button">I have a question about a concept</button>
	  <button onClick={() => {
	      setShowTypeSelect(false)
	      setQuestion(QuestionType.PROBLEM)
	    }}className="interactive modal-close-button">I have a question about a problem</button>

	</div>
      </div>
    </>
  )}

  const disclaimerModal = () => {
    return (
      <>
      <div id="TypeSelectModal" className="type-modal">
	<div className="type-modal-content">
	  <p className="modal-text">This is a placeholder for the disclaimer</p>
	  <button onClick={() => {
	      setShowDisclaimer(false)
	    }}className="interactive modal-close-button">I Accept</button>

	</div>
      </div>
      </>
    )
  }


  if (showDislaimer) return disclaimerModal()
  if (showCourseSelect) return courseSelectModal()
  if (showTypeSelect) return typeSelectModal()
  setChatLoaded(true)
  return (<></>)
}

export default Modal
