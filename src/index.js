import  {performance}  from 'perf_hooks'
import raf  from'raf'

/**
 * A module for creating a game loop.
 * @module Powertrain
 */

/**
 * Class for creating a game loop.
 */
 // * @class Powertrain
export default class  {

    /**
     * @constructor
     * @param   {object}    core    An optional configuration object containing some presets and the update and
     *                              render functions.
     * @throws  {TypeError}         Throws if core is provided but not object.
     * @throws  {TypeError}         Throws if config options are provided but not correct type.
     * @throws  {RangeError}        Throws if fps option is provided but not greater than zero.
     */
    constructor({
        playSpeed = 1,
        fps = 60,
        update = (() => {}),
        render = (() => {}),
    } = {}) {

        this.currentTime = 0
        this.dt = 0
        this.lastTime = performance.now()
        this.playSpeed = playSpeed
        this.frameStep = (playSpeed / fps) * 1_000
        this.update = update
        this.render = render

        this.frameCount = 0
        this.frameTime = 0
        this.fps = 0

        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.tick = this.tick.bind(this)
    }

    /**
     * Starts update loop and sets running flag to true.
     */
    start = () => {
        this.running = true

        raf(this.tick)
    }

    /**
    * Sets running flag to false. This will stop the loop
    */
    stop = () => {
        this.running = false
    }

    /**
    * Calls update method at specified time and fills in with renders when possible. Registers itself for call with
    * requestAnimationFrame.
    */
    tick = () => {
        if (!this.running) {
            return
        }

        this.currentTime = performance.now()
        this.frameTime += this.currentTime - this.lastTime

        // TODO: Move to wrapper around update function to save exectuion
        if (this.frameTime >= 1_000) {
            this.frameTime -= 1_000
            this.fps = this.frameCount
            this.frameCount = 0
        }

        this.dt += Math.min(1_000, (this.currentTime - this.lastTime) )
        console.log(this.currentTime)
        console.log(this.lastTime)
        console.log(this.dt)
        console.log(this.frameStep)
        while (this.dt > this.frameStep) {
            console.log('run')
            this.dt -= this.frameStep
            this.update(this.frameStep)
            this.frameCount++
        }

        this.render(this.dt / this.playSpeed, this.fps)
        this.lastTime = this.currentTime

        raf(this.tick)
    }
}
