// Remember the visitor's theme across every page.
const themeRoot=document.documentElement;
let savedTheme='light';
try{const value=sessionStorage.getItem('jamil-visit-theme');if(value==='light'||value==='dark')savedTheme=value}catch{}
const themeToggle=document.createElement('button');
themeToggle.type='button';themeToggle.className='theme-toggle';
function applyTheme(theme){
 themeRoot.dataset.theme=theme;
 const dark=theme==='dark';
 themeToggle.textContent=dark?'☀ Light mode':'☾ Dark mode';
 themeToggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
 const meta=document.querySelector('meta[name="theme-color"]');
 if(meta)meta.content=dark?'#060e17':'#eef4f7';
}
applyTheme(savedTheme);
themeToggle.addEventListener('click',()=>{
 const theme=themeRoot.dataset.theme==='dark'?'light':'dark';
 applyTheme(theme);try{sessionStorage.setItem('jamil-visit-theme',theme)}catch{}
});
document.body.append(themeToggle);
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
function closeMenu(){if(nav)nav.classList.remove('open');if(menu){menu.setAttribute('aria-expanded','false');menu.querySelector('span').textContent='＋'}}
if(menu)menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.querySelector('span').textContent=open?'−':'＋'});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.05});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));document.body.classList.add('motion-ready')}else document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('[data-category]').forEach(tile=>{tile.hidden=value!=='all'&&tile.dataset.category!==value;if(!tile.hidden)tile.classList.add('visible')})}));
let queued=false;function progress(){const bar=document.querySelector('.progress');if(bar){const total=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${total>0?Math.min(1,scrollY/total):0})`}queued=false}addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(progress)}},{passive:true});addEventListener('resize',progress);progress();
document.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',e=>{const url=new URL(a.href);if(reduced||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download')||url.protocol!==location.protocol||url.host!==location.host||!url.pathname.endsWith('.html')||url.pathname===location.pathname)return;e.preventDefault();closeMenu();document.body.classList.add('leaving');setTimeout(()=>location.href=url.href,160)}));addEventListener('pageshow',()=>document.body.classList.remove('leaving'));


// Guided inquiry: clear email handoff and a manual-copy fallback.
const inquiryForm=document.querySelector('#project-inquiry');
if(inquiryForm){
 const status=document.querySelector('#inquiry-status');
 function inquiry(){const data=new FormData(inquiryForm);return `Website project inquiry\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness: ${data.get('business')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('details')}`;}
 inquiryForm.addEventListener('submit',event=>{event.preventDefault();if(!inquiryForm.reportValidity())return;const message=inquiry();status.textContent='Opening your email app. Review the message and press Send there. If it doesn’t open, use Copy inquiry and email Jamil directly.';location.href='mailto:tolentinojamil1@gmail.com?subject='+encodeURIComponent('Website Project Inquiry')+'&body='+encodeURIComponent(message);});
 document.querySelector('#copy-inquiry').addEventListener('click',async()=>{if(!inquiryForm.reportValidity())return;const message=inquiry();try{await navigator.clipboard.writeText(message);status.textContent='Inquiry copied. Paste it into an email to tolentinojamil1@gmail.com.';}catch{const fallback=document.querySelector('#inquiry-copy');fallback.hidden=false;fallback.value=message;fallback.focus();fallback.select();status.textContent='Select and copy the prepared inquiry below, then email it to tolentinojamil1@gmail.com.';}});
}
