import Powertrain from './dist/index.js'

const {expect} = require('chai')

describe('Powertrain class', () => {

    describe('Creating Class', () => {

        it('should construct properly without options', () => {
            expect(() => {
                // eslint-disable-next-line no-new
                new Powertrain()
            }).to.not.throw(TypeError)
            expect(typeof new Powertrain()).to.equal('object')
        })


        describe('On the subject of running the engine, it ', () => {

            it('should reflect options object', () => {
                const powertrain = new Powertrain({
                    playSpeed: 1,
                    fps: 60,
                    update: () => {
                        updates++
                    },
                    render: () => {
                    },
                })
                expect(powertrain.playSpeed).to.equal(1)
                expect(typeof powertrain.update).to.equal('function')
                expect(typeof powertrain.render).to.equal('function')
            })

            it('should update', async () => {
                let updates = 0
                const powertrain = new Powertrain({update: () => updates++})

                powertrain.start()

                await new Promise(resolve => setTimeout(() => {
                    powertrain.stop()
                    expect(updates > 0).to.equal(true)
                    resolve()
                }, 1100))
            })

            it('should keep proper fps and stop', async () => {
                let updates = 0
                const powertrain = new Powertrain({update: () => updates++})

                powertrain.start()

                await new Promise(resolve => setTimeout(() => {
                    powertrain.stop()
                    expect(updates).to.equal(59)
                    resolve()
                }, 1000))

                await new Promise(resolve => setTimeout(() => {
                    expect(updates).to.equal(59)
                    resolve()
                }, 100))
            })

        })
    })
})
