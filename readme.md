# Powertrain

A lightweight game loop written to prioritize updates and fill in with extra renders.

Updates will be called as accurately as possible while render operations will happen as often as possible. If, for some reason, lag has caused more than enough time for more than one update to occur they will be called sequentially until caught up. A render will always happen afterwards upates are done.

Testing and dev are done with babel.

```js
import Powertrain from 'powertrain'

const engine = new Powertrain({
  playspeed: 1,     // optional, default = 1
  fps: 60,          // optional, default = 60
  update: () => {}, // optional, default = no-op
  render: () => {}, // optional, default = no-op
})

engine.start()
engine.stop()
```

## Usage

[![NPM](https://nodei.co/npm/powertrain.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/powertrain/)

### `constructor()`

|Name           | Type     | Attributes | Default      | Description                     |
|---------------|----------|------------|--------------|---------------------------------|
| obj.playSpeed | number   | <optional> | 1            | A scalar for the speed of play. |
| obj.fps       | number   | <optional> | 60           | The target fraes per second. This is the number of updates per second that should occur. Not the number of renders. |
| obj.update    | function | <optional> | ()=>{}       | The function to update game logic. |
| obj.render    | function | <optional> | (scalar)=>{} | The function to render the game. Accepts a scalar representing progress towards next frame. Can be used for interpolation. |

### `start()`

Starts update loop and sets running flag to true and calls for a requestAnimationFrame (provided by a crossplatform polyfill).

### `stop()`

Sets running flag to false. This will stop the loop.

## TODO:

## Feedback ✉️
It is greatly appreciated! 🎉

[Website 🌐](https://jacobsmith.tech)

[js@jacobsmith.tech](mailto:js@jacobsmith.tech)

[https://github.com/limeandcoconut](https://github.com/limeandcoconut)

[@limeandcoconut 🐦](https://twitter.com/limeandcoconut)

Cheers!

## License

ISC, see [LICENSE.md](/license) for details.
