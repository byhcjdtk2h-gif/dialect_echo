'use strict';
const $=id=>document.getElementById(id),legacyNames=['广西话','四川话（西南官话）','广东话（粤语）','冀鲁官话','闽中话','贵州话（西南官话）','河南话','闽南语','云南话（西南官话）','宁夏话（兰银官话）','中原官话','吴语（柔波体验）'];
const legacyMapping=[null,7,12,2,10,7,4,10,7,5,4,9];
let samples=[],mode='idle',ctx,analyser,source,stream,recorder,chunks=[],audio=null,activeURL=null,started=0,recordDialect=9,records=[],db,playbackToken=0;
let selected=9,previous=9,morph=1;
const freq=new Uint8Array(512),wave=new Uint8Array(1024),navButtons=[];
function listSamples(i=selected){return samples.filter(s=>legacyMapping[s.id]===i)}
function currentSample(){return samples.find(s=>s.id===Number($('sampleChoice').value)&&legacyMapping[s.id]===selected)}
function status(s){$('status').textContent=s}
function controls(){const busy=mode!=='idle';$('record').disabled=busy;$('sample').disabled=busy||!currentSample();$('dialect').disabled=busy;$('sampleChoice').disabled=busy||!listSamples().length;$('stop').disabled=!busy;$('lamp').style.background=busy?'#d8e6ca':'';$('unclassifiedPlay').disabled=busy||!samples.length;navButtons.forEach(b=>b.disabled=busy)}
for(let i=0;i<dialects.length;i++){
 const d=dialects[i];$('dialect').add(new Option(d.name,i));const b=document.createElement('button');b.className='dialect-item';b.style.setProperty('--swatch',d.colors[0].hex);b.setAttribute('aria-label',d.name);const num=document.createElement('span');num.className='n';num.textContent=String(i+1).padStart(2,'0');const name=document.createElement('span');name.textContent=d.name;const dot=document.createElement('i');b.append(num,name,dot);b.onclick=()=>{if(mode==='idle'){$('dialect').value=i;change()}};$('dialectList').append(b);navButtons.push(b)
}
$('dialect').value=selected;
function tone(c){const lum=c[0]*.25+c[1]*.6+c[2]*.15,boost=Math.max(0,105-lum)*.55;return c.map(n=>Math.round(n*.56+lum*.44+boost))}
function particleTone(rgb){
 const peak=Math.max(...rgb),chroma=peak-Math.min(...rgb);
 if(chroma/Math.max(1,peak)<.12)return rgb.map(n=>Math.min(248,n+(peak<150?110:12)));
 const lit=Math.max(225,peak),scale=lit/Math.max(1,peak);
 return rgb.map(n=>Math.min(248,Math.max(0,lit-(peak-n)*scale*1.12)));
}
let palette=dialects[selected].colors.map(c=>particleTone(c.rgb));
function updateSampleInfo(){const s=currentSample();$('sampleInfo').textContent=s?'「天冷了，记得加衣服」':'可录下你的乡音';$('sample').textContent=s?'▷ 聆听原声':'暂无样本';controls()}
function change(){const next=+$('dialect').value;if(next!==selected){previous=selected;selected=next;morph=0}const d=dialects[selected];document.documentElement.style.setProperty('--accent',tone(d.colors[0].rgb).join(','));navButtons.forEach((b,i)=>b.setAttribute('aria-current',i===selected?'true':'false'));$('dialectTitle').textContent=d.name;$('artnum').textContent=String(selected+1).padStart(2,'0')+' / 17';$('motif').textContent=d.motif;$('regionEnglish').textContent=d.en;$('regionName').textContent=d.name;$('regionPlaces').textContent=d.places;$('regionTitle').textContent=d.title;$('regionDescription').textContent=d.description;$('regionElements').textContent=d.elements;$('languageFeature').textContent=d.feature;$('palette').replaceChildren();
 for(const c of d.colors){const sw=document.createElement('div');sw.className='swatch';sw.title=`${c.name} · RGB(${c.rgb.join(', ')})`;const bar=document.createElement('i');bar.style.background=c.hex;const label=document.createElement('span');label.textContent=c.name;const code=document.createElement('small');code.textContent=c.hex;sw.append(bar,label,code);$('palette').append(sw)}
 $('sampleChoice').replaceChildren();const options=listSamples();if(options.length)options.forEach(s=>$('sampleChoice').add(new Option(s.name,s.id)));else $('sampleChoice').add(new Option('等待一份家乡原声',''));updateSampleInfo();
}
$('dialect').onchange=change;
window.addEventListener('echo:next-dialect',()=>{
 if($('info').open||$('regionPanel').open||!$('drawer').hidden)return;
 if(mode==='play')finish();
 if(mode!=='idle')return;
 $('dialect').value=(selected+1)%dialects.length;
 change();
 const button=navButtons[selected],catalog=button.parentElement?.parentElement;
 if(catalog&&button.offsetHeight){
  const item=button.getBoundingClientRect(),bounds=catalog.getBoundingClientRect();
  if(item.bottom>bounds.bottom)catalog.scrollTop+=item.bottom-bounds.bottom;
  if(item.top<bounds.top)catalog.scrollTop-=bounds.top-item.top;
 }
});$('sampleChoice').onchange=updateSampleInfo;
fetch('audio/manifest.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{samples=data;change()}).catch(()=>status('样本加载失败，请刷新重试'));
function setup(){if(!ctx){ctx=new AudioContext();analyser=ctx.createAnalyser();analyser.fftSize=1024;analyser.smoothingTimeConstant=.75}return ctx.resume()}
function unlink(){if(source){source.disconnect();source=null}if(audio){audio.pause();audio.src='';audio=null}if(activeURL){URL.revokeObjectURL(activeURL);activeURL=null}if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}}
function finish(){playbackToken++;unlink();mode='idle';controls();status('等待一声乡音')}
async function play(url,label,index){if(mode!=='idle')return;const token=++playbackToken;mode='loading';controls();status('正在加载原声');try{await setup();if(token!==playbackToken)return;if(index!==null){$('dialect').value=index;change()}const player=new Audio();audio=player;player.preload='auto';const ready=new Promise((resolve,reject)=>{player.onloadedmetadata=resolve;player.onerror=()=>reject(Error('音频无法加载'))});player.src=url;player.load();await ready;if(token!==playbackToken)return;source=ctx.createMediaElementSource(player);source.connect(analyser);analyser.connect(ctx.destination);mode='play';started=performance.now();controls();status(label);player.onended=()=>{if(token===playbackToken)finish()};await player.play()}catch(e){if(token===playbackToken){finish();status('播放失败，请重试')}}}
$('sample').onclick=()=>{const s=currentSample();if(s)play(s.file,'原声 · '+s.name,selected)};
$('unclassifiedPlay').onclick=()=>{const s=samples.find(s=>s.id===0);if(s)play(s.file,'广西话原标签 · 类别未确认，暂沿用当前视觉',null)};
$('record').onclick=async()=>{if(mode!=='idle')return;mode='request';controls();status('请允许使用麦克风');try{if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Error('请通过 HTTPS 在支持录音的浏览器打开');await setup();const input=await navigator.mediaDevices.getUserMedia({audio:true});if(mode!=='request'){input.getTracks().forEach(t=>t.stop());return}stream=input;source=ctx.createMediaStreamSource(stream);source.connect(analyser);analyser.disconnect();chunks=[];recordDialect=selected;recorder=new MediaRecorder(stream);recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.onstop=async()=>{const d=dialects[recordDialect],item={id:crypto.randomUUID(),dialectKey:d.id,dialectName:d.name,schemaVersion:2,date:Date.now(),duration:(performance.now()-started)/1000,blob:new Blob(chunks,{type:recorder.mimeType})};finish();records.unshift(item);render();try{await operation('put',item);status('原声已保存 · 可在声音档案中回听')}catch{status('持久保存失败，请及时下载这段原声备份')}};recorder.start();mode='record';started=performance.now();controls();status('正在采集 · '+dialects[selected].name)}catch(e){finish();status(e.name==='NotAllowedError'?'未获麦克风权限，请在浏览器设置中允许':e.message||'麦克风启动失败')}};
$('stop').onclick=()=>{if(mode==='record'){recorder.stop();mode='saving';controls();status('正在保存')}else finish()};
$('history').onclick=()=>{$('drawer').hidden=false};$('close').onclick=()=>{$('drawer').hidden=true};$('about').onclick=()=>$('info').showModal();$('regionToggle').onclick=()=>$('regionPanel').showModal();document.addEventListener('keydown',e=>{if(e.key==='Escape')$('drawer').hidden=true});
function operation(type,value){return new Promise((resolve,reject)=>{if(!db)return reject(Error('数据库不可用'));const tx=db.transaction('voices','readwrite'),st=tx.objectStore('voices');type==='put'?st.put(value):st.delete(value);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}
function recordInfo(r){if(r.dialectKey){const i=dialects.findIndex(d=>d.id===r.dialectKey);return{name:r.dialectName||dialects[i]?.name||'未标注方言',index:i<0?null:i}}return{name:legacyNames[r.dialect]||'旧版未标注录音',index:legacyMapping[r.dialect]??null}}
function render(){$('count').textContent=String(records.length).padStart(2,'0');$('list').replaceChildren();if(!records.length){const p=document.createElement('p');p.className='empty';p.textContent='这里还没有声音。录下第一句家乡话，让记忆留下来。';$('list').append(p)}for(const r of records){const info=recordInfo(r),row=document.createElement('div');row.className='entry';const title=document.createElement('strong');title.textContent=info.name;const meta=document.createElement('small');meta.textContent=new Date(r.date).toLocaleString('zh-CN')+' · '+r.duration.toFixed(1)+' 秒';const tools=document.createElement('div');tools.className='tools';for(const label of ['▷ 回听','下载','删除']){const b=document.createElement('button');b.textContent=label;tools.append(b);if(label==='▷ 回听')b.onclick=()=>{if(mode!=='idle'){status('请先停止当前声音');return}const url=URL.createObjectURL(r.blob);activeURL=url;play(url,'回听 · '+info.name,info.index)};if(label==='下载')b.onclick=()=>{const url=URL.createObjectURL(r.blob),a=document.createElement('a');a.href=url;const ext=r.blob.type.includes('mp4')?'m4a':r.blob.type.includes('ogg')?'ogg':'webm';a.download=info.name+'-'+r.date+'.'+ext;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};if(label==='删除')b.onclick=async()=>{try{await operation('delete',r.id);records=records.filter(x=>x.id!==r.id);render()}catch{status('删除未完成，请重试')}}}row.append(title,meta,tools);$('list').append(row)}}
try{const request=indexedDB.open('echo-voice-archive',1);request.onupgradeneeded=()=>request.result.createObjectStore('voices',{keyPath:'id'});request.onsuccess=()=>{db=request.result;const q=db.transaction('voices').objectStore('voices').getAll();q.onsuccess=()=>{records=q.result.sort((a,b)=>b.date-a.date);render()}};request.onerror=()=>status('浏览器存储不可用，录音后请下载备份')}catch{status('浏览器存储不可用，录音后请下载备份')}render();
const canvas=$('scene'),g=canvas.getContext('2d');let w,h,dpr,stageRect;
function resize(){w=innerWidth;h=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;g.setTransform(dpr,0,0,dpr,0,0);measureStage()}
const stage=$('stage');
function measureStage(){stageRect=stage.getBoundingClientRect()}
addEventListener('resize',resize);
addEventListener('scroll',measureStage,{passive:true});
if(typeof ResizeObserver!=='undefined')new ResizeObserver(measureStage).observe(stage);
resize();
const N=11000,points=Array.from({length:N},(_,i)=>({u:(i*.61803398875)%1,v:(i*.754877666)%1,shade:(i*.56984029)%1,s:.56+Math.pow((i*.43857913)%1,6)*4.15}));let energy=0,low=0,high=0,last=0,visualTime=0,colorMix=0;
function draw(now){requestAnimationFrame(draw);if(now-last<30)return;const dt=Math.min(.05,(now-last)/1000||.03);last=now;let target=0,lo=0,hi=0;const active=['record','play'].includes(mode);
 if(analyser&&active){analyser.getByteFrequencyData(freq);analyser.getByteTimeDomainData(wave);for(let i=0;i<wave.length;i++)target+=((wave[i]-128)/128)**2;target=Math.min(1,Math.sqrt(target/wave.length)*4);for(let i=0;i<20;i++)lo+=freq[i]/(20*255);for(let i=40;i<220;i++)hi+=freq[i]/(180*255)}else freq.fill(0);
 const k=+$('gain').value;energy+=(target-energy)*(selected===9?.07:.32);low+=(lo-low)*.16;high+=(hi-high)*.16;visualTime=mode==='play'&&audio?audio.currentTime:mode==='record'?(now-started)/1000:visualTime+dt*.28;morph=Math.min(1,morph+dt*.9);const mix=morph*morph*(3-2*morph);
 const tintTarget=active?Math.min(1,Math.max(0,(target-.035)*8)):0;
 colorMix+=(tintTarget-colorMix)*(1-Math.exp(-dt*(tintTarget>colorMix?9:1.8)));
 const desired=dialects[selected].colors.map(c=>particleTone(c.rgb));palette=palette.map((c,i)=>c.map((n,j)=>n+(desired[i][j]-n)*.06));
 g.fillStyle='#090d0e';g.fillRect(0,0,w,h);const r=stageRect,cx=r.left+r.width*.5,cy=r.top+r.height*.48,size=Math.min(r.width*.43,r.height*.61);
 const hand=window.EchoGesture?.advance(dt)||EchoGestureMath.neutral();
 const handX=hand.x*r.width,handY=hand.y*r.height;
 for(let i=0;i<160;i++){const p=points[i],x=p.u*w,y=p.v*h;g.fillStyle='rgba(146,169,152,'+(.025+p.shade*.055)+')';g.fillRect(x,y,.7,.7)}
 for(const p of points){const band=freq[Math.floor(p.u*120)]/255,to=motionPoint(selected,p.u,p.v,visualTime,energy*k,low*k,high*k,band*k),from=morph<1?motionPoint(previous,p.u,p.v,visualTime,energy*k,low*k,high*k,band*k):to,pos={x:from.x+(to.x-from.x)*mix,y:from.y+(to.y-from.y)*mix,z:from.z+(to.z-from.z)*mix};
  const d=EchoGestureMath.scatterPoint(pos,p,now*.001,hand.scatter),px=cx+handX+d.x*size,py=cy+handY+d.y*size;
  const layer=p.shade>.9?2:p.shade>.55?1:0,c=palette[layer];
  const rgb=c.map(n=>Math.round(239+(n-239)*colorMix));
  const alpha=Math.min(.98,.4+p.shade*.43+Math.min(1,p.s/4.8)*.16+energy*.15)*d.alpha;
  const ps=p.s*(1+energy*.35)*d.size;
  if(p.s>2.8){g.fillStyle='rgba('+rgb.join(',')+','+(alpha*.09)+')';g.fillRect(px-ps*.85,py-ps*.85,ps*1.7,ps*1.7)}
  g.fillStyle='rgba('+rgb.join(',')+','+alpha+')';g.fillRect(px-ps*.5,py-ps*.5,ps,ps);
 }
 if(active){const elapsed=mode==='play'&&audio?audio.currentTime:(now-started)/1000;$('timer').textContent=String(Math.floor(elapsed/60)).padStart(2,'0')+':'+String(Math.floor(elapsed%60)).padStart(2,'0')}else $('timer').textContent='00:00';
}
change();requestAnimationFrame(draw);
