import Powertrain from './source/index.js'

var expect = require('chai').expect

/* eslint-disable no-undef */
describe('Powertrain class', function() {

    describe('Creating Class', function() {

        it('should construct properly without config', function() {
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain()
            }).to.not.throw(TypeError)
            let instanceTest = new Powertrain()
            expect(typeof instanceTest).to.equal('object')
        })

        it('should throw if constructed with incorrect core values', function() {
            let core = {
                playSpeed: 1,
                fps: 60,
                update: () => {
                },
                render: () => {
                },
            }

            core.playSpeed = '1'
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core)
            }).to.throw(TypeError)
            core.playSpeed = 1

            core.update = 'function'
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core)
            }).to.throw(TypeError)
            core.update = () => {}

            core.fps = '60'
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core)
            }).to.throw(TypeError)

            core.fps = 0
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core)
            }).to.throw(RangeError)
            core.fps = 60

            core.render = 'function'
            expect(() => {
                /* eslint-disable no-new */
                new Powertrain(core)
            }).to.throw(TypeError)
        })

        describe('On the subject of running the engine, it ', function() {
            let engine
            let updates = 0
            let lastUpdates

            before(function() {
                engine = new Powertrain({
                    playSpeed: 1,
                    fps: 60,
                    update: () => {
                        updates++
                    },
                    render: () => {
                    },
                })
            })

            it('should reflect core object', function() {
                let testPowertrain = new Powertrain({
                    playSpeed: 1,
                    fps: 60,
                    update: () => {
                        updates++
                    },
                    render: () => {
                    },
                })
                expect(testPowertrain.playSpeed).to.equal(1)
                expect(typeof testPowertrain.update).to.equal('function')
                expect(typeof testPowertrain.render).to.equal('function')
            })

            it('should update', function(done) {
                setTimeout(() => {
                    engine.stop()
                    expect(updates > 0).to.equal(true)
                    lastUpdates = updates
                    done()
                }, 1100)

                engine.start()
            })

            it('should keep proper fps', function(done) {
                setTimeout(() => {
                    engine.stop()
                    expect(updates).to.equal(61)
                    lastUpdates = updates
                    done()
                }, 1000)

                updates = 0
                engine.start()
            })

            it('should stop', function(done) {
                setTimeout(() => {
                    expect(lastUpdates).to.equal(updates)
                    done()
                }, 200)
            })

        })
    })
})
