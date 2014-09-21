var AddEvent, GeneratePagination, KeyDownEvent, MenuIconClick, ModalCloseClick, ModalNextClick, ModalPreviousClick, ModalUpd, PageClick, PageNextClick, PagePreviousClick, PageScroll, cur_modal_img, cur_page, el, htm, num_cols, num_pages, num_pics, pic_h, pic_margin_real, pic_w, thumbClick, window_resize, x, _i, _j, _len, _ref;

pic_w = 157;

pic_h = 113;

pic_margin_real = 7;

num_pics = 50;

num_cols = 0;

num_pages = 0;

cur_page = 1;

cur_modal_img = 1;

htm = '<ul>\n';

for (x = _i = 1; _i <= num_pics; x = _i += 1) {
  htm += '  <li><img id="foto_' + x + '" src="../img/img_' + (x < 10 ? '0' : '') + x + '_thumb.jpg"></li>\n';
}

htm += '</ul>\n';

document.getElementById('gallery').innerHTML = htm;

PageScroll = function() {
  var el;
  el = document.querySelector("#gallery > ul");
  return el.scrollTop = 2 * (pic_h + pic_margin_real) * (cur_page - 1);
};

PageClick = function() {
  var el, _j, _len, _ref;
  _ref = document.querySelectorAll("#pagination > li.active");
  for (_j = 0, _len = _ref.length; _j < _len; _j++) {
    el = _ref[_j];
    el.className = '';
  }
  this.className = 'active';
  cur_page = parseInt(this.id.substring(5), 10);
  if (num_cols <= 2) {
    GeneratePagination();
  }
  return PageScroll();
};

PagePreviousClick = function() {
  var el;
  cur_page = (cur_page > 1 ? cur_page - 1 : num_pages);
  el = document.getElementById("page_" + cur_page);
  if (!el) {
    GeneratePagination();
    el = document.getElementById("page_" + cur_page);
  }
  return el.click();
};

PageNextClick = function() {
  var el;
  cur_page = (cur_page < num_pages ? cur_page + 1 : 1);
  el = document.getElementById("page_" + cur_page);
  if (!el) {
    GeneratePagination();
    el = document.getElementById("page_" + cur_page);
  }
  return el.click();
};

GeneratePagination = function() {
  var diff, el, first, last, _j, _k, _len, _ref;
  if (num_cols >= 3) {
    first = 1;
    last = num_pages;
  } else {
    if (num_cols === 2) {
      first = cur_page - 2;
      last = cur_page + 3;
    } else {
      first = cur_page - 1;
      last = cur_page;
    }
    if (last > num_pages) {
      diff = last - num_pages;
      first -= diff;
      last -= diff;
    } else if (first < 1) {
      diff = 1 - first;
      first += diff;
      last += diff;
    }
  }
  htm = '<li id="previous_page" title="Use Navigation Keys">&laquo;</li>\n';
  for (x = _j = first; _j <= last; x = _j += 1) {
    htm += '  <li id="page_' + x + (x === cur_page ? '" class="active">' : '">') + x + '</li>\n';
  }
  htm += '<li id="next_page" title="Use Navigation Keys">&raquo;</li>\n';
  document.getElementById('pagination').innerHTML = htm;
  _ref = document.querySelectorAll("#pagination > li[id^='page_']");
  for (_k = 0, _len = _ref.length; _k < _len; _k++) {
    el = _ref[_k];
    AddEvent(el, 'click', PageClick);
  }
  AddEvent(document.getElementById('previous_page'), 'click', PagePreviousClick);
  AddEvent(document.getElementById('next_page'), 'click', PageNextClick);
  return PageScroll();
};

AddEvent = function(elem, event_name, cb) {
  if (elem.addEventListener) {
    return elem.addEventListener(event_name, cb, false);
  } else if (elem.attachEvent) {
    return elem.attachEvent("on" + event_name, cb);
  }
};

KeyDownEvent = function(e) {
  var code;
  code = e.charCode || e.keyCode;
  if (document.getElementById('modal_div').style.display === 'block') {
    if (code === 39) {
      ModalNextClick();
    } else if (code === 37) {
      ModalPreviousClick();
    } else if (code === 27) {
      ModalCloseClick();
    }
  } else if (code === 39) {
    PageNextClick();
  } else if (code === 37) {
    PagePreviousClick();
  }
  return true;
};

AddEvent(document, 'keydown', KeyDownEvent);

ModalUpd = function(id) {
  cur_modal_img = id;
  document.getElementById('modal_img').src = '../img/img_' + (cur_modal_img < 10 ? '0' : '') + cur_modal_img + '.jpg';
  return document.getElementById('modal_title').innerHTML = "Picture " + cur_modal_img + " from " + num_pics;
};

thumbClick = function() {
  document.getElementById('modal_div').style.display = 'block';
  return ModalUpd(parseInt(this.src.substring(this.src.indexOf('img_') + 4, this.src.lastIndexOf('_')), 10));
};

ModalCloseClick = function() {
  return document.getElementById('modal_div').style.display = 'none';
};

AddEvent(document.getElementById('modal_close'), 'click', ModalCloseClick);

AddEvent(document.getElementById('modal_img'), 'click', ModalCloseClick);

ModalPreviousClick = function() {
  return ModalUpd((cur_modal_img > 1 ? cur_modal_img - 1 : num_pics));
};

AddEvent(document.getElementById('modal_previous'), 'click', ModalPreviousClick);

ModalNextClick = function() {
  return ModalUpd((cur_modal_img < num_pics ? cur_modal_img + 1 : 1));
};

AddEvent(document.getElementById('modal_next'), 'click', ModalNextClick);

MenuIconClick = function() {
  var obj;
  obj = document.getElementById('sprite_menu');
  return obj.className = (obj.className !== 'visible' ? 'visible' : '');
};

AddEvent(document.getElementById('menu_icon'), 'click', MenuIconClick);

_ref = document.querySelectorAll("#gallery > ul > li > img");
for (_j = 0, _len = _ref.length; _j < _len; _j++) {
  el = _ref[_j];
  AddEvent(el, 'click', thumbClick);
}

window_resize = function() {
  var c, g, y;
  g = document.getElementsByTagName('body')[0];
  x = window.innerWidth || document.documentElement.clientWidth || g.clientWidth;
  y = window.innerHeight || document.documentElement.clientHeight || g.clientHeight;
  c = x <= pic_w * 2 ? 1 : x <= pic_w * 3 ? 2 : x <= pic_w * 4 ? 3 : x <= pic_w * 5 ? 4 : 5;
  if (c !== num_cols) {
    num_cols = c;
    num_pages = Math.ceil(num_pics / (num_cols * 2));
    if (cur_page > num_pages) {
      cur_page = num_pages;
    }
    document.getElementById('pagination').style.width = (x <= pic_w * 3 ? pic_w * num_cols : (num_pages + 2) * 37) + 'px';
    return GeneratePagination();
  }
};

AddEvent(window, 'resize', window_resize);

ModalCloseClick();

window_resize();
