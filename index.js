import timestamp from 'microtime-x';
import raf from 'raf';

export default class Powertrain {
    constructor(core) {
        if (typeof core !== 'object') {
            throw new TypeError('Configuration object required');
        }

        let expected = {
            playSpeed: 'number',
            fps: 'number',
            update: 'function',
            render: 'function',
        };

        this.core = core;

        Object.keys(core).forEach((key) => {
            if (expected.hasOwnProperty(key) && typeof core[key] !== expected[key]) {
                throw new TypeError(`"${key}" must be of type "${expected[key]}""`);
            }
        });

        if (typeof core.fps !== 'undefined' && core.fps <= 0) {
            throw new RangeError('"fps" option must be greater than 0');
        }

        this.currentTimestamp = 0;
        this.dt = 0;
        this.lastTimestamp = timestamp();
        this.playSpeed = this.core.playSpeed || 1;
        this.frameStep = this.playSpeed / (this.core.fps || 60);
        this.update = this.core.update || (() => {});
        this.render = this.core.render || (() => {});

        // TODO test fps
        this.frameCount = 0;
        this.frameTime = 0;
        this.fps = 0;
    }

    start() {
        this.running = true;

        raf(() => {
            this.tick();
        });
    }

    stop() {
        this.running = false;
    }

    tick() {
        if (!this.running) {
            return;
        }

        this.currentTimestamp = timestamp();
        this.frameTime += (this.currentTimestamp - this.lastTimestamp);

        if (this.frameTime >= 1000) {
            this.frameTime -= 1000;
            this.fps = this.frameCount;
            this.frameCount = 0;
        }

        this.dt += Math.min(1, (this.currentTimestamp - this.lastTimestamp) / 1000);
        while (this.dt > this.frameStep) {
            this.dt -= this.frameStep;
            this.core.update(this.frameStep);
            this.frameCount++;
        }

        this.core.render(this.dt / this.playspeed, this.fps);
        this.lastTimestamp = this.currentTimestamp;

        raf(() => {
            this.tick();
        });
    }
}
