const $ = document.getElementById.bind(document);
const evalTemplate = (src,ctx) =>  src.replace(/{(\w+)}/g, (_,k) => ctx[k] || "");
const getTemplate = id => $(id).innerHTML.trim();

const zolaWidget = (e,t,n) => {
  let s,a=e.getElementsByTagName(t)[0];
  e.getElementById(n)||(s=e.createElement(t),s.id=n,s.async=!0,s.src="https://widget.zola.com/js/widget.js",a.parentNode.insertBefore(s,a))
};

const getHTMLForTemplate = (id,context) => {
  let template = getTemplate(id + '-template');
  return evalTemplate(template,context);
};

const reportPageview = e => {
  if (e.target.href) {
    let parts = e.target.href.split('#');
    if (parts.length > 1) {
      let page = parts[parts.length - 1];
      try {
        ga('send', 'pageview',page);
      } 
      catch(e) {} // fail silently (there is no other way to check if ga is not on)
    }
  }
};

const setMobileContentTo = template_id => {
  let content_mobile = document.querySelector('.content-mobile');
  let classes = 'content-mobile ' + (template_id == 'home' ? 'home' : 'info');
  content_mobile.className = classes;
  content_mobile.innerHTML = getHTMLForTemplate(template_id,{});
};

const menuEntryClick = e => {
  let id = e.target.innerHTML.trim().toLowerCase();
  let menu = $('container-mobile');
  menu.classList.remove('menu-open');
  setMobileContentTo(id);
  // if (id === 'registry') {
  //   zolaWidget(document, "script", "zola-wjs");
  // }
};

const toggleMenu = e => {
  let menu = $('container-mobile');
  menu.classList.toggle('menu-open');
};

const invokeGA = () => {
  (function(i,s,o,g,r,a,m){
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)
    },i[r].l=1*new Date();
    a=s.createElement(o),m=s.getElementsByTagName(o)[0];
    a.async=1;
    a.src=g;
    m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-87609155-1', 'auto');
  ga('send', 'pageview', '/');
};

const setBodyClass = is_mobile => {
  let body = document.querySelector('body');
  body.classList.add(is_mobile ? 'mobile' : 'desktop');
};

const init = () => {
  if (window.location.hostname !== 'localhost') {
    invokeGA();
  }
  let is_mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  setBodyClass(is_mobile);

  if (!is_mobile) {
    let container = $('container');
    let content_t =  getTemplate('content-template');
    ['rsvp', 'accommodation', 'transport', 'about', 'checklist', 'registry', 'schedule'].forEach(id => {
      let html = evalTemplate(content_t, {id: id, body: getHTMLForTemplate(id,{id: id})});
      container.insertAdjacentHTML('beforeend', html);
    });
    zolaWidget(document, "script", "zola-wjs");
  } else {
    setMobileContentTo('home');
  }
};