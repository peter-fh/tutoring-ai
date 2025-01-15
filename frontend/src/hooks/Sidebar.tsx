import { Course, DetailLevel, QuestionType } from '../types/options'
import { useGlobalState } from '../GlobalState'
import './Sidebar.css'
import { useEffect } from 'react'

function NewConversationButton() {
  return (
      <button
          title="New Chat"
          className="interactive sidebar-button"
          onClick={() => {
              window.location.reload();
          }}
      >
          {/* <i className="fa-solid fa-plus" /> */}
          <i className="fa-solid fa-pen-to-square" />
      </button>
  );
}

function SaveButton() {
  const { setSave } = useGlobalState();
  return (
        <button 
          title="Save Chat as PNG"
          className="interactive sidebar-button"
          onClick={ () => {
            setSave(true)
          }}
        >
          <i className="fa-solid fa-download"/>
        </button>
    )
}

function SidebarButton() {
  const {
    sidebar,
    setSidebar,
  } = useGlobalState()
  return (
    <button
      title='Toggle Sidebar'
      className="interactive sidebar-button"
      onClick={ () => setSidebar(!sidebar) }
    >
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
          </> :
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
      <h3 className="sidebar-input-header">Course</h3>

      <select
        className="interactive select-box"
        onChange={onChange}
        value={course}
      >
        {Object.values(Course).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function QuestionTypeSelect() {
  const { question, setQuestion } = useGlobalState()

  return (
      <div className="option">
          <h3 className="sidebar-input-header">Question Type</h3>

          <span>
              {Object.values(QuestionType).map((option, index) => (
                  <>
                      <button
                          key={option}
                          onClick={() => setQuestion(option)}
                          className={`select-box-option ${
                              question === option ? "active" : ""
                          }`}
                      >
                          {option}
                      </button>
                      {index < Object.values(QuestionType).length - 1
                          ? "|"
                          : ""}
                  </>
              ))}
          </span>
      </div>
  );
}

function BrevitySelect() {
  const { detailLevel, setDetailLevel} = useGlobalState()

  return (
    <div className="option">
      <h3 className='sidebar-input-header'>Level of Detail</h3>

        <span>
          {Object.values(DetailLevel).map((option, index) => (
            <>
              <button
                key={option}
                onClick={() => setDetailLevel(option)}
                className={`select-box-option ${
                    detailLevel === option ? "active" : ""
                }`}
              >
                {option}
              </button>
              {index < Object.values(DetailLevel).length - 1 ? "|" : ""}
            </>
          ))}
        </span>
    </div>
  );
}

function Attribution() {
  return (
    <a 
      className="attribution" 
      href="https://www.flaticon.com/free-icons/robot" 
      target='_blank'
      title="robot icons">
        &copy; Robot icons created by Fajriah Robiatul Adawiah - Flaticon
    </a>
  )
}

function Sidebar() {
  const { sidebar, setSidebar, smallScreen, setSmallScreen } = useGlobalState()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
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
