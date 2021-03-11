import { performance } from 'perf_hooks'
import raf from 'raf'

/**
 * A module for creating a game loop.
 * @module Powertrain
 */

/**
 * Class for creating a game loop.
 */
export default class {

  /**
   * @param {object}    core    An optional configuration object containing some presets and the update and
   *                              render functions.
   */
  /**
   * @constructor
   * @param {number} [obj.playSpeed=1] A scalar for the speed of play.
   * @param {number} [obj.fps=60] The target fraes per second. This is the
   *                              number of updates per second that should
   *                              occur. Not the number of renders.
   * @param {function} [obj.update=()=>{}] The function to update game logic.
   * @param {function} [obj.render=()=>{}] The function to render the game.
   *                                       Accepts a scalar representing
   *                                       progress towards next frame. Can be
   *                                       used for interpolation.
   */
  constructor ({
    playSpeed = 1,
    fps = 60,
    update = () => {},
    render = () => {},
  } = {}) {

    this.currentTime = 0
    this.lastTime = 0
    // Accumulator for passing time since update
    this.dt = 0
    // Scales the speed of play
    this.playSpeed = playSpeed
    // The number of miliseconds between updates
    this.frameStep = (playSpeed / fps) * 1_000
    this.update = update
    this.render = render
  }

    /**
     * Starts update loop and sets running flag to true and calls for a raf.
     * @function start
     */
    start = () => {
      this.running = true
      this.lastTime = performance.now()

      raf(this.tick)
    }

    /**
     * Sets running flag to false. This will stop the loop.
     * @function stop
     */
    stop = () => {
      this.running = false
    }

    /**
    * Calls update method at specified time and fills in with renders when
    * possible. Registers itself for call with requestAnimationFrame.
    * @function tick
    */
    tick = () => {
      if (!this.running) {
        return
      }

      this.currentTime = performance.now()
      // Add the time since the last frame to the accumulator. Clamp at 1s.
      this.dt += Math.min(1_000, (this.currentTime - this.lastTime))
      // If it's time for at least one update, run until the time is consumed
      while (this.dt > this.frameStep) {
        this.dt -= this.frameStep
        this.update(this.frameStep)
      }

      // Render as often as possible
      // Pass in the remainder of the accumulator. Can be used to interpolate
      // between frames if desired.
      this.render(this.dt / this.frameStep)
      this.lastTime = this.currentTime

      // Request new frame
      raf(this.tick)
    }
}
