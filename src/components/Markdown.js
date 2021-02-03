import React from "react";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import { BlockMath, InlineMath } from "react-katex";
import CodeBlock from "./CodeBlock";
import "katex/dist/katex.min.css";

const _mapProps = ({ settings, ...props }) => ({
  ...props,
  escapeHtml: false,
  plugins: [RemarkMathPlugin],
  renderers: {
    ...props.renderers,
    math: ({ value }) =>
      settings.katexBlock ? <BlockMath>{value}</BlockMath> : value,
    inlineMath: ({ value }) =>
      settings.katexInline ? <InlineMath>{value}</InlineMath> : value,
    code: ({ value }) => <CodeBlock language="js" value={value}></CodeBlock>,
  },
});

const Markdown = ({ settings, ...props }) => (
  <ReactMarkdown {..._mapProps({ settings, ...props })} />
);

export default Markdown;
