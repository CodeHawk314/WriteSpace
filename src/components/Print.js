function Print({ settings, setSettings }) {
  var beforePrint = function () {
    if (window.aaa == null) {
      window.aaa = settings.showOutput;
    }
    window.aaa === false && setSettings({ showOutput: true });
  };
  var afterPrint = function () {
    window.aaa === false && setSettings({ showOutput: false });
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
