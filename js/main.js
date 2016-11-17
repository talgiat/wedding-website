var get_template = id => Handlebars.compile(document.getElementById(id).innerHTML.trim());

var init = () => {
  is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (is_mobile) invoke_ga();

  var container = document.getElementById('container');
  var content_t =  get_template(is_mobile ? 'mobile-content-template' : 'content-template');
  ['rsvp', 'accommodation', 'transport', 'about', 'checklist', 'registry', 'schedule'].forEach((id) => {
    var template = get_template(id + '-template');
    var html = content_t({id: id, body: template({})});
    container.insertAdjacentHTML('beforeend',html);
  });
  zola_widget(document,"script","zola-wjs");
}

var zola_widget = (e,t,n) => {
  var s,a=e.getElementsByTagName(t)[0];
  e.getElementById(n)||(s=e.createElement(t),s.id=n,s.async=!0,s.src="https://widget.zola.com/js/widget.js",a.parentNode.insertBefore(s,a))
};

var invoke_ga = () => {
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
  ga('send', 'pageview');
}