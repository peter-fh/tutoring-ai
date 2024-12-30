declare global {
  interface Window {
    MathJax?: {
      typeset?: (elements?: any) => void;
    };
  }
}

export {};
