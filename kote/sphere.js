// KOTE "flower in haze": a wireframe sphere built only from the four-petal emblem outline
(()=>{const cv=document.getElementById('sphere');if(!cv)return;const g=cv.getContext('2d');
function bez(p0,p1,p2,p3,n){const o=[];for(let i=0;i<=n;i++){const t=i/n,m=1-t;o.push([m*m*m*p0[0]+3*m*m*t*p1[0]+3*m*t*t*p2[0]+t*t*t*p3[0],m*m*m*p0[1]+3*m*m*t*p1[1]+3*m*t*t*p2[1]+t*t*t*p3[1]])}return o}
const petal=[[[0,-10],[40,-14],[30,-40],[0,-60]],[[0,-60],[-30,-40],[-40,-14],[0,-10]],[[0,-10],[20,-18],[14,-38],[0,-50]],[[0,-50],[-14,-38],[-20,-18],[0,-10]]];
const E=[];for(let r=0;r<4;r++){const a=r*Math.PI/2,c=Math.cos(a),s=Math.sin(a);petal.forEach(b=>E.push(bez(...b.map(([x,y])=>[(x*c-y*s)/60,(x*s+y*c)/60]),28)))}
const ci=[];for(let i=0;i<=36;i++){const a=i/36*Math.PI*2;ci.push([7/60*Math.cos(a),7/60*Math.sin(a)])}E.push(ci);
// normalise: stretch each angle so the outer petal envelope becomes a perfect circle -> true sphere silhouette
const NBIN=180,env=new Array(NBIN).fill(.05);E.forEach(pl=>pl.forEach(([x,y])=>{const b=((Math.atan2(y,x)+Math.PI)/(2*Math.PI)*NBIN|0)%NBIN;env[b]=Math.max(env[b],Math.hypot(x,y))}));
const envs=env.map((v,i)=>{let m=0;for(let k=-3;k<=3;k++)m=Math.max(m,env[(i+k+NBIN)%NBIN]);return m});
E.forEach(pl=>pl.forEach(p=>{const b=((Math.atan2(p[1],p[0])+Math.PI)/(2*Math.PI)*NBIN|0)%NBIN,f=.97/envs[b];p[0]*=f;p[1]*=f}));
const S=[];// [points3d, kind]
const N=14;for(let k=0;k<N;k++){const f=k*Math.PI/N,c=Math.cos(f),s=Math.sin(f);E.forEach(pl=>S.push([pl.map(([x,y])=>[x*c,-y,x*s]),0,[-s,0,c]]))}
// latitude rings: emblem laid flat at a few heights (gold hints)
[-0.55,0,0.55].forEach((h,i)=>{const r=Math.sqrt(1-h*h)*.98,rot=i*Math.PI/8;E.slice(0,16).forEach(pl=>S.push([pl.map(([x,y])=>{const X=x*Math.cos(rot)-y*Math.sin(rot),Z=x*Math.sin(rot)+y*Math.cos(rot);return[X*r,h,Z*r]}),1,[0,1,0]]))});
const hz=document.createElement('canvas');hz.id='haze';cv.parentNode.insertBefore(hz,cv);const hg=hz.getContext('2d');
let W,H,R,D;function size(){const b=cv.getBoundingClientRect();D=Math.min(devicePixelRatio||1,1.5);cv.width=b.width*D;cv.height=b.height*D;W=cv.width;H=cv.height;R=D*innerWidth*.9;hz.width=W/2;hz.height=H/2}size();addEventListener('resize',size);
const t0=performance.now(),tilt=0.28,NB=6;
function frame(now){const k=document.querySelector('.bigkote'),cb=cv.getBoundingClientRect(),kb=k?k.getBoundingClientRect():cb;const t=(now-t0)/1000*.22,cx=(kb.left+kb.width/2-cb.left)*D,cy=(kb.top+kb.height/2-cb.top)*D,c=Math.cos(t),s=Math.sin(t),ct=Math.cos(tilt),st=Math.sin(tilt);
 g.clearRect(0,0,W,H);g.lineCap='round';
 const B=[...Array(NB*2)].map(()=>new Path2D());
 for(const [pts,kind,n] of S){let prev=null;const nz=Math.abs(-n[0]*s+n[2]*c),fo=kind?1:.25+.75*Math.pow(nz,6);for(const p of pts){const x=p[0]*c+p[2]*s,z=-p[0]*s+p[2]*c,y=p[1];const q=[cx+x*R,cy-(y*ct-z*st)*R,y*st+z*ct];
  if(prev){const d=((prev[2]+q[2])/2+1)/2*fo;const b=Math.min(NB-1,d*NB|0)+kind*NB;B[b].moveTo(prev[0],prev[1]);B[b].lineTo(q[0],q[1])}prev=q}}
 for(let b=0;b<NB*2;b++){const kind=b>=NB,d=((b%NB)+.5)/NB;g.strokeStyle=kind?`rgba(214,184,122,${.04+.22*d})`:`rgba(240,240,244,${.07+.8*d*d})`;g.lineWidth=(.7+1.6*d)*D;g.stroke(B[b])}
 hg.clearRect(0,0,hz.width,hz.height);hg.drawImage(cv,0,0,hz.width,hz.height);
 requestAnimationFrame(frame)}
requestAnimationFrame(frame)})();
