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

    step(ctx, canvas) {
        this.update(canvas)
        this.draw(ctx)
    }

    update(canvas) {
        this.position.y += this.position.speed
        this.position.rotate = (this.position.rotate + 5)
        
        // For memory managment, we don't delete this object when it's offscreen
        // but rather reset it's position to fall again from the top
        // In browser games, memory managment is a huge issue,
        //  as garbage collection will always cause a gap in the visual animations.
        if (this.position.y > canvas.height + this.size) {
            this.position.y = 0 - this.size
        }
    }

    draw(ctx) {
        ctx.save()
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
        // Make background squares rotate in a circle
        //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations
        let tranX = this.position.x + 0.5 * this.size
        let tranY = this.position.y + 0.5 * this.size
        ctx.translate(tranX, tranY)
        ctx.rotate((Math.PI / 180) * this.position.rotate)
        ctx.translate(-tranX, -tranY)
        ////////////////////
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
        ctx.restore()
    }
}