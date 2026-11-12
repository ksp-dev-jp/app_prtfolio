const places = {
  island: {image:'place-island', alt:'穏やかな海に浮かぶ、森と集落と港がある小さな島を沖から見た全景', text:'森と集落と港がある、小さな島。まわりには、重なり合う島影。', label:'島を見渡す'},
  harbour: {image:'place-harbour', alt:'漁船が係留された朝の港の岸壁に立つ島の人たち', text:'渡船が着く、朝の港。岸壁には漁船と、島の人の姿。', label:'港と渡船'},
  lane: {image:'place-lane', alt:'石垣と石段が続く坂の集落と、瓦屋根の家々', text:'石段と石垣が続く、坂の集落。家と家のすきまも、猫の近道。', label:'路地と石垣'},
  shop: {image:'place-shop', alt:'お菓子やカップめん、缶詰が棚に並ぶ、よろず屋の店内', text:'お菓子にカップめん、缶詰。島の暮らしを支える、よろず屋の店内。', label:'よろず屋'},
  shrine: {image:'place-shrine', alt:'狛犬と石灯籠、瓦屋根の社殿がある神社の境内と、島の人たち', text:'森の中の、静かな境内。狛犬と社殿のそば、木陰ではセミの声。', label:'神社'},
  school: {image:'place-school', alt:'松林に囲まれた丘の上の、木造の校舎と校庭', text:'丘の上の木造校舎と校庭。夏休みのあいだは、ひっそり。', label:'島の学校'},
  paddies: {image:'place-paddies', alt:'海に面した斜面に、段々に並ぶ田んぼと畦道', text:'海に面した、段々の田んぼ。トンボやカエルを追いかけに。', label:'段々の田んぼ'},
  islet: {image:'place-islet', alt:'浅い海の先に浮かぶ、祠のある小さな島と、海中に続く砂州', text:'沖の小さな島へは、潮が引いたときだけ砂州がつながる。', label:'小島と砂州'},
  cave: {image:'place-cave', alt:'森の下の海岸に広がる岩場と、海へ開く洞窟', text:'岩場の先には、海へ開く洞窟。潮だまりにも、何かいそう。', label:'磯と洞窟'}
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
