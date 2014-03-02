var CSSRULES, E, addStyles, blankCss, body, ce, changeRule, changeRule2, commify, dc, dim, doc, doc_elem, fc, g, gc, gcf, getClassNum, getSS, getScrollY, getScrollbarWidth, insertAfter, isArray, isOutOfBounds, makeWidths, qs, randStr, rn, sameHeight, toggleClass;

E = Element.prototype;

E.cl = function() {
  return this.classList;
};

E.hc = function(c) {
  return this.classList.contains(c);
};

E.ac = function(c) {
  this.classList.add(c);
  return this;
};

E.rc = function(c) {
  this.classList.remove(c);
  return this;
};

E.tc = function(c) {
  this.classList.toggle(c);
  return this;
};

E.sc = function(c) {
  return this.className = c;
};

E.toggle_one = function(c1, c2) {
  if (this.hc(c1)) {
    this.rc(c1);
    this.ac(c2);
  } else {
    this.rc(c2);
    this.ac(c1);
  }
  return this;
};

E.isHidden = function() {
  return this.style.display === 'none';
};

E.isVisible = function() {
  return !this.isHidden();
};

E.hide = function() {
  if (!this.isHidden()) {
    this._old_display = this.style.display;
    this.style.display = 'none';
    return this;
  }
};

E.show = function() {
  var value;
  if (this.isHidden()) {
    value = 'block' || this._old_display || 'block';
    this.style.display = value;
  }
  return this;
};

E.toggle = function() {
  if (this.isHidden()) {
    return this.show();
  } else {
    return this.hide();
  }
};

E.dim = function() {
  return this.getBoundingClientRect();
};

E.r = function(v) {
  if (v == null) {
    v = null;
  }
  if (v) {
    this.style.right = v + "px";
    return this;
  }
  return this.dim().right;
};

E.l = function(v) {
  if (v == null) {
    v = null;
  }
  if (v) {
    this.style.left = v + "px";
    return this;
  }
  return this.dim().left;
};

E.w = function(v) {
  if (v == null) {
    v = null;
  }
  if (v) {
    this.style.width = v + "px";
    return this;
  }
  return this.dim().width;
};

E.h = function(v) {
  if (v == null) {
    v = null;
  }
  if (v) {
    this.style.width = v + "px";
    return this;
  }
  return this.dim().height;
};

E.fc = function() {
  var firstChild;
  firstChild = this.firstChild;
  while (firstChild !== null && firstChild.nodeType !== 1) {
    firstChild = firstChild.nextSibling;
  }
  return firstChild;
};

E.gebcn = function(n) {
  return this.getElementsByClassName(n);
};

E.insertAfter = function(newNode) {
  return insertAfter(this, newNode);
};

E.sameHeight = function(source) {
  return sameHeight(source, this);
};

insertAfter = function(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  return newNode;
};

({
  getScrollY: function() {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset;
    } else {
      return (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
  }
});

doc = document;

body = doc.body;

doc_elem = doc.documentElement;

getScrollY = function() {
  if (window.pageYOffset !== void 0) {
    return window.pageYOffset;
  }
  return (doc_elem || body.parentNode || body).scrollTop;
};

isOutOfBounds = function(y) {
  var pastBottom, pastTop, scrollY;
  if (y == null) {
    y = null;
  }
  scrollY = getScrollY();
  if (y === null) {
    y = scrollY;
  }
  pastTop = y < 0;
  pastBottom = scrollY + getViewportHeight() > getDocumentHeight();
  return pastTop || pastBottom;
};

({
  getViewportHeight: function() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  },
  getDocumentHeight: function() {
    var documentElement;
    body = document.body;
    documentElement = document.documentElement;
    return Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, body.clientHeight, documentElement.clientHeight);
  }
});

getSS = function(ssname) {
  var ss, _i, _len, _ref;
  _ref = document.styleSheets;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    ss = _ref[_i];
    if (ss.title === ssname) {
      return ss;
    }
  }
  return null;
};

Array.prototype.jmin = function() {
  var e, t, _i, _len;
  t = this[0];
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    e = this[_i];
    t = e < t ? e : t;
  }
  return t;
};

Array.prototype.max = function() {
  var e, t, _i, _len;
  t = this[0];
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    e = this[_i];
    t = e > t ? e : t;
  }
  return t;
};

Array.prototype.uniq = function() {
  var e, res, seen, _i, _len;
  seen = {};
  res = [];
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    e = this[_i];
    if (seen[e]) {
      continue;
    }
    res.push(e);
    seen[e] = true;
  }
  return res;
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

NodeList.prototype.last = function() {
  return this[this.length - 1];
};

HTMLCollection.prototype.last = function() {
  return this[this.length - 1];
};

