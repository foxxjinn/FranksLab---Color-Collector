// Player
export default class Player {
    constructor(canvas) {
        this.position = {
            x: canvas.width/2,
            y: canvas.height/2,
        }
        this.radius = 50
        this.color = {
            r: 245,
            g: 245,
            b: 245,
        }
        this.colorAdded = {
            r: 245,
            g: 245,
            b: 245
        },
        this.totalColorCount = 1 // total drops collected
        let sprite = new Image()
        sprite.src = '../assets/images/beaker2.png'
        this.sprite = sprite
        this.doublePoints = false // When Black, get double points and slowly change back to White
    }

    step(ctx, mouse){
        this.update(mouse)
        this.draw(ctx, mouse)
    }

    update(mouse) {

        // Mouse input movment
        const dx = this.position.x - mouse.x 
        const dy = this.position.y - mouse.y
        if (mouse.x != this.x) {
            this.position.x -= dx / 30
        }
        if (mouse.y != this.y) {
            this.position.y -= dy / 30
        }

        this.mixColorFrameAnimation()
    }

    mixColor(color) {
        // Mixes the new drop with the old drops.  Minus totalColorCount makes sure it gets closer to black
        this.colorAdded.r = ((this.colorAdded.r + color.r) / 2) - (this.totalColorCount)
        this.colorAdded.g = ((this.colorAdded.g + color.g) / 2) - (this.totalColorCount)
        this.colorAdded.b = ((this.colorAdded.b + color.b) / 2) - (this.totalColorCount)   
    }

    mixColorFrameAnimation() {
        // We don't want colorAdded to go negative
        if (this.colorAdded.r < 0) this.colorAdded.r = 0
        if (this.colorAdded.g < 0) this.colorAdded.g = 0
        if (this.colorAdded.b < 0) this.colorAdded.b = 0

        // Animation: This slowly mixes the color with colorAdded each frame until they are equal
        if (Math.floor(this.color.r) > Math.floor(this.colorAdded.r)) {
            this.color.r -= (this.colorAdded.r * (this.totalColorCount * 0.02))
        }
        if (Math.floor(this.color.g) > Math.floor(this.colorAdded.g)) {
            this.color.g -= (this.colorAdded.g * (this.totalColorCount * 0.02))
        }
        if (Math.floor(this.color.b) > Math.floor(this.colorAdded.b)) {
            this.color.b -= (this.colorAdded.b * (this.totalColorCount * 0.02))
        }

        // Boundaries to make sure everything stays within 255 and 0,
        // also includes a cap to bump 0 because 10 to 0 takes too long.
        if (this.color.r > 245) this.color.r = 245
        if (this.color.g > 245) this.color.g = 245
        if (this.color.b > 245) this.color.b = 245
        if (this.color.r < 10) this.color.r = 0
        if (this.color.g < 10) this.color.g = 0
        if (this.color.b < 10) this.color.b = 0
    }

    draw(ctx, mouse) {
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
        ctx.fillRect(this.position.x - 40, this.position.y - 20, 70, 65)
        ctx.drawImage(this.sprite, this.position.x - 50, this.position.y - 60)
    }
}