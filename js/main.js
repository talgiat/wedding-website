"use strict";

var $ = document.getElementById.bind(document);
var evalTemplate = function evalTemplate(src, ctx) {
  return src.replace(/{(\w+)}/g, function (_, k) {
    return ctx[k] || "";
  });
};
var getTemplate = function getTemplate(id) {
  return $(id).innerHTML.trim();
};

var zolaWidget = function zolaWidget(e, t, n) {
  var s = void 0,
      a = e.getElementsByTagName(t)[0];
  e.getElementById(n) || (s = e.createElement(t), s.id = n, s.async = !0, s.src = "https://widget.zola.com/js/widget.js", a.parentNode.insertBefore(s, a));
};

var getHTMLForTemplate = function getHTMLForTemplate(id, context) {
  var template = getTemplate(id + '-template');
  return evalTemplate(template, context);
};

var reportPageview = function reportPageview(e) {
  if (e.target.href) {
    var parts = e.target.href.split('#');
    if (parts.length > 1) {
      var page = parts[parts.length - 1];
      try {
        ga('send', 'pageview', page);
      } catch (e) {} // fail silently (there is no other way to check if ga is not on)
    }
  }
};

var setMobileContentTo = function setMobileContentTo(template_id) {
  var content_mobile = document.querySelector('.content-mobile');
  var classes = 'content-mobile ' + (template_id == 'home' ? 'home' : 'info');
  content_mobile.className = classes;
  content_mobile.innerHTML = getHTMLForTemplate(template_id, {});
};

var menuEntryClick = function menuEntryClick(e) {
  var id = e.target.innerHTML.trim().toLowerCase();
  var menu = $('container-mobile');
  menu.classList.remove('menu-open');
  setMobileContentTo(id);
  // if (id === 'registry') {
  //   zolaWidget(document, "script", "zola-wjs");
  // }
};

var toggleMenu = function toggleMenu(e) {
  var menu = $('container-mobile');
  menu.classList.toggle('menu-open');
};

var invokeGA = function invokeGA() {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-87609155-1', 'auto');
  ga('send', 'pageview', '/');
};

var setBodyClass = function setBodyClass(is_mobile) {
  var body = document.querySelector('body');
  body.classList.add(is_mobile ? 'mobile' : 'desktop');
};

var init = function init() {
  if (window.location.hostname !== 'localhost') {
    invokeGA();
  }
  var is_mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  setBodyClass(is_mobile);

  if (!is_mobile) {
    (function () {
      var container = $('container');
      var content_t = getTemplate('content-template');
      ['rsvp', 'accommodation', 'transport', 'about', 'checklist', 'registry', 'schedule'].forEach(function (id) {
        var html = evalTemplate(content_t, { id: id, body: getHTMLForTemplate(id, { id: id }) });
        container.insertAdjacentHTML('beforeend', html);
      });
      zolaWidget(document, "script", "zola-wjs");
    })();
  } else {
    setMobileContentTo('home');
  }
};
//# sourceMappingURL=main.js.map
