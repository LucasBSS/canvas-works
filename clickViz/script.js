const canvas = document.getElementById("canvs")
const ctx = canvas.getContext("2d")

let zero =[canvas.width/2,canvas.height/2]

function resize(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  zero = [canvas.width/2,canvas.height/2]

}

resize()

const tri = (
  points,
  fillColor,
  strokeColor
)=>{
  ctx.beginPath()
  ctx.moveTo(points[0],points[1])
  ctx.lineTo(points[2],points[3])
  ctx.lineTo(points[4],points[5])
  
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}
const line = (points,strokeColor)=>{
  ctx.beginPath()
  ctx.moveTo(points[0],points[1])
  ctx.lineTo(points[2],points[3])
  ctx.strokeStyle = strokeColor
  ctx.stroke()
}
const circle = (
  point,
  r,
  fillColor,
  strokeColor
)=> {
  ctx.beginPath()
  ctx.arc(point[0],point[1],r,0,2*Math.PI)
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  
  ctx.fill()
  ctx.stroke()
}

let _mx=0
let _my=0
let _lx=0
let _ly=0

function show(){

  //x axys
  line([0,canvas.height/2, 
  canvas.width,canvas.height/2],"red")
  
  //y axys
  line([canvas.width/2,0, canvas.width/2,canvas.height],"red")
  
  //line lastClick-currentClick
  line([_lx,_ly,_mx,_my],"salmon")
  //line ZERO-currentClick
  line([...zero,_mx,_my],"lightseagreen")
  
  line([0,_my,canvas.width,_my],"white")
  line([_mx,0,_mx,canvas.height],"white")
  //circle lastClick
  circle([_lx,_ly],5,"yellow","red")
  //circle currentClick
  circle([_mx,_my],5,"cyan","magenta")
  
}

function draw(){
  ctx.fillStyle = "silver"
  ctx.fillRect(0,0,canvas.width,canvas.height)
  
  show()
  
  requestAnimationFrame(draw)
}
draw()

window.onresize = ()=> resize()

window.onmousedown = (ev)=>{
  _lx = _mx
  _ly = _my
  _mx = ev.x
  _my = ev.y
}
