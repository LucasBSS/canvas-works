const canvas = document.getElementById("canvas1")

const img = document.createElement("img")
img.src = "mice2.png"

const im2 = document.createElement("img")
im2.src = "im2.png"

const im3 = document.createElement("img")
im3.src = "chees.png"

function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resize()

const ctx = canvas.getContext("2d")

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,

  a: canvas.width / 2,
  b: canvas.width / 2
}

let ang = 0
let lng = 0

window.onresize = () => resize()

canvas.onmousemove = (evt) => {

  mouse.x = evt.clientX
  mouse.y = evt.clientY

  lng = ang
  ang = Math.atan2(
    mouse.y - mouse.b,
    mouse.x - mouse.a
  )
}

function move(spd = 1, g = 0.1) {

  if(lng !== ang) {

    lng < ang ? lng += g : lng -= g

    let u = 0

    ang < lng ? u = lng - ang : u = ang - lng

    if(u < g) {
      lng = ang
    }
  }

  if(mouse.a !== mouse.x) {
    mouse.a < mouse.x ? mouse.a += spd : mouse.a -= spd
  }

  if(mouse.b !== mouse.y) {
    mouse.b < mouse.y ? mouse.b += spd : mouse.b -= spd
  }
}

function show(sz = 3, x = 24, y = 12) {

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(im2, mouse.x, mouse.y, 16, 16)

  ctx.drawImage(im3, canvas.width / 2 - 15, canvas.height / 3 - 15, 32, 32)

  ctx.save()

  ctx.translate(mouse.a, mouse.b)
  ctx.rotate(lng)
  
  ctx.drawImage(img, -sz * x / 2, -sz * y / 2, sz * x, sz * y)
  
  ctx.restore()
}

function draw() {

    ctx.fillStyle = 'antiquewhite'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    move()

    show()

    requestAnimationFrame(draw)
}

draw()