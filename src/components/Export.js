import ReactDOM from "react-dom";
import Markdown from "./Markdown";
import { renderToString } from "react-dom/server";
import Juice from "juice";
import html2canvas from "html2canvas";

const getDocCss = () => {
  let css = [];
  for (let sheeti = 0; sheeti < document.styleSheets.length; sheeti++) {
    let sheet = document.styleSheets[sheeti];
    let rules = null;
    try {
      rules = "cssRules" in sheet ? sheet.cssRules : sheet.rules;
    } catch {}
    if (rules) {
      for (let rulei = 0; rulei < rules.length; rulei++) {
        let rule = rules[rulei];
        if ("cssText" in rule) css.push(rule.cssText);
        else
          css.push(rule.selectorText + " {\n" + rule.style.cssText + "\n}\n");
      }
    }
  }
  return css.join("\n");
};

const exportPng = async (writing) => {
  return new Promise((resolve, reject) => {
    let elem = document.getElementById("hiddenOutput");
    ReactDOM.render(<Markdown>{writing}</Markdown>, elem, () => {
      setTimeout(() => {
        html2canvas(elem, {
          useCORS: true,
          allowTaint: true,

          // Fix output image shifted right bug
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight,
        }).then((canvas) => {
          resolve(canvas);
        });
        ReactDOM.render(null, elem);
      }, 300);
    });
  });
};

const getExported = async (format, writing) => {
  return new Promise((resolve, reject) => {
    switch (format) {
      case "txt":
        resolve(writing);
        break;
      case "png":
        resolve(exportPng(writing));
        break;
      case "html":
        resolve(
          Juice.inlineContent(
            renderToString(<Markdown>{writing}</Markdown>),
            getDocCss()
          )
        );
        break;
      default:
        resolve(writing);
    }
  });
};

export { getExported };