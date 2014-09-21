var AddEvent, el, htm, liClick, menuIconClick, modalClick, num_fotos, x, _i, _j, _len, _ref;

num_fotos = 50;

AddEvent = function(elem, event_name, cb) {
  if (elem.addEventListener) {
    return elem.addEventListener(event_name, cb, false);
  } else if (elem.attachEvent) {
    return elem.attachEvent("on" + event_name, cb);
  }
};

liClick = function() {
  document.getElementById('modal_img').src = this.src.replace('_thumb', '');
  return document.getElementById('modal_div').style.display = 'block';
};

modalClick = function() {
  return document.getElementById('modal_div').style.display = 'none';
};

modalClick();

AddEvent(document.getElementById('modal_div'), 'click', modalClick);

menuIconClick = function() {
  var obj;
  obj = document.getElementById('sprite_menu');
  return obj.className = (obj.className !== 'visible' ? 'visible' : '');
};

AddEvent(document.getElementById('menu_icon'), 'click', menuIconClick);


/*
window_resize = () ->
  g = document.getElementsByTagName('body')[0]
  x = window.innerWidth || document.documentElement.clientWidth || g.clientWidth
  y = window.innerHeight|| document.documentElement.clientHeight|| g.clientHeight
  document.getElementById('sprite_menu').style.display = 'block' if x > 157*2

AddEvent(window, 'resize', window_resize);
 */

htm = '<ul>\n';

for (x = _i = 1; _i <= num_fotos; x = _i += 1) {
  htm += '  <li><img id="foto_' + x + '" src="../img/img_' + (x < 10 ? '0' : '') + x + '_thumb.jpg"></li>\n';
}

htm += '</ul\n';

document.getElementById('gallery').innerHTML = htm;

_ref = document.querySelectorAll("#gallery > ul > li > img");
for (_j = 0, _len = _ref.length; _j < _len; _j++) {
  el = _ref[_j];
  AddEvent(el, 'click', liClick);
}
