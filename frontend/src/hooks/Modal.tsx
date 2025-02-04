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
	  <p className="modal-text">
	      <h2>
		Disclaimer
	      </h2>

	      <p> 
This bot is designed to assist Concordia University students in understanding basic Calculus concepts, solving problems, and enhancing their learning experience. However, it is important to note that this bot should not be used in any way that leads to plagiarism in any form. Also, note this bot is not to replace lectures, classes, or group projects. 
	      </p>

	      <p> 
By using this tool, you agree to the following:
	      </p>

	      <ol>
		<li>
Independent Work: The bot is intended to help you understand concepts and guide your learning. It is not to replace your own effort or the completion of assignments. You are responsible for completing your academic work independently.
		</li>

		<li>
Academic Integrity: Plagiarism, including submitting work that is generated or assisted by AI tools as your own without proper understanding or citation, is a violation of academic integrity policies. Always adhere to your institution's code of conduct and your professor's guidelines as per how and to what extent Gen AI can be used in your studies for each particular course and honor the values of honesty and originality in your studies.
		</li>

		<li>
Accuracy: Also note that Gen AI can make mistakes. It is the student's responsibility to double check any answers they are given.
		</li>

		<li>
Guidance Only: The solutions and explanations provided by this tool are meant to serve as guidance. It is crucial to verify the results, understand the reasoning, and engage in your own learning process.
		</li>

</ol>
By continuing to use this tool, you acknowledge that you are using it ethically and responsibly to enhance your understanding of the material, while upholding academic honesty and integrity.

	    </p>
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
