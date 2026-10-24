const P=[
['eng-w','Emerald-cut solitaire, white','engagement','diamond','white','img/ring_white.jpg','Emerald-cut solitaire on a pavé band. Choose a natural or lab-grown diamond.'],
['eng-y','Emerald-cut solitaire, yellow','engagement','diamond','yellow','img/ring_yellow.jpg','The same solitaire in a yellow tone. Natural or lab-grown diamond, your call.'],
['eng-r','Emerald-cut solitaire, rose','engagement','diamond','rose','img/ring_rose.jpg','The same solitaire in a rose tone, for people who blush easily.'],
['band','Wedding band','wedding','','white','img/band_felt.jpg','A slim wedding band. Ask about pairs, widths and engraving.'],
['r11','Red-stone halo ring','ring','colour','white','img/3265_ring11.jpg','A deep red centre stone in a starburst halo.','cut/3265_ring11.webp'],
['r4317','Opal-look cluster ring','ring','colour','yellow','img/3436_IMG_4317.jpg','A milky centre stone in a blue and orange petal halo.','cut/3436_IMG_4317.webp'],
['r4339','Violet solitaire ring','ring','colour','white','img/3666_IMG_4339.jpg','A violet oval stone flanked by baguettes.'],
['r9','Snake ring','ring','clear','yellow','img/3935_ring9.jpg','A coiled snake set with clear stones. Wraps your finger, not your wallet (price on request).','cut/3935_ring9.webp'],
['r4316','Snake ring, wide coil','ring','clear','yellow','img/3939_IMG_4316.jpg','The snake again, with more coils.'],
['r4345','Purple half-eternity ring','ring','colour','rose','img/3938_IMG_4345.jpg','A row of purple stones between clear accents.'],
['r4320','Green-stone signet ring','ring','colour','yellow','img/6234_IMG_4320.jpg','A large green stone in an engraved dome.','cut/6234_IMG_4320.webp'],
['r4319','Green-stone flower ring','ring','colour','yellow','img/6239_IMG_4319.jpg','A green centre stone in a clear halo.'],
['r4','Blue-stone cathedral ring','ring','colour','white','img/6239_ring4.jpg','A square blue stone on a pavé shoulder.','cut/6239_ring4.webp'],
['r72','Pink-stone flower ring','ring','colour','yellow','img/6336_7_2.jpg','A pink cabochon in green petals.'],
['r4347','Pink halo ring','ring','colour','white','img/6534_IMG_4347_1.jpg','A pink oval in a classic halo.','cut/6534_IMG_4347_1.webp'],
['e13','Bow drop earrings','earrings','colour','white','img/3736_earring13.jpg','Bow-shaped drops with a touch of colour.'],
['e9','Pink pear drops','earrings','colour','white','img/3864_earring9.jpg','Pale pink pear stones on hooks.'],
['eheart','Pink heart earrings','earrings','colour','white','img/3936_heart_earrings.jpg','Pink hearts, worn on the ears, not the sleeve.','cut/3936_heart_earrings.webp'],
['e11','Flower cascade earrings','earrings','colour','yellow','img/3964_earring11.jpg','A cascade of colourful marquise and drop stones.','cut/3964_earring11.webp'],
['e5','Colour line earrings','earrings','colour','rose','img/6135_earring5.jpg','Long lines of colourful stones.'],
['e10','Green line earrings','earrings','colour','rose','img/6266_earring10.jpg','Long green lines with a dark drop.'],
['e12','Petal drop earrings','earrings','colour','yellow','img/6536_earring12.jpg','Green petals, a blue middle and a violet drop.','cut/6536_earring12.webp'],
['e4349','Red heart earrings','earrings','colour','rose','img/6537_IMG_4349.jpg','Red hearts with a clear halo. Subtle? No.','cut/6537_IMG_4349.webp'],
['neck','Pear pendant','necklace','colour','white','img/3739_necklace.jpg','A violet pear stone on a fine chain.','cut/3739_necklace.webp'],
].map(a=>({id:a[0],name:a[1],type:a[2],stone:a[3],metal:a[4],img:a[5],desc:a[6],cut:a[7]}));
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const TL={engagement:'Engagement ring',ring:'Ring',wedding:'Wedding band',earrings:'Earrings',necklace:'Pendant'};
const SL={diamond:'Diamond, natural or lab-grown',colour:'Coloured gemstones',clear:'Clear stones','':'Ask us'};
const ML={yellow:'Yellow tone',white:'White tone',rose:'Rose tone'};
// marquee
const mq='Raiņa bulvāris 31–6 · 30+ years · Made in Riga · Mon–Sat 12–18';
$('#mq').innerHTML=Array(8).fill(`<span>${mq}</span>`).join('');
// floaters
const FL=[];const _FL=[['r4320',15,8,250,.9],['e4349',72,6,220,.5],['neck',30,16,150,.7],['r9',80,50,240,1.1],['e11',44,4,160,.35],['r4',60,58,230,.8],['eheart',57,12,140,.6],['r11',88,22,200,.45]];
const fw=$('#floaters');
FL.forEach(([id,x,y,w,d])=>{const p=P.find(q=>q.id==id);const el=document.createElement('button');el.className='fl'+(y>40?' low':'');el.dataset.id=id;el.dataset.d=d;el.style.cssText=`left:${x}%;top:${y}%;width:calc(${w}px * var(--s));z-index:${d>.7?4:2}`;el.innerHTML=`<img src="${p.cut}" alt="${p.name}" style="animation-delay:-${(d*7).toFixed(1)}s"><span class="tag">${p.name} →</span>`;el.onclick=()=>openProd(id);fw.appendChild(el)});
let mx=0,my=0,cx=0,cy=0;
addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;const c=$('#cursor');c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';c.classList.toggle('big',!!e.target.closest('.fl,.pc,.qopt,.m,.btn'))});
function loop(){cx+=(mx-cx)*.07;cy+=(my-cy)*.07;const sy=scrollY;
 $$('.fl').forEach(el=>{const d=+el.dataset.d;el.style.transform=`translate3d(${cx*-120*d}px,${cy*-90*d-sy*d*.5}px,0) rotate(${cx*14*d}deg)`});
 $('.kote')&&($('.kote').style.transform=`translate3d(${cx*30}px,${cy*20-sy*.35}px,0)`);
 // stack tilt
 $$('.card').forEach((c,i,a)=>{const n=a[i+1];if(!n){c.style.transform='';return}const r=n.getBoundingClientRect(),t=c.getBoundingClientRect();const k=Math.max(0,Math.min(1,1-(r.top-t.top)/440));c.style.transform=`scale(${1-k*.06}) rotate(${(i%2?1:-1)*k*3}deg)`;c.style.filter=`brightness(${1-k*.25})`});
 // horizontal moments
 const ms=$('#moments'),tr=$('#mtrack'),b=ms.getBoundingClientRect();const prog=Math.max(0,Math.min(1,(150-b.top)/b.height));tr.style.transform=`translateX(${-prog*(tr.scrollWidth-innerWidth+80)}px)`;
 requestAnimationFrame(loop)}loop();
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.15});
$$('.pc,.qbox,.bespoke,.visit>*,.mhead,.shophead').forEach(e=>{e.dataset.reveal='';io.observe(e)});
// shop
const F={type:'all',stone:'all',metal:'all'};
$('#grid').innerHTML=P.map(p=>`<article class="pc" data-id="${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"><h4>${p.name}</h4><p>${TL[p.type]} · ${ML[p.metal]}</p><div class="por">Price on request</div></article>`).join('')+'<p class="empty" hidden>Nothing matches. Try the bespoke route below.</p>';
$$('.pc').forEach(c=>{c.onclick=()=>openProd(c.dataset.id);io.observe(c)});
$$('#filters button').forEach(b=>b.onclick=()=>{F[b.dataset.f]=b.dataset.v;$$(`#filters [data-f=${b.dataset.f}]`).forEach(x=>x.classList.toggle('on',x==b));filter()});
function filter(){let n=0;P.forEach(p=>{const ok=(F.type=='all'||p.type==F.type)&&(F.stone=='all'||p.stone==F.stone)&&(F.metal=='all'||p.metal==F.metal);document.querySelector(`.pc[data-id=${p.id}]`).classList.toggle('hide',!ok);n+=ok});$('.empty').hidden=!!n}
// modals
const scrim=$('#scrim');function open(id){$('#'+id).classList.add('on')}function closeAll(){$$('.modal,.drawer').forEach(m=>m.classList.remove('on'));scrim.classList.remove('on')}
$$('[data-close]').forEach(b=>b.onclick=closeAll);scrim.onclick=closeAll;$$('.modal').forEach(m=>m.onclick=e=>{if(e.target==m)closeAll()});addEventListener('keydown',e=>e.key=='Escape'&&closeAll());
$$('[data-open=book]').forEach(b=>b.onclick=()=>{closeAll();open('book')});
function openProd(id){const p=P.find(q=>q.id==id);$('#pbody').innerHTML=`<div class="pp"><div class="pimg"><img src="${p.img}" alt="${p.name}"></div><div><p class="mono">${TL[p.type]}</p><h3>${p.name}</h3><p class="por">Price on request</p><p>${p.desc}</p><ul><li><span>Tone</span><b>${ML[p.metal]}</b></li><li><span>Stone</span><b>${SL[p.stone]}</b></li><li><span>Availability</span><b>Ask about availability</b></li><li><span>Made by</span><b>KOTE, Riga</b></li></ul><div class="acts"><button class="btn" id="addBtn">Add to bag</button><button class="btn ghost" data-open="book" id="askBtn">Ask in a free consultation</button></div></div></div>`;
 $('#addBtn').onclick=()=>add(p.id);$('#askBtn').onclick=()=>{closeAll();open('book')};open('pmodal')}
