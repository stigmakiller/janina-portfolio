const $=s=>document.querySelector(s),cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),R=(p,a,b)=>cl((p-a)/(b-a)),L=(a,b,t)=>a+(b-a)*t,E=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const gate=$('#gate');if(location.search.includes('nogate')||localStorage.lcs18)gate.classList.add('off');
$('#yes').onclick=()=>{localStorage.lcs18=1;gate.classList.add('off')};$('#no').onclick=()=>{gate.querySelector('p+h2+p').textContent='Come back when you are of legal drinking age.'};
const dive=$('#dive'),_x=0;
function frame(t){const W=innerWidth,H=innerHeight,r=dive.getBoundingClientRect(),p=cl(-r.top/(r.height-H));
 window.DIVE_P=p;
 $('#c1').style.opacity=R(p,.02,.06)*(1-R(p,.16,.22));$('#c2').style.opacity=R(p,.3,.34)*(1-R(p,.46,.5));$('#c3').style.opacity=R(p,.7,.74)*(1-R(p,.8,.83));
 const hz=R(p,.79,.845)*(1-R(p,.855,.9));$('#haze').style.opacity=hz;const rf=R(p,.845,.86);$('#roofs').style.opacity=rf;$('#roofs').style.transform=`scale(${L(1.18,1,E(rf))}) translateY(${L(6,0,rf)}vh)`;$('#rd').style.opacity=R(p,.92,.97);$('#rd').style.transform=`scale(${L(1.06,1,R(p,.92,1))})`;$('#c4').style.opacity=R(p,.9,.94);
 // hero parallax
 const y=scrollY;$('.huge').style.transform=`translateY(${y*.35}px)`;$('.roof').style.transform=`translateY(${y*.15}px)`;
 drawDust(t);requestAnimationFrame(frame)}
const cv=$('#dust'),cx=cv.getContext('2d');let P=[];function rs(){cv.width=innerWidth;cv.height=innerHeight;P=Array.from({length:110},()=>({x:Math.random(),y:Math.random(),z:Math.random(),v:Math.random()}))}rs();addEventListener('resize',rs);
function drawDust(t){cx.clearRect(0,0,cv.width,cv.height);for(const q of P){q.y-=.0002+q.z*.0005;q.x+=Math.sin(t/2000+q.v*9)*.0003;if(q.y<0)q.y=1;
 const a=.15+.5*q.z*(.6+.4*Math.sin(t/500+q.v*20));cx.fillStyle=`rgba(240,210,160,${a})`;cx.beginPath();cx.arc(q.x*cv.width,q.y*cv.height,.5+q.z*1.8,0,7);cx.fill()}}
requestAnimationFrame(frame);
