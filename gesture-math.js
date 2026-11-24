(function(root){
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const neutral=()=>({scatter:0,x:0,y:0});
 function measure(lm,aspect=4/3){
  if(!lm||lm.length!==21||lm.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))return null;
  const distance=(a,b)=>Math.hypot((a.x-b.x)*aspect,a.y-b.y);
  let extended=0,curled=0,indexExtended=false;
  for(const [base,joint,tip] of [[5,6,8],[9,10,12],[13,14,16],[17,18,20]]){
   const a=lm[base],b=lm[joint],c=lm[tip];
   const straight=distance(a,c)/Math.max(.001,distance(a,b)+distance(b,c));
   const reach=distance(c,lm[0])/Math.max(.001,distance(b,lm[0]));
   if(straight>.84&&reach>1.13){extended++;if(base===5)indexExtended=true;}
   if(reach<1.03&&straight<.82)curled++;
  }
  const indexOnly=indexExtended&&extended===1&&curled>=2;
  const palm=[0,5,9,13,17].map(i=>lm[i]);
  return {
   kind:indexOnly?'point':extended>=3?'open':curled>=3?'closed':'hold',
   extended,
   // Mirror coordinates so screen-left matches the user's reflected preview.
   x:1-palm.reduce((sum,p)=>sum+p.x,0)/palm.length,
   y:palm.reduce((sum,p)=>sum+p.y,0)/palm.length,
   tipX:1-lm[8].x,
   tipY:lm[8].y
  };
 }
 function smooth(current,target,dt){
  const step=Math.min(.1,Math.max(0,dt));
  const scatterEase=1-Math.exp(-step*(target.scatter>current.scatter?.65:1.8));
  const moveEase=1-Math.exp(-step*11);
  return {
   scatter:current.scatter+(target.scatter-current.scatter)*scatterEase,
   x:(current.x??0)+((target.x??0)-(current.x??0))*moveEase,
   y:(current.y??0)+((target.y??0)-(current.y??0))*moveEase
  };
 }
 function createController(){
  let last=neutral(),missingSince=null,palmStart=null,dragging=false;
  let swipeStart=null,swipeEnd=null,lastSwipe=-Infinity;
  function clearPose(){palmStart=null;dragging=false;swipeStart=null;swipeEnd=null;}
  return {
   reset(){last=neutral();missingSince=null;clearPose();lastSwipe=-Infinity;},
   update(hands,aspect,now){
    const m=measure(hands?.[0],aspect);
    if(!m){
     if(missingSince===null)missingSince=now;
     if(now-missingSince>350){last=neutral();clearPose();}
     swipeStart=null;
     return {...last,kind:'missing',count:0};
    }
    missingSince=null;
    let kind=m.kind,swipe=false;
    if(m.kind==='point'){
     palmStart=null;dragging=false;
     if(swipeEnd!==null&&m.tipX>swipeEnd+.12)swipeEnd=null;
     if(swipeEnd===null&&now-lastSwipe>=650){
      if(!swipeStart||now-swipeStart.time>420||m.tipX>swipeStart.tipX){
       swipeStart={...m,time:now};
      }
      const dx=swipeStart.tipX-m.tipX,dy=Math.abs(swipeStart.tipY-m.tipY);
      // Require a leftward travel of the hand, so bending the index alone does not switch.
      if(dx>.14&&dy<dx*.55&&swipeStart.x-m.x>.06){
       swipe=true;lastSwipe=now;swipeEnd=m.tipX;swipeStart=null;
      }
     }
    }else{
     swipeStart=null;swipeEnd=null;
     if(m.kind==='closed'){
      last.scatter=0;palmStart=null;dragging=false;
     }else if(m.extended>=2){
      if(!palmStart)palmStart={...m,time:now,offsetX:last.x,offsetY:last.y};
      const dx=m.x-palmStart.x,dy=m.y-palmStart.y;
      if(Math.hypot(dx,dy)>.055)dragging=true;
      if(dragging){
       last={scatter:0,x:clamp(palmStart.offsetX+dx*.8,-.19,.19),y:clamp(palmStart.offsetY+dy*.85,-.23,.23)};
       kind='move';
      }else if(m.kind==='open'&&now-palmStart.time>=440){
       last.scatter=1;
      }else if(m.kind==='open'){
       kind='ready';
      }
     }else{
      palmStart=null;dragging=false;
     }
    }
    return {...last,kind,count:1,swipe};
   }
  };
 }
 function transform(s){return{scatter:clamp(s.scatter??0,0,1),x:s.x??0,y:s.y??0};}
 const fract=n=>n-Math.floor(n);
 function scatterPoint(pos,p,t,amount){
  const seed=fract(p.u*71.37+p.v*19.71),n=clamp((amount-seed*.12)/.88,0,1),mix=n*n*(3-2*n);
  // Each particle gets an independent destination and drifting path, rather than scaling its radius.
  const dx=(fract(p.u*127.1+p.v*311.7)-.5)*4.8+.18*Math.sin(t*.7+seed*20);
  const dy=(fract(p.u*269.5+p.v*183.3)-.5)*3.4+.16*Math.cos(t*.5+seed*31);
  const curl=Math.sin(mix*Math.PI)*.24;
  return{x:pos.x*(1-mix)+dx*mix+Math.cos(seed*30+t*.4)*curl,y:(pos.y+(pos.z||0))*(1-mix)+dy*mix+Math.sin(seed*30+t*.4)*curl,alpha:1-.83*mix,size:1-.25*mix};
 }
 const api={measure,smooth,neutral,createController,transform,scatterPoint};if(typeof module!=='undefined')module.exports=api;else root.EchoGestureMath=api;
})(typeof window==='undefined'?{}:window);
