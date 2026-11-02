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
 if(meta)meta.content=dark?'#211a24':'#f8f3ed';
}
applyTheme(savedTheme);
themeToggle.addEventListener('click',()=>{
 const theme=themeRoot.dataset.theme==='dark'?'light':'dark';
 applyTheme(theme);try{sessionStorage.setItem('jamil-visit-theme',theme)}catch{}
});
const themeHost=document.querySelector('.site-header');
(themeHost||document.body).append(themeToggle);
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
function closeMenu(){if(nav)nav.classList.remove('open');if(menu){menu.setAttribute('aria-expanded','false');menu.querySelector('span').textContent='＋'}}
if(menu)menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.querySelector('span').textContent=open?'−':'＋'});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.05});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));document.body.classList.add('motion-ready')}else document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('[data-category]').forEach(tile=>{tile.hidden=value!=='all'&&tile.dataset.category!==value;if(!tile.hidden)tile.classList.add('visible')})}));
let queued=false;function progress(){const bar=document.querySelector('.progress');if(bar){const total=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${total>0?Math.min(1,scrollY/total):0})`}queued=false}addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(progress)}},{passive:true});addEventListener('resize',progress);progress();
document.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',e=>{const url=new URL(a.href);if(reduced||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download')||url.protocol!==location.protocol||url.host!==location.host||!url.pathname.endsWith('.html')||url.pathname===location.pathname)return;e.preventDefault();closeMenu();document.body.classList.add('leaving');setTimeout(()=>location.href=url.href,160)}));addEventListener('pageshow',()=>document.body.classList.remove('leaving'));



/* Seasonal Christmas treatment: keep the normal site available by removing this block and christmas.css. */
(function(){
 const seasonalStyle=document.createElement('link');
 seasonalStyle.rel='stylesheet';seasonalStyle.href='christmas.css?v=2026';
 document.head.appendChild(seasonalStyle);
 const ribbon=document.createElement('div');ribbon.className='holiday-ribbon';
 ribbon.innerHTML='<span class="holiday-star" aria-hidden="true">✦</span><span>Happy Holidays from Jamil Tolentino · Wishing you a creative season!</span><span class="holiday-star" aria-hidden="true">✦</span>';
 const header=document.querySelector('.site-header');
 if(header)header.before(ribbon);else document.body.prepend(ribbon);
 const hero=document.querySelector('.welcome-copy');
 if(hero){const note=document.createElement('div');note.className='holiday-card';note.innerHTML='<span class="holly" aria-hidden="true">✦</span> Christmas Edition 2026 <span aria-hidden="true">✦</span>';hero.prepend(note)}
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const snow=document.createElement('div');snow.className='holiday-snow';snow.setAttribute('aria-hidden','true');
  for(let i=0;i<18;i++){const flake=document.createElement('span');flake.className='holiday-flake';flake.textContent='❄';flake.style.left=(i*37%101)+'%';flake.style.fontSize=(10+i%4*3)+'px';flake.style.animationDuration=(14+i%6*3)+'s';flake.style.animationDelay=(-i*2.3)+'s';snow.appendChild(flake)}
  document.body.appendChild(snow);
 }
})();