commify = function(n) {
  var ad, parts;
  parts = n.toString().split(".");
  ad = parts[1] ? "." + parts[1] : "";
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ad;
};

fc = function(el) {
  var firstChild;
  firstChild = el.firstChild;
  while (firstChild !== null && firstChild.nodeType !== 1) {
    firstChild = firstChild.nextSibling;
  }
  return firstChild;
};

sameHeight = function(se, te) {
  console.log("sameheight: ", se.offsetHeight);
  te.style.height = (se.offsetHeight + 0) + "px";
  return te;
};

dim = function(n) {
  if (n === window) {
    return [n.innerHeight, n.innerWidth];
  }
  return [n.offsetHeight, n.offsetWidth];
};

g = function(id) {
  return document.getElementById(id);
};

gc = function(cn) {
  return document.getElementsByClassName(cn);
};

gcf = function(cn) {
  return gc(cn)[0];
};

qs = function(s) {
  return document.querySelector(s);
};

toggleClass = function(e, c1, c2) {
  var cl;
  cl = e.classList;
  if (cl.contains(c1)) {
    cl.remove(c1);
    cl.add(c2);
    return c2;
  } else {
    cl.remove(c2);
    cl.add(c1);
    return c1;
  }
};

addStyles = function(css) {
  var d, head, style;
  d = document;
  head = d.getElementsByTagName('head')[0];
  style = d.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(d.createTextNode(css));
  }
  head.appendChild(style);
  return null;
};

makeWidths = function() {
  var css, x, _i;
  css = "";
  for (x = _i = 1; _i <= 500; x = ++_i) {
    css += ".w_" + x + " {width: " + x + "px} ";
  }
  addStyles(css);
  return null;
};

makeWidths();

randStr = function(length) {
  var id;
  if (length == null) {
    length = 8;
  }
  id = "";
  while (id.length < length) {
    id += Math.random().toString(36).substr(2);
  }
  return id.substr(0, length);
};

Array.prototype.rn = function() {
  return this[Math.floor(Math.random() * this.length)];
};

rn = function(n) {
  return Math.floor(Math.random() * n);
};

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/, "");
};

getScrollbarWidth = function() {
  var W, div;
  W = window.browserScrollbarWidth;
  if (W === undefined) {
    body = document.body;
    div = document.createElement("div");
    div.innerHTML = '<div style="width: 50px; height: 50px; position: absolute; left: -100px; top: -100px; overflow: auto;"><div style="width: 1px; height: 100px;"></div></div>';
    div = div.firstChild;
    body.appendChild(div);
    W = window.browserScrollbarWidth = div.offsetWidth - div.clientWidth;
    body.removeChild(div);
  }
  return W;
};

getClassNum = function(e, str) {
  var c, r, x, _ref;
  if (str == null) {
    str = "sc_";
  }
  r = new RegExp("" + str + "([0-9]+)");
  _ref = e.className.match(r), x = _ref[0], c = _ref[1];
  return parseInt(c);
};

getSS(function(title) {
  var ss, _i, _len, _ref;
  _ref = document.styleSheets;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    ss = _ref[_i];
    if (ss.title === title) {
      return ss;
    }
  }
  return null;
});

blankCss = function(title) {
  var d, head, style;
  d = document;
  head = d.getElementsByTagName('head')[0];
  style = d.createElement('style');
  style.type = 'text/css';
  style.title = title;
  head.appendChild(style);
  return getSS(title);
};

changeRule2 = function(ss, n, css) {
  ss.deleteRule(n);
  return ss.insertRule(css, n);
};

CSSRULES = {};

changeRule = function(ss, name, val) {
  var css, error, n;
  if (val == null) {
    val = "";
  }
  n = CSSRULES[name];
  console.log("cssrules: ", CSSRULES);
  console.log("RULE: ", n);
  css = "" + name + " { " + val + "; }";
  if (n != null) {
    ss.deleteRule(n);
    return ss.insertRule(css, n);
  } else {
    try {
      console.log(Object.keys(CSSRULES).length);
      ss.insertRule(css, Object.keys(CSSRULES).length);
      CSSRULES[name] = Object.keys(CSSRULES).length;
      return console.log("SET: ", CSSRULES[name]);
    } catch (_error) {
      error = _error;
      return console.log(error);
    }
  }
};

isArray = function(o) {
  return Array.isArray(o);
};

ce = function(t) {
  if (t == null) {
    t = "div";
  }
  return document.createElement(t);
};

dc = function(c, d, m) {
  if (m == null) {
    m = "";
  }
  if (isArray(d)) {
    d = d.join("\n");
  }
  return "<div " + m + " class='" + c + "'>\n" + d + "\n</div>\n";
};
