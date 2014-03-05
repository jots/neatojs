 
class SmartHeader
  constructor: (@el,opts={}) ->
    # how much to scroll down before unpin
    @offset = opts.offset ? 0

    default_classes =
      pinned: "smartheader-pinned"
      unpinned: "smartheader-unpinned"
    @classes = opts.classes ? default_classes

    @lastY = getScrollY()

    @height = @el.h()
    @showing = true
    # make the header fixed                                                        # so scrolling down will leave it stuck until offset hit
    @el.style.position = "fixed" 
    # create event handler
    window.addEventListener "scroll", @handlescroll, false
          
    return

  hide: =>
    @el.ar(@classes.unpinned,@classes.pinned)
    @showing = false

  show: =>
    @el.ar(@classes.pinned,@classes.unpinned)
    @showing = true

  handlescroll: =>
    return if isOutOfBounds() # if scrollY is weird...

    currY  = getScrollY()
    # scrolling up
    if currY < @lastY and not @showing
      @show()
    # scrolling down    
    else if @showing and currY > @lastY and currY >  @height + @offset
      @hide()

    @lastY = currY 
    return

    

hopts = 
  offset: 0,
  classes: 
    pinned:   "flipInX",
    unpinned: "flipOutX"
  
hr = new SmartHeader(g("header"),hopts)

