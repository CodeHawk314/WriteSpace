import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import { IconButton } from "@material-ui/core";

import Markdown from "./Markdown";
import { renderToString } from "react-dom/server";

import htmlToPDFMake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
}));

function Download({ writing }) {
  const classes = useStyles();

  const download = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generatePDF = (markdownInput) => {
    var val = htmlToPDFMake(
      renderToString(<Markdown>{markdownInput}</Markdown>)
    );
    var dd = { content: val, pageSize: "LETTER", pageMargins: [72, 72] };
    console.log(dd);
    pdfMake.createPdf(dd).open(); // .download()
  };

  const onDownloadButtonClick = () => {
    generatePDF(writing);
    // download("download.txt", writing);
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
