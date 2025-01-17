import { createContext, useContext, useState, ReactNode } from "react";
import { QuestionType, Course, DetailLevel } from "./types/options";
import { Message } from "./types/message";

type GlobalState = {
  question: QuestionType;
  setQuestion: (value: QuestionType) => void;
  course: Course;
  setCourse: (value: Course) => void;
  detailLevel: DetailLevel;
  setDetailLevel: (value: DetailLevel) => void;
  conversation: Message[];
  setConversation: (value: Message[]) => void;
  addMessage: (value: Message) => void;
  chatLoaded: boolean;
  setChatLoaded: (value: boolean) => void;
  save: boolean;
  setSave: (value: boolean) => void;
  sidebar: boolean;
  setSidebar: (value: boolean) => void;
  smallScreen: boolean;
  setSmallScreen: (value: boolean) => void;
};

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [question, setQuestion] = useState(QuestionType.CONCEPT);
  const [course, setCourse] = useState(Course.COMP335);
  const [detailLevel, setDetailLevel] = useState(DetailLevel.DETAILED);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [chatLoaded, setChatLoaded] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [smallScreen, setSmallScreen] = useState<boolean>(true);

  const addMessage = (message: Message) => {
    setConversation((prevMessages) => [...prevMessages, message])
  }

  return (
    <GlobalStateContext.Provider value={{ 
      question, 
      setQuestion,
      course,
      setCourse,
      detailLevel,
      setDetailLevel,
      conversation,
      setConversation,
      addMessage,
      chatLoaded,
      setChatLoaded,
      save,
      setSave,
      sidebar,
      setSidebar,
      smallScreen,
      setSmallScreen,
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
