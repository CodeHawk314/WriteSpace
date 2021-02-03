import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      style={github}
      // showLineNumbers
      wrapLongLines
      customStyle={{
        lineHeight: "1.1",
        fontSize: ".9em",
      }}
      codeTagProps={{
        style: {
          lineHeight: "inherit",
          fontSize: "inherit",
        },
      }}
      children={value || ""}
    />
  );
};

export default CodeBlock;
