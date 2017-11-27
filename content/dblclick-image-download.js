(function () {

  if (window.hasRun) return;

  window.hasRun = true;

  const illegal = /[%&{}<>*?/ $!"':\\;,^#|@]/g;

  /**
   * @function handleImage
   * @param  {Event} e Event
   */
  function handleImage(e) {
    if (e.target.tagName === 'IMG') {
      const url = e.target.src;
      const filenameArr = url.split('/').pop().split('.');
      const extension = filenameArr.pop().substr(0, 3);
      const withIllegal = `${filenameArr.join('.')}.${extension}`;
      const filename = withIllegal.replace(illegal, '-');
      browser.runtime.sendMessage({ url, filename });
    }
  }

  /**
   * @function grabImages
   * @param  {Object} message Message from onFocus
   */
  function grabImages() {
    document.addEventListener('dblclick', handleImage, false);
  }

  browser.runtime.onMessage.addListener(grabImages);

}());
