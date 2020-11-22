import Player from '../objects/Player.js'
import Drop from '../objects/Drop.js'
import BG from '../objects/Background-Drops.js'

export default class Stage1 {
    constructor(canvas) {
        this.player = new Player(canvas)
        this.drops = []
        this.bgDrops = []
        this.gameFrame = 0
        this.score = { 
            value: 0, 
            textColor: 'black', 
            font: '50px Georgia',
            smallFont: '20px Georgia'
        }
        this.BUBBLERATE = 25 // lower number means more bubbles spawn
        this.BG_SPAWNRATE = 2
    }

    // Each Element Updates and Draws itself.  Collisions and interactions checked and fulfilled here
    step(canvas, ctx, mouse) {

        this.gameFrame += 1

        // Spawn a bubble every so often.  Lower BubbleRate means more bubbles
        if (this.gameFrame % this.BUBBLERATE == 0) {
            this.drops.push(new Drop(canvas))
        }

        // Spawn Background Drops
        if (this.gameFrame % this.BG_SPAWNRATE == 0) {
            this.bgDrops.push(new BG(canvas))
        }

        // This number is close to 8 bits of data.  Don't want the number to grow infinitly so cutting it off here.
        if (this.gameFrame >= 11111100) this.gameFrame = 0 

        // Delete drop if offscreen.  Otherwise, draw and update
        for (let indx in this.bgDrops) {
            let drop = this.bgDrops[indx]
            if (drop.position.y > canvas.height + 50) {
                this.clearBGDrop(indx)
            }
            if (drop) drop.step(ctx)
        }
    
        // Handle all Drops
        for (let i in this.drops) {

            // Check if Drop has gone beyond the canvas, if so delete it
            if (this.drops[i].y > canvas.height + this.drops[i].radius) {
                this.clearDrop(i)
                if (this.score.value > 0) this.score.value -= 1
                else this.score.value = 0  
            }

            // Check Player and Drop Collision
            if (this.drops[i].checkCollision(this.player)) {
                this.drops[i].sound.play()
                this.player.totalColorCount++
                this.player.mixColor(this.drops[i].getColor())
                this.clearDrop(i)
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
        let rgb = 'RGB: ' + Math.floor(this.player.color.r) + ' ' + 
            Math.floor(this.player.color.g) + ' ' + Math.floor(this.player.color.b)
        ctx.fillText(rgb, 10, 75)
    }

    clearDrop(indx) {
        this.drops.splice(indx, 1)
    }

    clearBGDrop(indx) {
        this.bgDrops.splice(indx, 1)
    }
}
