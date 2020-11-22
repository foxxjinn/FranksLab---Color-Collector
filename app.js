
// Globals
const canvas = document.getElementById('canvas1')
canvas.width = 800
canvas.height = 500
const ctx = canvas.getContext('2d')
ctx.font = '50px Georgia'
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}
let canvasPosition = canvas.getBoundingClientRect()

import Stage1 from './scenes/Stage1.js'  
let scene = new Stage1(canvas)

//////////////

// Global Listeners
canvas.addEventListener('mousedown', (e)=> {
    mouse.click = true
    mouse.x = e.x - canvasPosition.left
    mouse.y = e.y - canvasPosition.top
})

canvas.addEventListener('mouseup', (e) => {
    mouse.click = false
})

let pause = false
document.addEventListener('keypress', (e)=> {
    if (e.code === 'KeyP') {
        pause = !pause
    }
})
//////////////

// Main Loop
function event() {
    if (!pause) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        scene.step(canvas, ctx, mouse)
    }
    requestAnimationFrame(event)
}
event()
//////////////
