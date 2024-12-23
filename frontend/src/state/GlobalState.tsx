import { createContext, useContext, useState, ReactNode } from "react";
import { QuestionType } from "./QuestionType";
import { Course } from "./Course";

type GlobalState = {
  question: QuestionType;
  setQuestion: (value: QuestionType) => void;
  course: Course;
  setCourse: (value: Course) => void;
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
  const [question, setQuestion] = useState(QuestionType.UNSPECIFIED);
  const [course, setCourse] = useState(Course.UNSPECIFIED);

  return (
    <GlobalStateContext.Provider value={{ 
      question, 
      setQuestion,
      course,
      setCourse
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
