E = Element.prototype

# class manipulation
E.cl = -> @classList
E.hc = (c) -> @classList.contains(c)
E.ac = (c) -> @classList.add(c); @
E.rc = (c) -> @classList.remove(c); @
E.tc = (c) -> @classList.toggle(c); @
E.sc = (c) -> @className = c
E.toggle_one = (c1,c2) -> 
  if @hc(c1)
    @rc(c1); @ac(c2)
  else
    @rc(c2); @ac(c1)
  return @

# hide show
E.isHidden = -> @style.display is 'none'
E.isVisible = -> !@isHidden()

E.hide = ->
  if ! @isHidden()
    @_old_display = @style.display
    @style.display = 'none'
    return @
E.show = ->
  if @isHidden()
    value = 'block' || @_old_display || 'block'
    @style.display = value
  return @

E.toggle = ->
    if @isHidden() then @show() else @hide()  

  
 # hides all the sibling elements and shows this one
 #radio: ->
 #   @siblings().forEach('hide')
 #   @show()      

# dimensions setters and getters
E.dim = -> @getBoundingClientRect()
  
E.r = (v=null)  ->
 if v
    @style.right = v + "px"
    return @
  return @dim().right

E.l = (v=null)  ->
 if v
    @style.left = v + "px"
    return @
  return @dim().left
 
E.w = (v=null) -> 
    if v
      @style.width = v + "px"
      return @
    return @dim().width

E.h = (v=null) ->
    if v
     @style.width = v + "px"
     return @
    return @dim().height
  
E.fc = ->
    firstChild = @firstChild
    while firstChild != null and firstChild.nodeType != 1
      firstChild = firstChild.nextSibling;
    return firstChild;

E.gebcn = (n) -> @getElementsByClassName(n)

E.insertAfter = (newNode) -> insertAfter(@,newNode)

E.sameHeight = (source) ->
  sameHeight(source,@)

insertAfter = (referenceNode, newNode) ->
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    return newNode



# Gets the Y scroll position
# https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
getScrollY: ->
  (if (window.pageYOffset isnt `undefined`) then window.pageYOffset else (document.documentElement or document.body.parentNode or document.body).scrollTop)


# Gets the height of the viewport
# http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
getViewportHeight: ->
  window.innerHeight or document.documentElement.clientHeight or document.body.clientHeight

# gets document height, or viewport height if document too short
# http://james.padolsey.com/javascript/get-document-height-cross-browser/
getDocumentHeight: ->
  body = document.body
  documentElement = document.documentElement
  Math.max body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, body.clientHeight, documentElement.clientHeight

getSS = (ssname) ->
  for ss in document.styleSheets
    return ss if ss.title == ssname
  return null


# various helpers
Array::jmin = ->
  t = @[0]
  for e in @
    t = if e <  t then e else t
  t

Array::max = ->
  t = @[0]
  for e in @
    t = if e > t then e else t
  t
  
Array::uniq = ->
 seen = {}; res = [] 
 for e in @
   continue if seen[e]
   res.push(e)
   seen[e] = true
 res

Array::last = ->
  @[@.length - 1]

NodeList::last = ->
  @[@.length - 1]

HTMLCollection::last = ->
  @[@.length - 1]
  
  

commify = (n) ->
    parts=n.toString().split(".")
    ad = if parts[1] then ".#{parts[1]}" else "" 
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ad
    
fc = (el) ->
  firstChild = el.firstChild
  while firstChild != null and firstChild.nodeType != 1
    firstChild = firstChild.nextSibling;
  return firstChild;


sameHeight = (se,te) ->
  console.log "sameheight: ", se.offsetHeight
  # XXX why add 4?
  te.style.height = (se.offsetHeight + 0) + "px"
  return te
  
dim = (n) ->
  if n == window
    return [n.innerHeight,n.innerWidth] 
  return [n.offsetHeight,n.offsetWidth]

g  = (id) -> document.getElementById(id)
gc = (cn) -> document.getElementsByClassName(cn)
gcf = (cn) -> gc(cn)[0]
qs = (s) -> document.querySelector(s)

toggleClass = (e,c1,c2) ->
  cl = e.classList
  if cl.contains(c1)
     cl.remove(c1)
     cl.add(c2)
     return c2
   else
     cl.remove(c2)
     cl.add(c1)
     return c1 

   
addStyles = (css) ->
  d = document
  head = d.getElementsByTagName('head')[0]
  style = d.createElement('style')
  style.type = 'text/css'
  if style.styleSheet
    style.styleSheet.cssText = css
  else
    style.appendChild(d.createTextNode(css))
  head.appendChild(style)
  return null

makeWidths = ->
  css = ""
  for x in [1..500]
    css += ".w_#{x} {width: #{x}px} "
  addStyles(css)
  return null   
  
makeWidths()

    
randStr = (length=8) ->
  id = ""
  id += Math.random().toString(36).substr(2) while id.length < length
  id.substr 0, length

Array::rn = ->  this[Math.floor(Math.random()*this.length)]

rn = (n) ->  Math.floor((Math.random()*n));

String::trim = -> this.replace(/^\s+|\s+$/,"")

getScrollbarWidth = ->
  W = window.browserScrollbarWidth
  if W is `undefined`
    body = document.body
    div = document.createElement("div")

    div.innerHTML = '<div style="width: 50px; height: 50px; position: absolute; left: -100px; top: -100px; overflow: auto;"><div style="width: 1px; height: 100px;"></div></div>'
    div = div.firstChild
    body.appendChild div
    W = window.browserScrollbarWidth = div.offsetWidth - div.clientWidth
    body.removeChild div
  W
  

getClassNum = (e,str="sc_") ->
  r = new RegExp("#{str}([0-9]+)")
  [x,c] = e.className.match(r)
  parseInt(c) #+ 1

# for expando
getSS (title) ->
  for ss in document.styleSheets
    return ss if ss.title == title
  return null

blankCss = (title) ->
  d = document
  head = d.getElementsByTagName('head')[0]
  style = d.createElement('style')
  style.type = 'text/css'
  style.title = title
  head.appendChild(style)
  return getSS(title)

changeRule2 = (ss,n,css) ->
  ss.deleteRule(n)
  ss.insertRule(css,n)

CSSRULES = {}
changeRule = (ss,name,val="") ->
  n = CSSRULES[name]
  console.log "cssrules: ", CSSRULES
  console.log "RULE: ", n
  css = "#{name} { #{val}; }"
  if n?
    ss.deleteRule(n)
    ss.insertRule(css,n)
  else
    try
      console.log Object.keys(CSSRULES).length
      ss.insertRule(css,Object.keys(CSSRULES).length)
      CSSRULES[name] = Object.keys(CSSRULES).length
      console.log "SET: ", CSSRULES[name]
    catch error
      console.log error            


isArray = (o) -> Array.isArray(o)

ce = (t="div") -> document.createElement(t) 
# divclass... make a div with a class and data
dc = (c,d,m="") ->
  d = d.join("\n") if isArray(d)
  "<div #{m} class='#{c}'>\n#{d}\n</div>\n"
