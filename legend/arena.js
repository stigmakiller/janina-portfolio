import * as THREE from './three.module.js';
const cv=document.getElementById('gl'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true,stencil:true,preserveDrawingBuffer:true});
R.autoClear=false;R.setPixelRatio(Math.min(Math.max(devicePixelRatio,1.5),2));R.outputColorSpace=THREE.SRGBColorSpace;
const S=new THREE.Scene();R.setClearColor(0x040303,1);S.fog=new THREE.Fog(0x040303,26,70);
const cam=new THREE.PerspectiveCamera(40,1,.05,300);const AN=R.capabilities.getMaxAnisotropy();
const cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),Rg=(p,a,b)=>cl((p-a)/(b-a)),L=(a,b,t)=>a+(b-a)*t,E=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const fin=(c,wrap=true)=>{const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;if(wrap)t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=AN;t.minFilter=THREE.LinearMipmapLinearFilter;t.generateMipmaps=true;return t};
const cnv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);return c};
// ---------- procedural textures (no lettering, no source assets)
const gold=(g,y0,y1)=>{const gr=g.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,'#5a3418');gr.addColorStop(.3,'#f3d394');gr.addColorStop(.55,'#c0844a');gr.addColorStop(1,'#4a2a12');return gr};
// cut-crystal band: vertical prism facets, a row of diamond cuts, gold-copper rims
const crystal=cnv(1024,1024,(g,w,h)=>{g.fillStyle='#0c0c0f';g.fillRect(0,0,w,h);const N=8,fw=w/N;
 for(let k=0;k<N;k++){const x=k*fw,gr=g.createLinearGradient(x,0,x+fw,0);gr.addColorStop(0,'#101116');gr.addColorStop(.18,'#3a3d46');gr.addColorStop(.36,'#e9edf5');gr.addColorStop(.44,'#9aa0ad');gr.addColorStop(.7,'#2a2c33');gr.addColorStop(1,'#0e0f13');
  g.fillStyle=gr;g.fillRect(x+3,h*.14,fw-6,h*.72);g.fillStyle='rgba(255,255,255,.55)';g.fillRect(x+fw*.36,h*.14,2,h*.72)}
 // diamond row
 const dy=h*.5;for(let k=0;k<N*2;k++){const cx=(k+.5)*w/(N*2),r=w/(N*4)*.9;g.save();g.translate(cx,dy);
  const gr=g.createLinearGradient(-r,-r,r,r);gr.addColorStop(0,'#f6f8ff');gr.addColorStop(.45,'#5d616c');gr.addColorStop(1,'#15161a');g.fillStyle=gr;
  g.beginPath();g.moveTo(0,-r*1.3);g.lineTo(r,0);g.lineTo(0,r*1.3);g.lineTo(-r,0);g.closePath();g.fill();g.strokeStyle='rgba(240,205,140,.7)';g.lineWidth=2;g.stroke();g.restore()}
 g.fillStyle=gold(g,0,h*.12);g.fillRect(0,0,w,h*.12);g.fillStyle=gold(g,h*.88,h);g.fillRect(0,h*.88,w,h*.12);
 g.fillStyle='rgba(255,240,200,.8)';g.fillRect(0,h*.125,w,2);g.fillRect(0,h*.873,w,2)});
const crystalT=fin(crystal);
const goldBand=fin(cnv(16,256,(g,w,h)=>{g.fillStyle=gold(g,0,h);g.fillRect(0,0,w,h)}));
const floorT=fin(cnv(2048,2048,(g,w,h)=>{const c=w/2,gr=g.createRadialGradient(c,c,0,c,c,c);gr.addColorStop(0,'#1b1612');gr.addColorStop(.5,'#0a0807');gr.addColorStop(1,'#050404');g.fillStyle=gr;g.fillRect(0,0,w,h);
 for(let r=60;r<c;r+=44){g.strokeStyle=`rgba(214,168,92,${.05+.04*Math.sin(r)})`;g.lineWidth=1.5;g.beginPath();g.arc(c,c,r,0,7);g.stroke()}}),false);
