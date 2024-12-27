import { useState } from 'react'
import { useGlobalState } from '../GlobalState'
import { QuestionType, Course } from '../types/options'
import './Modal.css'

function Modal() {

  const { setChatLoaded } = useGlobalState();
  const [showFirst, setShowFirst] = useState(true);
  const [hideSecond, setHideSecond] = useState(false);
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
      <div id="CourseSelectModal" className="course-modal">
	<div className="course-modal-content">
	  <p>Select the course you are taking</p>
	  <select name="course-select" id="modal-course-select" className="select-box" onChange={onChange}> 
	      {Object.values(Course).map((option) => (
	      <option key={option} value={option}>
	      {option}
	      </option>
	      ))}
	  </select>
	  <button onClick={() => {
		setShowFirst(false)
	    }} id="modalCloseButton" className="modal-close-button">Done</button>

	</div>
      </div>
    </>
  )}

  const typeSelectModal = () => {

    return (

    <>
      <div id="TypeSelectModal" className="type-modal">
	<div className="type-modal-content">
	  <p>What type of question do you have?</p>
	  <button onClick={() => {
	      setHideSecond(true)
	      setChatLoaded(true)
	      setQuestion(QuestionType.CONCEPT)
	    }} id="modalCloseButton" className="modal-close-button">I have a question about a concept</button>
	  <button onClick={() => {
	      setHideSecond(true)
	      setChatLoaded(true)
	      setQuestion(QuestionType.PROBLEM)
	    }} id="modalCloseButton" className="modal-close-button">I have a question about a problem</button>

	</div>
      </div>
    </>
  )}

  return (
    <>
      {showFirst ? courseSelectModal() : !hideSecond && typeSelectModal()}
    </>
  )
}

export default Modal
