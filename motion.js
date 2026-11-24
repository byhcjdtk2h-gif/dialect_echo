// Original geometric interpretations of the regional references in the supplied design table.
function motionPoint(index,u,v,t,e,low,high,band){
 const a=u*Math.PI*2,lane=Math.floor(v*44)/44,amp=.025+e*.19;let x=0,y=0,z=0;
 switch(index){
 case 0:{const arm=Math.floor(u*6),q=(u*6)%1,theta=arm*Math.PI/3,r=.12+v*.78;const branch=Math.sin(q*Math.PI)*(.1+v*.2);x=Math.cos(theta)*r+Math.cos(theta+Math.PI/3)*branch*(q<.5?1:-1);y=Math.sin(theta)*r+Math.sin(theta+Math.PI/3)*branch*(q<.5?1:-1);const pulse=1+e*.1*Math.sin(v*12-t*3);x*=pulse;y*=pulse;break;}
 case 1:{const side=Math.floor(u*4),q=(u*4)%1,r=.2+lane*.65;const square=[[-r+2*r*q,-r],[r,-r+2*r*q],[r-2*r*q,r],[-r,r-2*r*q]][side];x=square[0];y=square[1]*.78;y+=Math.sin(q*6+t)*amp*.3;z=Math.sin(lane*8)*.06;break;}
 case 2:{const line=Math.floor(v*60),q=(line%30)/29,vert=line>=30;x=vert?(q-.5)*1.8:(u-.5)*1.8;y=vert?(u-.5)*1.25:(q-.5)*1.25;y+=Math.sin(x*9+t*1.2+q*5)*amp*.5;z=Math.cos(u*12+line)*.04;break;}
 case 3:x=(u-.5)*2;y=(lane-.5)*1.15+Math.sin(u*7-t*.8+lane*2)*(.12+e*.23)+Math.sin(u*17+t*.5)*high*.1;z=lane*.08;break;
 case 4:x=(u-.5)*1.9;y=(lane-.5)*1.15+Math.sin(u*5+lane*4)*.12+Math.floor(Math.sin(u*6-t*.4)*3)*amp*.4;z=Math.cos(lane*7)*.05;break;
 case 5:x=(u-.5)*2;y=(lane-.5)*1.1+Math.sin(u*4.4-t*.35+lane*3)*(.23+e*.15)+Math.sin(u*8+t*.2)*amp*.4;z=lane*.12;break;
 case 6:x=(u-.5)*1.95;y=(lane-.5)*.9+Math.sin(u*8+Math.sin(u*4)*2-t*.4+lane*3)*(.14+e*.15);z=Math.cos(u*7+lane*5)*.08;break;
 case 7:{const col=Math.floor(u*88),c=col/87,jump=(.5+.5*Math.sin(t*(4+e*7)+col*.58))**3;x=(c-.5)*1.7;y=(v-.5)*(.35+band*.65+e*jump*.65)+(jump-.5)*e*.22;z=(col%3)*.045;break;}
 case 8:{const arch=Math.floor(u*5),q=(u*5)%1,theta=q*Math.PI,r=.15+lane*.11;x=(arch-2)*.39+Math.cos(theta)*r;y=.44-Math.sin(theta)*(.66+lane*.2)+Math.sin(t*2+arch)*e*.05;z=lane*.08;break;}
 case 9:x=(u-.5)*2;y=(lane-.5)*.8+Math.sin(u*5.5-t*.65+lane*2)*(.12+e*.22)+Math.sin(u*9-t*.4)*e*.055;z=lane*.08;break;
 case 10:{x=(u-.5)*1.85;const roof=-.33+.42*(1-(2*u-1)**2)-.18*Math.pow(Math.abs(2*u-1),5);y=roof+(lane-.5)*.6+Math.sin(u*9-t*.7+lane*3)*amp*.3;z=lane*.07;break;}
 case 11:{const r=.21+lane*.59,theta=a+Math.sin(t*.3)*.04;x=Math.cos(theta)*r;y=Math.sin(theta)*r*.78;if(u>.72&&u<.78){x*=.55;y*=.55}z=Math.sin(lane*8)*.1+e*.04*Math.sin(t*3+a);break;}
 case 12:{const col=Math.floor(u*7),q=u*7%1;if(v<.6){const theta=q*Math.PI;x=(col-3)*.27+Math.cos(theta)*.13;y=-.25-Math.sin(theta)*(.25+v*.35)}else{x=(col-3)*.27+(q>.5?.11:-.11);y=-.22+(v-.6)*1.6}y+=Math.sin(t*2+col)*e*.07;break;}
 case 13:{const strand=Math.floor(v*48)/48,sign=strand<.5?1:-1;x=(u-.5)*1.9;y=(strand-.5)*.95+Math.sin(u*9+sign*t*.9+strand*7)*(.14+e*.18);z=Math.cos(u*9+strand*7)*.09;break;}
 case 14:{const col=Math.floor(u*60)/59,row=Math.floor(v*50)/49;x=(col-.5)*1.9+Math.sin(row*10-t*.8)*amp*.5;y=(row-.5)*1.15+Math.sin(col*9-t*.7+row*3)*(.07+e*.15);z=Math.sin(col*7+row*8)*.07;break;}
 case 15:{x=(u-.5)*1.9;const step=Math.floor(u*9)/9,roof=-.43+.26*Math.abs(Math.sin(step*Math.PI*3));y=roof+lane*.9;if(v>.92)y=roof-.05;z=lane*.05;y+=Math.sin(t+u*5)*e*.035;break;}
 case 16:{const r=.12+lane*.7,shape=1+.17*Math.sin(a*3+lane*2)+.13*Math.cos(a*5);x=Math.cos(a)*r*shape;y=Math.sin(a)*r*.75*shape+Math.sin(a*4+t*.35)*amp*.25;z=lane*.06;break;}
 }
 return{x,y,z};
}
if(typeof module!=='undefined')module.exports={motionPoint};
