export default class BackgroundDrops {
    constructor(canvas) {
        this.size = Math.floor(Math.random() * 8) + 1
        this.position = {
            x: Math.random() * canvas.width,
            y: 0 - 50 - Math.random() * canvas.height,
            speed: this.size * 0.1,
            rotate: 0
        }
        this.color = {
            r: (Math.random() * 255)+100,
            g: (Math.random() * 255)+100,
            b: (Math.random() * 255)+100
        }
        
    }

    step(ctx) {
        this.update()
        this.draw(ctx)
    }

    update() {
        this.position.y += this.position.speed
        this.position.rotate = (this.position.rotate + 5) % 360
    }

    draw(ctx) {
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
        ctx.rotate(this.position.rotate * Math.Pi / 180)
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }
}