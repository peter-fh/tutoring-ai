declare global {
  interface Window {
    MathJax?: {
      typeset?: (elements?: any) => void;
      typesetPromise?: (elements?: any) => Promise<void>;
    };
  }
}

export {};
