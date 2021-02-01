import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import { IconButton } from "@material-ui/core";

import Markdown from "./Markdown";
import { renderToString } from "react-dom/server";

import Juice from "juice";

import htmlToPDFMake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import html2canvas from "html2canvas";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
}));

function Download({ writing, settings }) {
  const classes = useStyles();

  const download = (filename, text) => {
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    element.click();
  };

  const generatePDF = (markdownInput) => {
    var val = htmlToPDFMake(
      renderToString(<Markdown>{markdownInput}</Markdown>)
    );
    var dd = { content: val, pageSize: "LETTER", pageMargins: [72, 72] };
    console.log(dd);
    pdfMake.createPdf(dd).open(); // .download()
  };

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

  const downloadAsPng = (elem) => {
    html2canvas(elem, {
      useCORS: true,
      allowTaint: true,

      // Fix output image shifted right bug
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      let temp = document.createElement("a");
      temp.download = "download.png";
      temp.href = canvas.toDataURL();
      temp.click();
    });
  };

  const downloadPng = () => {
    let elem = document.getElementById("hiddenOutput");
    ReactDOM.render(<Markdown>{writing}</Markdown>, elem, () => {
      setTimeout(() => {
        downloadAsPng(elem);
        ReactDOM.render(null, elem);
      }, 300);
    });
  };

  const onDownloadButtonClick = () => {
    // generatePDF(writing);
    switch (settings.dlFormat) {
      case "txt":
        download("download.txt", writing);
        break;
      case "png":
        downloadPng();
        break;
      case "html":
        const htmlStyled = Juice.inlineContent(
          renderToString(<Markdown>{writing}</Markdown>),
          getDocCss()
        );
        download("download.html", "<!DOCTYPE html>" + htmlStyled);
        break;
      default:
        download("download.txt", writing);
    }
  };

  return (
    <>
      <IconButton onClick={onDownloadButtonClick} className={classes.button}>
        <GetAppIcon />
      </IconButton>
    </>
  );
}

export default Download;
