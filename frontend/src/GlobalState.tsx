import { createContext, useContext, useState, ReactNode } from "react";
import { QuestionType, Course, DetailLevel } from "./Options";

type GlobalState = {
  question: QuestionType;
  setQuestion: (value: QuestionType) => void;
  course: Course;
  setCourse: (value: Course) => void;
  detailLevel: DetailLevel;
  setDetailLevel: (value: DetailLevel) => void;
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

  return (
    <GlobalStateContext.Provider value={{ 
      question, 
      setQuestion,
      course,
      setCourse,
      detailLevel,
      setDetailLevel,
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
