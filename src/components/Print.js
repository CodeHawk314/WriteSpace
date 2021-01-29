function Print({ settings, setSettings }) {
  const beforePrint = () => {
    if (window.aaa == null) {
      window.aaa = settings.showOutput;
      window.aaa === false && setSettings({ ...settings, showOutput: true });

      document.getElementsByClassName("typebox")[0]?.classList.add("hidePrint");

      document.getElementById(
        "textFieldCopy"
      ).innerHTML = settings.printRendered
        ? null
        : document
            .getElementById("textField")
            .innerHTML.replace(/\n/g, "<br />");

      !settings.showOutput &&
        document.getElementById("markdownOutput")?.classList.add("hide");

      document
        .getElementById("markdownOutput")
        ?.classList.add(settings.printRendered ? "showPrint" : "hidePrint");
    }
  };

  const afterPrint = () => {
    document
      .getElementsByClassName("typebox")[0]
      ?.classList.remove("hidePrint");

    document
      .getElementById("markdownOutput")
      ?.classList.remove("showPrint", "hidePrint", "hide");

    document.getElementById("textFieldCopy").innerHTML = null;

    window.aaa === false && setSettings({ ...settings, showOutput: false });
    delete window.aaa;
  };

  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia("print");
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        beforePrint();
      } else {
        afterPrint();
      }
    });
  }

  window.onbeforeprint = beforePrint;
  window.onafterprint = afterPrint;

  return null;
}

export default Print;
