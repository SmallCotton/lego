const renderIframe = (url, width, height) => `
<div class="popup-main" style="width:${width}px;height:${height}px">
  <div class="popup-hide" onClick="_LEGO_UTILS_.popup.hide()" title="关闭"><i class="fas fa-times"></i></div>
  <iframe src="${url}" frameborder="0" style="width:100%;height:100%;border:none"></iframe>
</div>
`;
const renderHtml = (html, width, height) => `
<div class="popup-main" style="width:${width}px;height:${height}px">
<div class="popup-hide" onClick="_LEGO_UTILS_.popup.hide()" title="关闭"><i class="fas fa-times"></i></div>
  <div class="popup-box">${html}</div>
</div>
`;
const container = document.createElement('div');
container.className = 'popup-mask';

const cbs = {};

const updateHeight = evt => {
  const data = JSON.parse(evt.data);
  if (data.type === 'LEGO_POPUP_HEIGHT') {
    window.$('.popup-main').height(Math.min(650, data.height));
  }
};

const show = (src, width = 800, height = 500) => {
  if (!src) return alert('缺少必要参数');
  const isIframe = /^(http|\/)/.test(src);
  container.innerHTML = isIframe ? renderIframe(src, width, height) : renderHtml(src, width, height);
  document.body.appendChild(container);

  // 自适应高度
  window.addEventListener('message', updateHeight);

  return {
    then: onHide => (cbs.onHide = onHide),
  };
};

const hide = execOnHide => {
  // execOnHide 是否执行关闭回调，点x不执行
  document.body.removeChild(container);
  window.removeEventListener('message', updateHeight);
  if (execOnHide && typeof cbs.onHide === 'function') {
    cbs.onHide();
    delete cbs.onHide;
  }
};

export default { show, hide };