const glowT=fin(cnv(128,128,(g)=>{const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(255,235,185,1)');gr.addColorStop(.25,'rgba(240,165,85,.5)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,128,128)}),false);
const hazeT=fin(cnv(256,256,(g)=>{const gr=g.createRadialGradient(128,128,0,128,128,128);gr.addColorStop(0,'rgba(255,225,180,.35)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,256,256)}),false);
const TL=new THREE.TextureLoader();const ltex=f=>{const t=TL.load('img/'+f);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=AN;return t};
const HB=10,BH=.153*HB,BR=1.25,FY=.2;
// ---------- stage
const RAD=12,TH=2.8,tiers=[],rails=[],ledges=[];
for(let i=0;i<3;i++){
 const w=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,192,1,true,Math.PI/2),new THREE.MeshBasicMaterial({map:crystalT.clone(),side:THREE.DoubleSide,transparent:true,color:new THREE.Color(.8,.8,.82)}));w.material.map.needsUpdate=true;S.add(w);tiers.push(w);
 const b=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,192,1,true),new THREE.MeshBasicMaterial({map:goldBand,side:THREE.DoubleSide,transparent:true}));S.add(b);rails.push(b);
 const lg=new THREE.Mesh(new THREE.RingGeometry(1,1.13,192),new THREE.MeshBasicMaterial({color:0x0d0a08,side:THREE.DoubleSide,transparent:true}));lg.rotation.x=-Math.PI/2;S.add(lg);ledges.push(lg)}
const floor=new THREE.Mesh(new THREE.CircleGeometry(1,192),new THREE.MeshBasicMaterial({map:floorT,transparent:true,opacity:.9}));floor.rotation.x=-Math.PI/2;floor.position.y=FY;S.add(floor);
const rings=[];for(const [a,b] of [[.24,.25],[.42,.428],[.62,.627],[.86,.875]]){const rg=new THREE.Mesh(new THREE.RingGeometry(a,b,256),new THREE.MeshBasicMaterial({color:0xd6a85c,transparent:true,opacity:0,side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.y=FY+.01;S.add(rg);rings.push(rg)}
const rt=tiers.map(t=>{const c=new THREE.Mesh(t.geometry,t.material.clone());c.material.color=new THREE.Color(.16,.15,.15);S.add(c);return c});
const cand=[];for(let i=0;i<3;i++)for(let k=0;k<28;k++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowT,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));s.userData={i,a:k/28*Math.PI*2+i*.11,ph:Math.random()*9};S.add(s);cand.push(s)}
const hz=[];for(let k=0;k<7;k++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:hazeT,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));const a=k/7*7;s.position.set(Math.cos(a)*5,1.2+k%3,Math.sin(a)*5);s.scale.set(14,6,1);s.renderOrder=26;S.add(s);hz.push(s)}
const beamT=fin(cnv(8,256,(g)=>{const gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,'rgba(255,245,220,0)');gr.addColorStop(.2,'rgba(255,240,210,.5)');gr.addColorStop(1,'rgba(255,225,170,.1)');g.fillStyle=gr;g.fillRect(0,0,8,256)}),false);
const beamM=new THREE.MeshBasicMaterial({map:beamT,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,opacity:0});
const beam=new THREE.Mesh(new THREE.CylinderGeometry(.5,2.3,30,64,1,true),beamM);beam.position.y=15.2;beam.renderOrder=25;S.add(beam);
const pool=new THREE.Mesh(new THREE.CircleGeometry(2.6,64),new THREE.MeshBasicMaterial({map:glowT,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0}));pool.rotation.x=-Math.PI/2;pool.position.y=FY+.02;pool.renderOrder=14;S.add(pool);
// ---------- ballerina, human scale (~1.7 m body, 2.4 m with raised arm vs 2.8 m tiers)
const DH=2.8,DA=0.7385,dM=new THREE.MeshBasicMaterial({map:ltex('ballerina_gen.webp'),transparent:true,opacity:0,depthWrite:false,alphaTest:.02,color:new THREE.Color(1,.93,.84)});
const dancer=new THREE.Mesh(new THREE.PlaneGeometry(DH*DA,DH),dM);dancer.position.y=FY+DH/2;dancer.renderOrder=20;S.add(dancer);
const dR=new THREE.Mesh(dancer.geometry,dM.clone());dR.material.color=new THREE.Color(.45,.4,.34);dR.scale.y=-1;dR.position.y=FY-DH/2;dR.renderOrder=15;S.add(dR);
const shT=fin(cnv(128,128,(g)=>{const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(0,0,0,.85)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,128,128)}),false);
const shadow=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.45),new THREE.MeshBasicMaterial({map:shT,transparent:true,depthWrite:false,opacity:0}));shadow.rotation.x=-Math.PI/2;shadow.position.set(.2,FY+.03,0);shadow.renderOrder=16;S.add(shadow);
const N=1000,pos=new Float32Array(N*3);for(let i=0;i<N;i++){const r=Math.sqrt(Math.random())*RAD,a=Math.random()*7;pos.set([Math.cos(a)*r,Math.random()*14,Math.sin(a)*r],i*3)}
const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(pos,3));
const dust=new THREE.Points(dg,new THREE.PointsMaterial({map:glowT,size:.06,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0}));S.add(dust);

