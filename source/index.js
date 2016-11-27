import timestamp from 'microtime-x';
import raf from 'raf';

export default class Powertrain {
    constructor(core) {
        if (typeof core !== 'undefined') {
            if (typeof core !== 'object') {
                throw new TypeError('Configuration object required');
            }

            let expected = {
                playSpeed: 'number',
                fps: 'number',
                update: 'function',
                render: 'function',
            };

            Object.keys(core).forEach((key) => {
                if (expected.hasOwnProperty(key) && typeof core[key] !== expected[key]) {
                    throw new TypeError(`"${key}" must be of type "${expected[key]}""`);
                }
            });

            if (typeof core.fps !== 'undefined' && core.fps <= 0) {
                throw new RangeError('"fps" option must be greater than 0');
            }
        } else {
            core = {};
        }

        this.currentTimestamp = 0;
        this.dt = 0;
        this.lastTimestamp = timestamp();
        this.playSpeed = core.playSpeed || 1;
        this.frameStep = this.playSpeed / (core.fps || 60);
        this.update = core.update || (() => {});
        this.render = core.render || (() => {});

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
            this.update(this.frameStep);
            this.frameCount++;
        }

        this.render(this.dt / this.playspeed, this.fps);
        this.lastTimestamp = this.currentTimestamp;

        raf(() => {
            this.tick();
        });
    }
}
