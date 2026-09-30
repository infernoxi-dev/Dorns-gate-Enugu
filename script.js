(function(){
  var $=function(s){return document.querySelector(s)};
  var header=$('header'), burger=$('#burger'), menu=$('#menu');
  function onScroll(){header.classList.toggle('solid',window.scrollY>40)}
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  function closeMenu(){menu.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded','false')}
  burger.addEventListener('click',function(){
    var o=menu.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);
    if(o)header.classList.add('solid');else onScroll();
  });
  menu.addEventListener('click',function(e){if(e.target.tagName==='A')closeMenu()});
  $('#yr').textContent=new Date().getFullYear();
 
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }else els.forEach(function(e){e.classList.add('in')});
 
  document.querySelectorAll('[data-room]').forEach(function(a){
    a.addEventListener('click',function(){$('#room').value=a.dataset.room});
  });
 
  var today=new Date().toISOString().split('T')[0];
  var din=$('#in'),dout=$('#out');
  din.min=dout.min=today;
  din.addEventListener('change',function(){dout.min=din.value||today;if(dout.value&&dout.value<=din.value)dout.value=''});
 
  $('#form').addEventListener('submit',function(e){
    e.preventDefault();
    var msg=$('#msg'),bad=[];
    ['#name','#in','#out'].forEach(function(s){var f=$(s);f.classList.remove('err');if(!f.value.trim()){f.classList.add('err');bad.push(f)}});
    if(!bad.length&&dout.value<=din.value){dout.classList.add('err');bad.push(dout)}
    msg.classList.add('show');
    if(bad.length){msg.textContent='Please fill in your name and choose a check-out date after your check-in date.';bad[0].focus();return}
    var n=Math.round((new Date(dout.value)-new Date(din.value))/864e5);
    msg.textContent='Thank you, '+$('#name').value.trim().split(' ')[0]+'. Your enquiry for a '+$('#room').value+' ('+n+(n===1?' night':' nights')+') is ready. Please call 0810 276 4842 to confirm availability.';
    e.target.reset();
  });
})();