// ---------- screen-space bottle overlay + ladder-window portal (stencil)
const B=new THREE.Scene(),P=new THREE.Scene(),oc=new THREE.OrthographicCamera(-1,1,1,-1,-10,10);
const IW=1300,IH=4912,HX=[634,742],HY=[3547,3714],CR=[482,3338,932,4038];
const G=new THREE.Group();B.add(G);
const mkP=(w,h,mat,x,y,ro)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);m.position.set(x,y,0);m.renderOrder=ro;G.add(m);return m};
const uv2=(x,y)=>[x/IW-.5,.5-y/IH]; // fraction of plane
const bM=new THREE.MeshBasicMaterial({map:ltex('bottle_zoom.webp'),transparent:true,depthTest:false,depthWrite:false});
const dMt=new THREE.MeshBasicMaterial({map:ltex('bottle_detail.webp'),transparent:true,depthTest:false,depthWrite:false,opacity:0});
const rimT=fin(cnv(256,256,(g,w,h)=>{const f=(x0,y0,x1,y1)=>{const gr=g.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,'rgba(255,190,110,.9)');gr.addColorStop(.08,'rgba(255,160,80,.3)');gr.addColorStop(.25,'rgba(0,0,0,0)');return gr};
 g.globalCompositeOperation='lighter';g.fillStyle=f(0,0,w,0);g.fillRect(0,0,w,h);g.fillStyle=f(w,0,0,0);g.fillRect(0,0,w,h);g.fillStyle=f(0,0,0,h);g.fillRect(0,0,w,h);g.fillStyle=f(0,h,0,0);g.fillRect(0,0,w,h)}),false);
const rimM=new THREE.MeshBasicMaterial({map:rimT,transparent:true,blending:THREE.AdditiveBlending,depthTest:false,depthWrite:false,opacity:0});
const spillM=new THREE.MeshBasicMaterial({map:glowT,transparent:true,blending:THREE.AdditiveBlending,depthTest:false,depthWrite:false,opacity:0});
const stM=new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false,depthTest:false,stencilWrite:true,stencilRef:1,stencilFunc:THREE.AlwaysStencilFunc,stencilZPass:THREE.ReplaceStencilOp});
let bot,det,rim,spill,stq;
const hc=uv2((HX[0]+HX[1])/2,(HY[0]+HY[1])/2),hw=(HX[1]-HX[0])/IW,hh=(HY[1]-HY[0])/IH;
function buildOv(){G.clear();
 bot=mkP(1,1,bM,0,0,1);
 const c=uv2((CR[0]+CR[2])/2,(CR[1]+CR[3])/2);det=mkP((CR[2]-CR[0])/IW,(CR[3]-CR[1])/IH,dMt,c[0],c[1],2);
 rim=mkP(hw*1.04,hh*1.03,rimM,hc[0],hc[1],0);spill=mkP(hw*5,hw*5,spillM,hc[0],hc[1],3);
 const q=new THREE.Mesh(new THREE.PlaneGeometry(hw*1.06,hh*1.04),stM);q.position.set(hc[0],hc[1],0);stq=new THREE.Group();stq.add(q);P.add(stq)}
