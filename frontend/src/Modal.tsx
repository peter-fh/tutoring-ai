import { createContext, useState } from 'react'
import { useGlobalState } from './GlobalState'
import { QuestionType } from './QuestionType'
import './Modal.css'

function Modal() {

  const [showFirst, setShowFirst] = useState(true);
  const [hideSecond, setHideSecond] = useState(false);
  const { setState } = useGlobalState()

  const courseSelectModal = () => {
    return (
    <>

      <p>hello</p>
      <div id="CourseSelectModal" className="course-modal">
	<div className="course-modal-content">
	  <p>Select the course you are taking</p>
	  <select name="course-select" id="modal-course-select" className="select-box">
	    <option value="MATH 203">MATH 203</option>
	  </select>
	  <button onClick={() => {setShowFirst(false)}} id="modalCloseButton" className="modal-close-button">Done</button>

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
	      setState(QuestionType.CONCEPT)
	    }} id="modalCloseButton" className="modal-close-button">I have a question about a concept</button>
	  <button onClick={() => {
	      setHideSecond(true)
	      setState(QuestionType.PROBLEM)
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
