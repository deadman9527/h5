!function(e,r){function i(e,r,i,n){function u(e){return(3*o*e+2*s)*e+w}function t(e){return((o*e+s)*e+w)*e}function c(e){return((z*e+d)*e+h)*e}function b(e){for(var r,i,n=e,c=0;8>c;c++){if(i=t(n)-e,Math.abs(i)<f)return n;if(r=u(n),Math.abs(r)<f)break;n-=i/r}var b=1,a=0;for(n=e;b>a;){if(i=t(n)-e,Math.abs(i)<f)return n;i>0?b=n:a=n,n=(b+a)/2}return n}function a(e){return c(b(e))}var f=1e-6,o=3*e-3*i+1,s=3*i-6*e,w=3*e,z=3*r-3*n+1,d=3*n-6*r,h=3*r;return a}r.cubicbezier=i,r.cubicbezier.liner=i(0,0,1,1),r.cubicbezier.ease=i(.25,.1,.25,1),r.cubicbezier.easeIn=i(.42,0,1,1),r.cubicbezier.easeOut=i(0,0,.58,1),r.cubicbezier.easeInOut=i(.42,0,.58,1)}(window,window.lib||(window.lib={}));