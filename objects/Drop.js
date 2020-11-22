


export default class Drop {
    constructor(canvas) {
        // Can spawn on X position between 5% and 95% of the canvas width
        this.x = (Math.random() * (canvas.width * 0.90)) + (canvas.width * 0.05)
        this.y = 0 -  100 - Math.random() * canvas.height
        this.radius = 25
        this.speed = Math.random() * 4 + 1
        this.distance
        this.sound = document.createElement('audio')
        this.sound.src = '../assets/sounds/Big-Water-Bloop-C2-fesliyanstudios-dot-com.mp3'
        this.sound.volume = 0.25
        this.color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255
        }
    }

    // Reset and randomize properties
    randomize(canvas) {
        this.y = 0 - 100 - Math.random() * canvas.height
        this.speed = Math.random() * 4 + 1
        this.color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255
        }
    }

    step(ctx) {
        this.update()
        this.draw(ctx)
    }

    update() {
        this.y += this.speed
    }

    checkCollision(obj) {
        const dx = this.x - obj.position.x
        const dy = this.y - obj.position.y
        const distance = Math.sqrt(dx*dx + dy*dy)
        if (distance < this.radius + obj.radius) return true
        else return false
    }

    getColor() {
        return this.color
    }


    draw(ctx) {
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
    }
}