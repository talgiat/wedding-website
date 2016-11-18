const eval_template = (src,ctx) =>  src.replace(/{(\w+)}/g, (_,k) => ctx[k] || "");
const get_template = id => document.getElementById(id).innerHTML.trim();

const zola_widget = (e,t,n) => {
  let s,a=e.getElementsByTagName(t)[0];
  e.getElementById(n)||(s=e.createElement(t),s.id=n,s.async=!0,s.src="https://widget.zola.com/js/widget.js",a.parentNode.insertBefore(s,a))
};

const handle_click = e => {
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
}

const invoke_ga = () => {
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
}

const set_body_class = is_mobile => {
  let body = document.querySelector('body');
  body.className = is_mobile ? 'mobile' : 'desktop';
}

const init = () => {
  if (window.location.hostname !== 'localhost') {
    invoke_ga();
  }
  let is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  //set_body_class(is_mobile);

  let container = document.getElementById('container');
  // let content_t =  get_template(is_mobile ? 'mobile-content-template' : 'content-template');
  let content_t =  get_template('content-template');
  ['rsvp', 'accommodation', 'transport', 'about', 'checklist', 'registry', 'schedule'].forEach((id) => {
    let template = get_template(id + '-template');
    let html = eval_template(content_t, {id: id, body: eval_template(template,{})});
    container.insertAdjacentHTML('beforeend', html);
  });
  if (!is_mobile) {
    zola_widget(document,"script","zola-wjs");
  }
}