"use strict";

var eval_template = function eval_template(src, ctx) {
  return src.replace(/{(\w+)}/g, function (_, k) {
    return ctx[k] || "";
  });
};
var get_template = function get_template(id) {
  return document.getElementById(id).innerHTML.trim();
};

var zola_widget = function zola_widget(e, t, n) {
  var s = void 0,
      a = e.getElementsByTagName(t)[0];
  e.getElementById(n) || (s = e.createElement(t), s.id = n, s.async = !0, s.src = "https://widget.zola.com/js/widget.js", a.parentNode.insertBefore(s, a));
};

var handle_click = function handle_click(e) {
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

var invoke_ga = function invoke_ga() {
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

var set_body_class = function set_body_class(is_mobile) {
  var body = document.querySelector('body');
  body.className = is_mobile ? 'mobile' : 'desktop';
};

var init = function init() {
  if (window.location.hostname !== 'localhost') {
    invoke_ga();
  }
  var is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  //set_body_class(is_mobile);

  var container = document.getElementById('container');
  // let content_t =  get_template(is_mobile ? 'mobile-content-template' : 'content-template');
  var content_t = get_template('content-template');
  ['rsvp', 'accommodation', 'transport', 'about', 'checklist', 'registry', 'schedule'].forEach(function (id) {
    var template = get_template(id + '-template');
    var html = eval_template(content_t, { id: id, body: eval_template(template, {}) });
    container.insertAdjacentHTML('beforeend', html);
  });
  if (!is_mobile) {
    zola_widget(document, "script", "zola-wjs");
  }
};
//# sourceMappingURL=main.js.map
