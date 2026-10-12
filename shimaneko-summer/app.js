const places = {
  overview: {image:'overview', alt:'穏やかな海に浮かぶ、森と集落と港がある小さな島の全景', text:'森から港まで、島ぜんぶが遊び場。今日は、どこから歩こう。', label:'島全体'},
  harbour: {image:'harbour', alt:'赤い灯台と青や黄色の魚箱が並ぶ夏の漁港', text:'潮のにおいと、漁船の気配。港には気になるものがいっぱい。', label:'漁港'},
  lane: {image:'lane', alt:'石垣と瓦屋根の家が並ぶ、猫目線で見た島の路地', text:'石垣の上も、家と家のすきまも。猫ならではの寄り道を探そう。', label:'路地と集落'},
  shrine: {image:'shrine', alt:'緑に囲まれた神社の石段と夏空', text:'石段を登った先は、緑に囲まれた神社。木陰でちょっとひと休み。', label:'神社'},
  beach: {image:'beach', alt:'穏やかな海と緑の山に挟まれた、流木のある砂浜', text:'波が静かに寄せる、西の浜。水ぎわには、こわごわ近づいて。', label:'西の浜'}
};
const tabs = [...document.querySelectorAll('[data-place]')];
const panel = document.querySelector('#island-panel');
const islandImage = document.querySelector('#island-image');
const enlarge = document.querySelector('#island-enlarge');
function selectPlace(tab) {
  const place = places[tab.dataset.place];
  tabs.forEach(item => {const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1;});
  panel.setAttribute('aria-labelledby', tab.id);
  islandImage.src = `assets/${place.image}.webp`;
  islandImage.alt = place.alt;
  document.querySelector('#place-description').textContent = place.text;
  enlarge.dataset.lightbox = islandImage.getAttribute('src');
  enlarge.setAttribute('aria-label', `${place.label}のゲーム画面を拡大`);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectPlace(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowDown','ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length;
    if (['ArrowUp','ArrowLeft'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault(); tabs[next].focus(); selectPlace(tabs[next]);
  });
});
const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  dialogImage.src = button.dataset.lightbox;
  dialogImage.alt = button.querySelector('img').alt;
  dialog.showModal();
}));
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
const orientation = window.matchMedia('(max-width: 760px)');
const setOrientation = () => document.querySelector('[role="tablist"]').setAttribute('aria-orientation', orientation.matches ? 'horizontal' : 'vertical');
orientation.addEventListener('change', setOrientation); setOrientation();
