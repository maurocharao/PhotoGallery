pic_w = 157
pic_h = 113
pic_margin_real = 7
num_pics = 50
num_cols = 0
num_pages = 0
cur_page = 1
cur_modal_img = 1

# Photos HTML
htm = '<ul>\n'
for x in [1..num_pics] by 1
  htm += '  <li><img id="foto_'+x+'" src="../img/img_'+(if x<10 then '0' else '')+x+'_thumb.jpg"></li>\n'
htm += '</ul>\n'
document.getElementById('gallery').innerHTML = htm

# Pagination
PageScroll = () ->
  el = document.querySelector("#gallery > ul")
  el.scrollTop=2*(pic_h+pic_margin_real)*(cur_page-1)

PageClick = () ->
  for el in document.querySelectorAll("#pagination > li.active")
    el.className=''
  this.className='active'
  cur_page = parseInt(this.id.substring(5),10)
  GeneratePagination() if num_cols <= 2
  PageScroll()

PagePreviousClick = () ->
  cur_page = (if cur_page > 1 then cur_page-1 else num_pages)
  el = document.getElementById("page_#{cur_page}")
  if !el
    GeneratePagination()
    el = document.getElementById("page_#{cur_page}")
  el.click()

PageNextClick = () ->
  cur_page = (if cur_page < num_pages then cur_page+1 else 1)
  el = document.getElementById("page_#{cur_page}")
  if !el
    GeneratePagination()
    el = document.getElementById("page_#{cur_page}")
  el.click()

GeneratePagination = () ->
  if num_cols >= 3
    first = 1
    last = num_pages
  else
    if num_cols == 2
      first = cur_page-2
      last = cur_page+3
    else
      first = cur_page-1
      last = cur_page
    if last > num_pages
      diff = last-num_pages
      first -= diff
      last -= diff
    else if first < 1
      diff = 1-first
      first += diff
      last += diff
  htm = '<li id="previous_page" title="Use Navigation Keys">&laquo;</li>\n'
  for x in [first..last] by 1
    htm += '  <li id="page_'+x+(if x==cur_page then '" class="active">' else '">')+x+'</li>\n'
  htm += '<li id="next_page" title="Use Navigation Keys">&raquo;</li>\n'
  document.getElementById('pagination').innerHTML = htm
  for el in document.querySelectorAll("#pagination > li[id^='page_']")
    AddEvent(el,'click',PageClick)
  AddEvent(document.getElementById('previous_page'),'click',PagePreviousClick)
  AddEvent(document.getElementById('next_page'),'click',PageNextClick)
  PageScroll()

# Events
AddEvent = (elem, event_name, cb) ->
  if elem.addEventListener
    elem.addEventListener event_name, cb, false
  else if elem.attachEvent
    elem.attachEvent "on#{event_name}", cb

KeyDownEvent = (e) ->
  code = e.charCode || e.keyCode
  if document.getElementById('modal_div').style.display=='block'
    if code == 39
      ModalNextClick()
    else if code == 37
      ModalPreviousClick()
    else if code == 27
      ModalCloseClick()
  else if code == 39
    PageNextClick()
  else if code == 37
    PagePreviousClick()
  true

AddEvent(document,'keydown',KeyDownEvent)

ModalUpd = (id) ->
  cur_modal_img = id
  document.getElementById('modal_img').src='../img/img_'+(if cur_modal_img<10 then '0' else '')+cur_modal_img+'.jpg'
  document.getElementById('modal_title').innerHTML="Picture #{cur_modal_img} from #{num_pics}"

thumbClick = () ->
  document.getElementById('modal_div').style.display='block'
  ModalUpd parseInt(this.src.substring(this.src.indexOf('img_')+4,this.src.lastIndexOf('_')),10)

ModalCloseClick = () ->
  document.getElementById('modal_div').style.display='none'

AddEvent(document.getElementById('modal_close'),'click',ModalCloseClick)
AddEvent(document.getElementById('modal_img'),'click',ModalCloseClick)

ModalPreviousClick = () ->
  ModalUpd (if cur_modal_img > 1 then cur_modal_img-1 else num_pics)

AddEvent(document.getElementById('modal_previous'),'click',ModalPreviousClick)

ModalNextClick = () ->
  ModalUpd (if cur_modal_img < num_pics then cur_modal_img+1 else 1)

AddEvent(document.getElementById('modal_next'),'click',ModalNextClick)

MenuIconClick = () ->
  obj = document.getElementById('sprite_menu')
  obj.className = (if obj.className!='visible' then 'visible' else '')

AddEvent(document.getElementById('menu_icon'),'click',MenuIconClick)

for el in document.querySelectorAll("#gallery > ul > li > img")
  AddEvent(el,'click',thumbClick)

window_resize = () ->
  g = document.getElementsByTagName('body')[0]
  x = window.innerWidth || document.documentElement.clientWidth || g.clientWidth
  y = window.innerHeight|| document.documentElement.clientHeight|| g.clientHeight
  c = if x <= pic_w*2 then 1
  else if x <= pic_w*3 then 2
  else if x <= pic_w*4 then 3
  else if x <= pic_w*5 then 4
  else 5
  if c != num_cols
    num_cols = c
    num_pages = Math.ceil num_pics/(num_cols*2)
    cur_page = num_pages if cur_page > num_pages
    document.getElementById('pagination').style.width= (if x <= pic_w*3 then pic_w*num_cols else ((num_pages+2)*37))+'px'
    GeneratePagination()

AddEvent(window, 'resize', window_resize);

# events initial call
ModalCloseClick()
window_resize()
