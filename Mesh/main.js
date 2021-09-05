const mesh = {
  g0: [
    [10, 10, 12, 13, 10, 15],
    [10, 10, 7, 13, 10, 15],
    [6, 17, 7, 13, 10, 15],
    [6, 20, 6, 17, 9, 19],
    [6, 17, 10, 15, 9, 19],
    [7, 22, 6, 20, 9, 19],
    [7, 22, 9, 26, 11, 22],
    [7, 22, 11, 22, 9, 19],
    [12, 17, 11, 22, 9, 19],
    [9, 19, 10, 15, 12, 17],
    [12, 13, 10, 15, 12, 17]
  ],

  g1: [
    [11, 4, 10, 10, 9, 10],
    [9, 11, 10, 11, 10, 13],
    [10, 10, 9, 10, 8, 12],
    [10, 10, 9, 11, 12, 12]
  ],

  g2: [
    [0, 9, 4, 4, 6, 6],
    [0, 9, 6, 6, 5, 10],
    [5, 10, 6, 6, 8, 8],
    [4, 4, 5, 3, 6, 6],
    [5, 3, 9, 2, 6, 6],
    [9, 2, 10, 5, 6, 6],
    [10, 5, 8, 8, 6, 6],
    [11, 7, 8, 8, 10, 5]
  ],

  g3: [
    [7, 0, 12, 2, 12, 0],
    [7, 0, 10, 5, 12, 2],
    [12, 2, 10, 5, 14, 4],
    [11, 7, 10, 5, 14, 4],
    [12, 0, 14, 1, 12, 2],
    [14, 1, 12, 2, 14, 4],
    [14, 4, 14, 1, 18, 3],
    [14, 4, 18, 3, 16, 6],
    [18, 9, 18, 3, 16, 6],
    [18, 9, 14, 9, 16, 6],
    [16, 6, 14, 9, 12, 8],
    [12, 8, 16, 6, 14, 4],
    [12, 8, 14, 4, 11, 7]
  ]
}

const colorSets = {
  red0: [
    'LightSalmon',
    'DarkSalmon',
    'Salmon',
    'LightCoral',
    'IndianRed'
  ],
  red1: [
    'SandyBrown',
    'Coral',
    'Tomato',
    'OrangeRed',
    'Crimson'
  ],
  green0: [
    'MediumSeaGreen',
    'SeaGreen',
    'ForestGreen',
    'Green',
    'DarkGreen'
  ],
  green1: [
    'Khaki',
    'YellowGreen',
    'OliveDrab',
    'Olive',
    'DarkOliveGreen'
  ]
}

const canvas = document.getElementById("canvas_01")

const ctx = canvas.getContext("2d")

function drawTriangle(
  points,
  fillColor = 'gray',
  strokeColor = 'white'
){
  ctx.beginPath()
  ctx.moveTo(points[0],points[1])
  ctx.lineTo(points[2],points[3])
  ctx.lineTo(points[4],points[5])
  ctx.closePath()
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  ctx.stroke()
  ctx.fill()
}

function drawColorSets(size=10){
  Object.keys(colorSets).map(
    (cset,ida)=>{
      colorSets[cset].map((clor,idb)=>{
        ctx.fillStyle = clor
        ctx.fillRect(ida*size,idb*size,size,size)
      })
    }
  )
}

function buildTest(){
  let tr = []
  mesh.g0[0].map(v=>{
    tr.push(v*10)
  })
  drawTriangle(tr,
  colorSets.red1[2],
  colorSets.green1[2])
}

function build(size=10){

  let all = []
  
  Object.keys(mesh).map( group => {
    
    mesh[group].map( (fce,id) =>{
      let tri = {
        face: [],
        fill: '',
        stroke: ''
      }
      
      fce.map( coord => {
        tri.face.push([])
        
        tri.face[tri.face.length-1].push(coord*size)
      })
      
      let idf=Math.round(Math.random()*4)
      let ids=Math.round(Math.random()*4)
      
      if(group === "g0"){
        tri.fill=colorSets.red1[idf]
        tri.stroke= colorSets.red0[ids]
      }else{
        tri.fill=colorSets.green0[idf]
        tri.stroke=colorSets.green1[ids]
      }
      all.push(tri)
    })
    
  })
  return all
}

let scale = 18
let triangles = build(scale)

window.onclick = ()=>{
  triangles = build(scale)
}

function show(){
  triangles.map( tr=>{
    drawTriangle(tr.face,tr.fill,tr.stroke)
  })
}

function draw(){
  ctx.fillStyle = 'white'
  ctx.fillRect(0,0,350,500)
  
  drawColorSets(15)
  
  show()
  requestAnimationFrame(draw)
}
draw()