// bag
let bag=[];function add(id){bag.push(id);const s=$('#stamp');s.classList.remove('go');void s.offsetWidth;s.classList.add('go');setTimeout(()=>{renderBag();const b=$('#bagBtn');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')},900);setTimeout(()=>{closeAll();openBag()},1250)}
function renderBag(){$('#bagCount').textContent=bag.length;$('#bagList').innerHTML=bag.length?bag.map((id,i)=>{const p=P.find(q=>q.id==id);return`<div class="bi"><img src="${p.img}" alt=""><div><b>${p.name}</b><small>Price on request · ask about availability</small></div><button class="x rm" data-i="${i}" aria-label="Remove">×</button></div>`}).join(''):'<p>Your bag is empty. Bold of you.</p>';$$('.rm').forEach(b=>b.onclick=()=>{bag.splice(+b.dataset.i,1);renderBag()});$('#toCheckout').disabled=!bag.length}
function openBag(){renderBag();$('#drawer').classList.add('on');scrim.classList.add('on')}$('#bagBtn').onclick=openBag;
$('#toCheckout').onclick=()=>{if(!bag.length)return;closeAll();$('#coItems').innerHTML=bag.map(id=>`<div>${P.find(q=>q.id==id).name} · price on request</div>`).join('');$('#coForm').hidden=false;$('#coDone').hidden=true;open('checkout')};
$('#coForm').onsubmit=e=>{e.preventDefault();e.target.hidden=true;$('#coDone').hidden=false;bag=[];renderBag()};
// booking
const d=$('#bkDate');let slot='';const nx=new Date();nx.setDate(nx.getDate()+1);if(nx.getDay()==0)nx.setDate(nx.getDate()+1);d.min=new Date().toISOString().slice(0,10);d.value=nx.toISOString().slice(0,10);
function slots(){const dd=new Date(d.value);const el=$('#slots');if(dd.getDay()==0){el.innerHTML='<p class="mono">Closed on Sundays. Even jewellers rest.</p>';slot='';return}el.innerHTML=['12:00','13:00','14:00','15:00','16:00','17:00'].map(t=>`<button type="button">${t}</button>`).join('');$$('#slots button').forEach(b=>b.onclick=()=>{slot=b.textContent;$$('#slots button').forEach(x=>x.classList.toggle('on',x==b))})}d.onchange=slots;slots();
$('#bkForm').onsubmit=e=>{e.preventDefault();if(!slot){alertSlot();return}e.target.hidden=true;$('#bkDone').hidden=false;$('#bkMsg').textContent=`${d.value} at ${slot}, Raiņa bulvāris 31–6. Confirmation would come in writing (concept).`};
function alertSlot(){$('#slots').animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300})}
// quiz
const Q=[
 {k:'eng',t:'The one-knee type',s:'Engagement rings',img:'img/ring_white.jpg',h:'The Proposal',p:'You plan the speech three times and forget it anyway. Your KOTE: an emerald-cut solitaire with a natural or lab-grown diamond. Pick the tone:',tones:1},
 {k:'wed',t:'The forever-after type',s:'Wedding bands',img:'img/client_bands.jpg',h:'The Pair',p:'Two bands, one box, zero cold feet. Your KOTE: wedding bands, made to match.'},
 {k:'col',t:'The colour lover',s:'Coloured gemstones',img:'img/6239_ring4.jpg',h:'The Colourist',p:'Beige is not your colour. Your KOTE: a ring or earrings with coloured gemstones.'},
 {k:'ear',t:'The statement maker',s:'Earrings',img:'img/3964_earring11.jpg',h:'The Show-off',p:'People notice you before you speak. Your KOTE: drop earrings that move when you laugh.'},
 {k:'chain',t:'The everyday wearer',s:'Chains & pendants',img:'img/chain.jpg',h:'The Daily',p:'You never take it off, and that’s the point. Your KOTE: a chain or a pendant.'},
 {k:'bes',t:'The one-of-a-kind',s:'Bespoke',img:'img/atelier_hands.jpg',h:'The Original',p:'Nothing in a shop is quite you. Your KOTE: a bespoke piece, designed from scratch at the bench.'},
 {k:'love',t:'The romantic',s:'Hearts & gifts',img:'img/6537_IMG_4349.jpg',h:'The Romantic',p:'You write cards. Long ones. Your KOTE: heart earrings, in the graphite KOTE box with the gold-foil logo.'},
 {k:'snake',t:'The rule-breaker',s:'Statement rings',img:'img/3935_ring9.jpg',h:'The Charmer',p:'Rules are suggestions. Your KOTE: the coiled snake ring.'}];
const TONE={yellow:'img/ring_yellow.jpg',white:'img/ring_white.jpg',rose:'img/ring_rose.jpg'};
function quiz(){$('#qbody').innerHTML=`<p class="qq">Pick the one that sounds like you (or them).</p><div class="qopts">${Q.map(q=>`<button class="qopt" data-k="${q.k}"><img src="${q.img}" alt=""><b>${q.t}</b><small>${q.s}</small></button>`).join('')}</div>`;$$('.qopt').forEach(b=>{b.onclick=()=>res(b.dataset.k);io.observe(b)})}
function res(k){const q=Q.find(x=>x.k==k);$('#qbody').innerHTML=`<div class="qres"><div class="ph"><img id="qimg" src="${q.img}" alt="${q.s}"></div><div><p class="mono">You are…</p><h3>${q.h}</h3><p>${q.p}</p>${q.tones?`<div class="tones">${['yellow','white','rose'].map(t=>`<button data-t="${t}" class="${t=='white'?'on':''}">${ML[t]}</button>`).join('')}</div>`:''}<button class="btn" data-open="book" id="qBook">Book a free consultation</button><button class="qback" id="qAgain">Try again</button></div></div>`;
 $$('.tones button').forEach(b=>b.onclick=()=>{$$('.tones button').forEach(x=>x.classList.toggle('on',x==b));const i=$('#qimg');i.style.animation='none';void i.offsetWidth;i.style.animation='';i.src=TONE[b.dataset.t]});
 $('#qBook').onclick=()=>open('book');$('#qAgain').onclick=quiz}
quiz();renderBag();
const v=$('#vid');v.play&&v.play().catch(()=>{});
