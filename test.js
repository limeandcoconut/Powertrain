import Powertrain from './index.js';

var expect = require('chai').expect;

/* eslint-disable no-undef */
describe('Powertrain class', function() {

    describe('Creating Class', function() {

        it('should throw if constructed with no core', function() {
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain();
            }).to.throw(TypeError);
        });

        it('should throw if constructed with incorrect core values', function() {
            let core = {
                playSpeed: 1,
                fps: 60,
                update: () => {
                },
                render: () => {
                },
            };

            core.playSpeed = '1';
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core);
            }).to.throw(TypeError);
            core.playSpeed = 1;

            core.update = 'function';
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core);
            }).to.throw(TypeError);
            core.update = () => {};

            core.fps = '60';
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core);
            }).to.throw(TypeError);

            core.fps = 0;
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core);
            }).to.throw(RangeError);
            core.fps = 60;

            core.render = 'function';
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core);
            }).to.throw(TypeError);
        });

        describe('On the subject of running the engine, it ', function() {
            let engine;
            let updates = 0;
            let lastUpdates;

            before(function() {
                engine = new Powertrain({
                    playSpeed: 1,
                    fps: 60,
                    update: () => {
                        updates++;
                    },
                    render: () => {
                        if (console) {
                            if (updates % 5 === 0) {
                                // console.log('.');
                                // console.log(updates, engine.frameCount, engine.fps);
                            }
                        }
                    },
                });
            });

            it('should reflect core object after start', function() {
                let testPowertrain = new Powertrain({
                    playSpeed: 1,
                    fps: 60,
                    update: () => {
                        updates++;
                    },
                    render: () => {
                    },
                });
                testPowertrain.start();
                testPowertrain.stop();
                expect(testPowertrain.playSpeed).to.equal(1);
                expect(typeof testPowertrain.update).to.equal('function');
                expect(typeof testPowertrain.render).to.equal('function');
            });

            it('should update', function(done) {
                setTimeout(() => {
                    engine.stop();
                    expect(updates > 0).to.equal(true);
                    done();
                    lastUpdates = updates;
                }, 1100);

                engine.start();
            });

            it('should stop', function(done) {
                setTimeout(() => {
                    expect(lastUpdates).to.equal(updates);
                    done();
                }, 200);
            });

        });
    });
});
