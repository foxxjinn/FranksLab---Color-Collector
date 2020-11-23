import Player from '../objects/Player.js'
import Drop from '../objects/Drop.js'
import BG from '../objects/Background-Drops.js'

export default class Stage1 {
    constructor(canvas) {
        this.player = new Player(canvas)
        this.drops = []
        for (let i = 0; i < 10; i++) {
            this.drops.push(new Drop(canvas))
        }
        this.bgDrops = []
        for (let i = 0; i < 250; i++) {
            this.bgDrops.push(new BG(canvas))
        }
        this.score = { 
            value: 0, 
            textColor: 'black', 
            font: '50px Georgia',
            smallFont: '20px Georgia'
        }
    }

    // Each Element Updates and Draws itself.  Collisions and interactions checked and fulfilled here
    step(canvas, ctx, mouse) {

        // Spawn Background Drops
        for (let bg of this.bgDrops) {
            if (bg.position.y > canvas.height + bg.size) {
                bg.position.y = 0 - bg.size
            }
        }

        // Reset drops if offscrene.  Otherwise, draw and update
        for (let indx in this.bgDrops) {
            let drop = this.bgDrops[indx]
            if (drop.position.y > canvas.height + 50) {
                drop.position.y = 0 - drop.size
            }
            drop.step(ctx)
        }
    
        // Handle all Drops
        for (let i in this.drops) {

            // Check if Drop has gone beyond the canvas, if so delete it
            if (this.drops[i].y > canvas.height + this.drops[i].radius) {
                this.drops[i].randomize(canvas)
                if (this.score.value > 0) this.score.value -= 1
            }

            // Check Player and Drop Collision
            if (this.drops[i].checkCollision(this.player)) {
                this.drops[i].sound.play()
                this.player.totalColorCount++
                this.player.mixColor(this.drops[i].getColor())
                this.drops[i].randomize(canvas)
                this.score.value+=1
            }

            // Update and Draw drops
            if (this.drops[i]) {
                this.drops[i].step(ctx)
            }
        }

        // Update and Draw Player
        this.player.step(ctx, mouse)

        // Draw Score
        ctx.font = this.score.font
        ctx.fillStyle = this.score.textColor
        ctx.fillText('score: ' + this.score.value , 10 , 50)
        ctx.font = this.score.smallFont
        // let rgb = 'RGB: ' + Math.floor(this.player.color.r) + ' ' + 
        //     Math.floor(this.player.color.g) + ' ' + Math.floor(this.player.color.b)
        // ctx.fillText(rgb, 10, 75)
    }

}
