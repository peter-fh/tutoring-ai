import { Course, DetailLevel, QuestionType } from '../types/options'
import { useGlobalState } from '../GlobalState'
import './Sidebar.css'
import { useEffect } from 'react'

function NewConversationButton() {
  return (
        <button onClick={ () => {
          window.location.reload()
        }} className="interactive sidebar-button">
          <i className="fa-solid fa-plus"/>
        </button>
    )
}

function SaveButton() {
  const { setSave } = useGlobalState();
  return (
        <button onClick={ () => {
          setSave(true)
        }} className="interactive sidebar-button">
          <i className="fa-solid fa-download"/>
        </button>
    )
}

function SidebarButton() {
  const {
    sidebar,
    setSidebar,
    smallScreen,
  } = useGlobalState()
  return (
        <button onClick={ () => {
          if (sidebar) {
            setSidebar(false)
          } else if (!smallScreen) {
            setSidebar(true)
          }
        }} className="interactive sidebar-button">
      {sidebar ? 
          <i className="fa-solid fa-bars-staggered"></i>
          :
          <i className="fa-solid fa-bars"></i>
      }
        </button>
    )
}

function InvisibleButton() {
  return (
    <button className="invisible-button">
      <i className="fa-solid fa-download"/>
    </button>
  )
}
function Buttons() {
  const { sidebar } = useGlobalState();
  return (
    <>
      <div className="sidebar-buttons">
        { sidebar ? 
          <>
            <SidebarButton/>
            <SaveButton/>
            <NewConversationButton/> 
          </>
          : 
          <>
            <SidebarButton/>
            <InvisibleButton/>
            <InvisibleButton/>
          </>
        }
      </div>
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
  const { sidebar, setSidebar, smallScreen, setSmallScreen } = useGlobalState()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setSmallScreen(true); 
        setSidebar(false)
      } else {
        if (smallScreen) {
          setSidebar(true)
        }
        setSmallScreen(false)
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [smallScreen]);

  return (
    <>
      { (sidebar) ?
        <div className="sidebar">
          <Buttons/>
          <div className="options">
            <CourseSelect/>
            <QuestionTypeSelect/>
            <BrevitySelect/>
          </div>
          <Attribution/>
        </div>
        : 
        <div className="hidden-sidebar">
          <Buttons/>
        </div>
      }
    </>
  )
}

export default Sidebar
