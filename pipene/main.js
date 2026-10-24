const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.r,.zoom').forEach(el=>io.observe(el));
const hero=document.querySelector('.hero-img'),season=document.querySelector('.season'),track=document.querySelector('.season-track');
function tick(){const y=scrollY;if(y<innerHeight*1.2)hero.style.transform=`translateY(${y*.25}px)`;
 if(innerWidth>900){const r=season.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));track.style.transform=`translateX(${-p*(track.scrollWidth-innerWidth*.6)}px)`}
 requestAnimationFrame(tick)}tick();
document.querySelectorAll('.filters button,.slots button').forEach(b=>b.onclick=()=>{b.parentNode.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on')});
let n=0;document.querySelectorAll('.add').forEach(b=>b.onclick=()=>{document.querySelector('.cart').textContent=`Basket (${++n})`});
