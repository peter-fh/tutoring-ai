import { useState } from 'react'
import { useGlobalState } from '../state/GlobalState'
import { QuestionType } from '../state/QuestionType'
import { Course } from '../state/Course'
import './Modal.css'

function Modal() {

  const [showFirst, setShowFirst] = useState(true);
  const [hideSecond, setHideSecond] = useState(false);
  // TODO: Add "unspecified" option to course and don't allow closing the course modal
  // if unspecified is selected
  const { setQuestion, setCourse } = useGlobalState()

  /* The course-select selector can be changed to its own function/component if the sidebar version 
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
	      setQuestion(QuestionType.CONCEPT)
	    }} id="modalCloseButton" className="modal-close-button">I have a question about a concept</button>
	  <button onClick={() => {
	      setHideSecond(true)
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
