// Project a torus knot and its tubular cross sections onto the orbital display.
type Point = [number, number, number]
function center(t:number):Point {
  const r=1.45+.54*Math.cos(3*t)
  return [r*Math.cos(2*t),r*Math.sin(2*t),.84*Math.sin(3*t)]
}
function project(t:number,a:number) {
  const p=center(t), q=center(t+.001)
  const v=q.map((n,i)=>n-p[i]), length=Math.hypot(...v)
  const [x,y,z]=v.map(n=>n/length), h=Math.hypot(x,y)
  const c=.23*Math.cos(a), s=.23*Math.sin(a)
  const X=p[0]-c*y/h-s*z*x/h, Y=p[1]+c*x/h-s*z*y/h, Z=p[2]+s*h
  return [(250+86*(X*.95-Y*.31)).toFixed(2),(179+86*((X*.31+Y*.95)*.74-Z*.68)).toFixed(2)].join(',')
}
function line(count:number,point:(i:number)=>string){return Array.from({length:count+1},(_,i)=>point(i/count)).join(' ')}
export default function Stack(){return <svg viewBox="0 0 500 360" role="img" aria-label="Animated luminous three-dimensional wireframe knot"><defs><linearGradient id="wire" x1="0" y1="1" x2=".85" y2="0"><stop stopColor="#5966ff"/><stop offset=".4" stopColor="#68b9f7"/><stop offset=".72" stopColor="#44ebbd"/><stop offset="1" stopColor="#c6ffb5"/></linearGradient><radialGradient id="bloom"><stop stopColor="#1d8e86" stopOpacity=".35"/><stop offset="1" stopColor="#163131" stopOpacity="0"/></radialGradient></defs><ellipse cx="250" cy="185" rx="220" ry="153" fill="url(#bloom)"/><g className="knot" stroke="url(#wire)" fill="none"><g strokeWidth="1.15">{Array.from({length:120},(_,i)=><polyline key={i} points={line(20,u=>project(i*Math.PI/60,u*Math.PI*2))}/>)}</g><g strokeWidth=".68">{Array.from({length:12},(_,i)=><polyline key={i} points={line(180,u=>project(u*Math.PI*2,i*Math.PI/6))}/>)}</g></g></svg>}