buildOv();
S.traverse(o=>{if(o.material){o.material.stencilFunc=THREE.EqualStencilFunc;o.material.stencilRef=1;o.material.stencilZPass=THREE.KeepStencilOp}});
const setSt=v=>S.traverse(o=>{if(o.material)o.material.stencilWrite=v});
function size(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();oc.left=-w/2;oc.right=w/2;oc.top=h/2;oc.bottom=-h/2;oc.updateProjectionMatrix()}size();addEventListener('resize',size);
const look=new THREE.Vector3(),cp=new THREE.Vector3();
function loop(t){const p=window.DIVE_P||0,ts=t/1000,mob=cam.aspect<.8;
 if(cv.clientWidth&&cv.width!==Math.round(cv.clientWidth*R.getPixelRatio()))size();
 const g=1,g2=1;
 const r0=L(BR,RAD,Math.pow(g,1.25)),h0=L(BH,TH,g);
 let y=FY;for(let i=0;i<3;i++){const ri=r0+i*L(0,1.7,g2),hi=i==0?h0:L(.001,TH,g2),bh=L(.001,.22,g2),w=tiers[i];
  w.scale.set(ri,hi,ri);w.position.y=y+hi/2;
  const rep=Math.max(1,2*Math.PI*ri/(hi*1.0));w.material.map.repeat.set(i==0?L(6,Math.round(2*Math.PI*RAD/TH),g):Math.round(2*Math.PI*ri/TH),1);
  w.material.opacity=1;w.material.color.setScalar(i==0?L(.95,.62,g):.55);
  rails[i].scale.set(ri,bh,ri);rails[i].position.y=y+hi+bh/2;rails[i].material.opacity=g2;
  ledges[i].scale.setScalar(ri);ledges[i].position.y=y+hi+bh;ledges[i].material.opacity=g2;
  rt[i].scale.set(ri,-hi,ri);rt[i].position.y=2*FY-(y+hi/2);rt[i].material.opacity=w.material.opacity*.8;
  for(const c of cand)if(c.userData.i==i){const a=c.userData.a;c.position.set(Math.cos(a)*(ri+.4),y+hi+bh+.18,Math.sin(a)*(ri+.4));const f=.75+.25*Math.sin(ts*9+c.userData.ph)*Math.sin(ts*3.7+c.userData.ph*2);c.material.opacity=f*g2;c.scale.setScalar(.8+.12*f)}
  y+=hi+bh}
 floor.scale.setScalar(r0);floor.material.opacity=.95;rings.forEach(rg=>{rg.scale.setScalar(r0);rg.material.opacity=.75});
 {const c=E(Rg(p,.14,.46)),c2=E(Rg(p,.46,.74)),e=E(Rg(p,.82,.9));
  cp.set(.6*(1-c2)*Math.sin(c*2),L(L(3.6,3.1,c),3.0,c2),L(L(mob?11.6:11,mob?11:9.9,c),mob?11:9.2,c2));look.set(0,L(1.9,1.8,c2)+e*14,0);cam.fov=L(L(30,40,c),mob?62:46,c2);}
 cam.position.copy(cp);cam.lookAt(look);cam.updateProjectionMatrix();
 const bm=Rg(p,.12,.24),d=Rg(p,.16,.28);
 beamM.opacity=bm*(.3+.05*Math.sin(ts*3));pool.material.opacity=bm*.8;dust.material.opacity=.2+bm*.5;
 hz.forEach((s,k)=>{s.material.opacity=Rg(p,.2,.4)*(.35+.1*Math.sin(ts*.5+k));s.position.y=1.2+k%3+.2*Math.sin(ts*.3+k)});
 dM.opacity=d;dR.material.opacity=d*.22;shadow.material.opacity=d*.7;
 dancer.lookAt(cam.position.x,dancer.position.y,cam.position.z);dR.quaternion.copy(dancer.quaternion);
 const pa=dg.attributes.position;for(let i=0;i<N;i++){let v=pa.array[i*3+1]+.003;if(v>14)v=0;pa.array[i*3+1]=v}pa.needsUpdate=true;
 const W=cv.clientWidth,Hh=cv.clientHeight,ovOn=p<.45&&!window.NOST;R.clear(true,true,true);
 if(ovOn){const bh=Hh*(mob?.8:.88),bw=bh*IW/IH,hwp=hw*bw,hhp=hh*bh;
  const sMax=1.25*Math.max(W/hwp,Hh/hhp),z1=E(Rg(p,.05,.25)),z2=Rg(p,.25,.29),z3=E(Rg(p,.29,.445));
  const s1=mob?9:13,sc=Math.exp(L(L(0,Math.log(s1),z1)+z2*Math.log(1.18),Math.log(sMax),z3));
  const cat=[.555-.5,.5-.792],zf=E(Rg(p,.28,.36)),fx=L(L(0,cat[0],z1),hc[0],zf),fy=L(L(0,cat[1],z1),hc[1],zf);
  G.scale.set(bw*sc,bh*sc,1);G.position.set(-fx*bw*sc,-fy*bh*sc+(1-z1)*Hh*.0,0);stq.scale.copy(G.scale);stq.position.copy(G.position);
  dMt.opacity=Rg(sc,4,8);const gl=Rg(p,.2,.34);rimM.opacity=gl*(.6+.08*Math.sin(ts*4));spillM.opacity=gl*.3*(1-Rg(p,.33,.38));
  R.render(P,oc);setSt(true);R.render(S,cam);setSt(false);R.render(B,oc);
 }else R.render(S,cam);
 requestAnimationFrame(loop)}
requestAnimationFrame(loop);
