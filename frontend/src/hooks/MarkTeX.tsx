import React, { useEffect, useMemo } from "react";
//import DOMPurify from 'dompurify';
import { marked } from "marked";

interface MarkTeXProps {
  content: string
}

const CustomLatex: React.FC<MarkTeXProps> = ({content}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.MathJax?.typeset) {
      window.MathJax.typeset([containerRef.current])
    }
  }, [content])
  return (
    <div ref={containerRef}>
      {content}
    </div>
  )
}

const MathTeX: React.FC<MarkTeXProps> = ({content}) => {

  const parsedHTML = useMemo(() => {
    const doubleEscapedContent =content.replace(/\\/g, '\\\\')
    const parsedContent = marked.parse(doubleEscapedContent, { async: false })
    return parsedContent

  }, [content]);

  return (
    <>
      <CustomLatex content={parsedHTML}/>
    </>
  )
}

export default MathTeX
