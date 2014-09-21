num_fotos = 50

AddEvent = (elem, event_name, cb) ->
  if elem.addEventListener
    elem.addEventListener event_name, cb, false
  else if elem.attachEvent
    elem.attachEvent "on#{event_name}", cb

liClick = () ->
  document.getElementById('modal_img').src=this.src.replace('_thumb','')
  document.getElementById('modal_div').style.display='block'

modalClick = () ->
  document.getElementById('modal_div').style.display='none'

modalClick()
AddEvent(document.getElementById('modal_div'),'click',modalClick)

menuIconClick = () ->
  obj = document.getElementById('sprite_menu')
  obj.className = (if obj.className!='visible' then 'visible' else '')

AddEvent(document.getElementById('menu_icon'),'click',menuIconClick)

###
window_resize = () ->
  g = document.getElementsByTagName('body')[0]
  x = window.innerWidth || document.documentElement.clientWidth || g.clientWidth
  y = window.innerHeight|| document.documentElement.clientHeight|| g.clientHeight
  document.getElementById('sprite_menu').style.display = 'block' if x > 157*2

AddEvent(window, 'resize', window_resize);
###

htm = '<ul>\n'
for x in [1..num_fotos] by 1
  htm += '  <li><img id="foto_'+x+'" src="../img/img_'+(if x<10 then '0' else '')+x+'_thumb.jpg"></li>\n'
htm += '</ul\n'
document.getElementById('gallery').innerHTML = htm

for el in document.querySelectorAll("#gallery > ul > li > img")
  AddEvent(el,'click',liClick)
