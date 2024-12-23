import { createContext, useContext, useState, ReactNode } from "react";
import { QuestionType } from "./QuestionType";

type GlobalState = {
  state: QuestionType;
  setState: (value: QuestionType) => void;
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
  const [state, setState] = useState(QuestionType.UNSPECIFIED);

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
