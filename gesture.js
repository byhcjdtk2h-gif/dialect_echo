(()=>{
 const byId=id=>document.getElementById(id),button=byId('gestureToggle'),panel=byId('gesturePanel'),video=byId('gestureVideo'),overlay=byId('gestureOverlay'),hint=byId('gestureStatus');
 const guide='食指左滑切换 · 移动手掌拖动纹样';
 const pen=overlay.getContext('2d');let enabled=false,stream=null,detector=null,epoch=0,raf=0,lastFrame=-1,lastInference=0,lastSeen=-Infinity;
 const neutral=EchoGestureMath.neutral,controller=EchoGestureMath.createController();
 let current=neutral(),target=neutral();
 const edges=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];
 function say(text){if(hint.textContent!==text)hint.textContent=text;}
 function close(message=''){
  enabled=false;epoch++;cancelAnimationFrame(raf);raf=0;
  if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}video.pause();video.srcObject=null;
  if(detector){detector.close();detector=null}
  target=neutral();controller.reset();lastSeen=-Infinity;lastFrame=-1;lastInference=0;pen.clearRect(0,0,overlay.width,overlay.height);
  button.textContent='开启手势';button.setAttribute('aria-pressed','false');panel.hidden=true;say(message);
 }
 function drawHands(hands){
  pen.clearRect(0,0,overlay.width,overlay.height);const w=overlay.width,h=overlay.height;
  for(const lm of hands){pen.strokeStyle='#ffffffaa';pen.lineWidth=1;pen.beginPath();for(const [a,b]of edges){pen.moveTo(lm[a].x*w,lm[a].y*h);pen.lineTo(lm[b].x*w,lm[b].y*h)}pen.stroke();pen.fillStyle='#fff';for(const i of [4,8]){pen.beginPath();pen.arc(lm[i].x*w,lm[i].y*h,3,0,Math.PI*2);pen.fill()}}

 }
 function tick(now){if(!enabled||!detector)return;raf=requestAnimationFrame(tick);
  if(video.readyState<2||video.currentTime===lastFrame||now-lastInference<42)return;
  lastFrame=video.currentTime;lastInference=now;
  try{
   const result=detector.detectForVideo(video,now),hands=result.landmarks||[];
   const next=controller.update(hands,video.videoWidth/video.videoHeight,now);
   drawHands(hands);target=next;
   if(next.count)lastSeen=now;
   if(next.swipe)window.dispatchEvent(new Event('echo:next-dialect'));
   const labels={open:'粒子缓缓消散',closed:'粒子汇聚',move:'纹样随手掌移动',point:'食指左滑切换方言',ready:'移动手掌拖动 · 停留消散',hold:guide,missing:guide};
   say(labels[next.kind]);
  }catch{close('识别中断，请重新开启手势')}
 }
 async function start(){if(enabled){close();return}const id=++epoch;enabled=true;button.textContent='取消开启';button.setAttribute('aria-pressed','true');say('正在请求摄像头…');
  try{
   if(!navigator.mediaDevices?.getUserMedia)throw Object.assign(new Error('请通过 HTTPS 在支持摄像头的浏览器打开'),{name:'InsecureContextError'});
   const probe=document.createElement('canvas'),gl=probe.getContext('webgl2')||probe.getContext('webgl');
   if(!gl)throw Object.assign(new Error('WebGL unavailable'),{name:'GraphicsUnavailableError'});
   gl.getExtension('WEBGL_lose_context')?.loseContext();
   const camera=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:640},height:{ideal:480},frameRate:{ideal:24,max:30}},audio:false});
   if(id!==epoch){camera.getTracks().forEach(t=>t.stop());return}stream=camera;
   for(const track of camera.getVideoTracks())track.addEventListener('ended',()=>{if(id===epoch)close('摄像头已断开，请重新开启')});
   video.srcObject=camera;panel.hidden=false;await video.play();if(id!==epoch)return;
   say('正在加载手势识别，首次开启请稍候…');
   const {FilesetResolver,HandLandmarker}=await import('./vendor/vision_bundle.mjs');if(id!==epoch)return;
   const files=await FilesetResolver.forVisionTasks('./vendor/wasm');if(id!==epoch)return;
   const model=await HandLandmarker.createFromOptions(files,{baseOptions:{modelAssetPath:'./vendor/hand_landmarker.task',delegate:'CPU'},runningMode:'VIDEO',numHands:1,minHandDetectionConfidence:.6,minHandPresenceConfidence:.6,minTrackingConfidence:.6});
   if(id!==epoch){model.close();return}detector=model;button.textContent='关闭手势';say(guide);raf=requestAnimationFrame(tick);
  }catch(error){if(id!==epoch)return;const message=error.name==='GraphicsUnavailableError'?'手势需要 WebGL 图形支持，请开启浏览器图形加速后重试':error.name==='InsecureContextError'?'请在 HTTPS 网站中开启摄像头':error.name==='NotAllowedError'?'摄像头未获授权，请允许后重试':error.name==='NotFoundError'?'未找到摄像头':error.name==='NotReadableError'?'摄像头被占用，请关闭其他应用后重试':'手势启动失败，请重试或检查浏览器设置';close(message)}
 }
 button.addEventListener('click',start);byId('gestureClose').addEventListener('click',()=>close());
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&enabled)close('页面已隐藏，摄像头已关闭')});window.addEventListener('pagehide',()=>close());
 window.EchoGesture={advance(dt){if(performance.now()-lastSeen>450){target=neutral();controller.reset()}current=EchoGestureMath.smooth(current,target,dt);return EchoGestureMath.transform(current)}};
})();
