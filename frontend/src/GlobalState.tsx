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
  addMessage: (value: Message) => void;
  chatLoaded: boolean;
  setChatLoaded: (value: boolean) => void;
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
  const [course, setCourse] = useState(Course.MATH203);
  const [detailLevel, setDetailLevel] = useState(DetailLevel.DETAILED);
  const [conversation, setMessages] = useState<Message[]>([]);
  const [chatLoaded, setChatLoaded] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message])
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
      addMessage,
      chatLoaded,
      setChatLoaded
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
