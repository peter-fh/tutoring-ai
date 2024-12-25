import React, { useMemo } from "react";
import DOMPurify from 'dompurify';
import { marked } from "marked";
import { MathJax } from "better-react-mathjax";

interface MarkTeXProps {
  content: string
}

const MathTeX: React.FC<MarkTeXProps> = ({content}) => {

  const parsedHTML = useMemo(() => {
    const doubleEscapedContent =content.replace(/\\/g, '\\\\')
    const parsedContent = marked.parse(doubleEscapedContent, { async: false })
    return DOMPurify.sanitize(parsedContent)

  }, [content]);

  return (
    <>
      <MathJax>
        <div dangerouslySetInnerHTML={{__html: parsedHTML}}/>
      </MathJax>
    </>
  )
}

export default MathTeX
