const canvas = document.getElementById("cv1")
function rsize(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
rsize()
let px=0
let py=0
window.onresize = ()=> rsize()
window.onclick = (e)=> {
  px=e.x
  py=e.y
}
const ctx = canvas.getContext("2d")

class Triangle{
  
  constructor(data){
    this.pts = data
    this.fill = data[6]
    this.id = this.genId()
  }
  
  genId(){
    return "_"+Math.random()
  }
  
  draw(){
    ctx.beginPath()
    
    ctx.moveTo(
      this.pts[0], this.pts[1]
    )
    
    ctx.lineTo(
      this.pts[2], this.pts[3]
    )
    
    ctx.lineTo(
      this.pts[4], this.pts[5]
    )
    
    ctx.closePath()
    
    ctx.fillStyle = this.fill
    ctx.fill()
    
    ctx.strokeStyle = 'white'
    ctx.stroke()
  }
}

function getDis(pts){
  let dis = Math.round(
    Math.sqrt(
      Math.pow((pts[2] - pts[0]), 2) +
      Math.pow((pts[3]- pts[1]), 2)
    )
  )
  return dis
}

const line = (pts,c='black')=>{
  ctx.beginPath()
  ctx.moveTo(pts[0],pts[1])
  ctx.lineTo(pts[2],pts[3])
  ctx.strokeStyle = c 
  ctx.stroke()
}
const circle = (x, y, r, c) => {
  ctx.beginPath()
  ctx.fillStyle = c
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fill()
}

function mark(){
  circle(px,py,40,'rgba(220,220,220,0.5)')
  circle(px,py,5,'magenta')
}

function build(){
  let out = []
  fc.map((it,id)=>{
    let tr = new Triangle(
      [...it]
    )
    let pg = calcG(tr)
    tr.pg = pg
    tr.ra = getRa(tr,pg)
    out.push(tr)
  })
  return out
}

function getRa(tr,pg){
  let _a = getDis([
    tr.pts[0],
    tr.pts[1],
    ...pg
  ]) 
  
  let _b = getDis([
    tr.pts[2],
    tr.pts[3],
    ...pg
  ])
  
  let _c = getDis([
    tr.pts[4],
    tr.pts[5],
    ...pg
  ])
  
  return Math.max(_a,_b,_c)
}

function calcG(tr){
  let pgx = Math.ceil((
    tr.pts[0]+
    tr.pts[2]+
    tr.pts[4])/3) 
    
  let pgy = Math.ceil((
    tr.pts[1]+
    tr.pts[3]+
    tr.pts[5])/3)
  
  return [pgx,pgy]
}

lst = build()

function hit(ca,cb){
  let dis = getDis([...ca.pg,...cb.pg])
  let sra = ca.ra+cb.ra
  //dis = NaN ...why?
  
  let out = false
  if(dis<sra){ out=true }

  return out; 
}

function defaultDraw(){
  
  lst.map((it, id) => {
    
    let ht=hit({pg:[px,py], ra:5},it)
  
    it.hit = ht
    
    if (it.hit) {
      it.fill = 'pink'
      it.hit = false
    }
      
    it.draw()
  })
}

function draw(){
  ctx.clearRect(0,0,
  canvas.width,
  canvas.height)
  ctx.fillStyle = 'silver'
  ctx.fillRect(0,0,
  canvas.width,canvas.height)
  
  defaultDraw()  
  mark()
  requestAnimationFrame(draw)
}
draw()