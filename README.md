# Powertrain

A lightweight es6 game loop written to prioritize updates and fill in with extra renders.
Updates will be called as accurately as possible while render operations will happen as often as possible. If, for some reason, lag has caused more than enough time more than one update to occur they will be called sequentially until caught up and a render operation will be placed at then end of the operations.
Testing and dev are done with babel in es6.

```js
let Engine = require('powertrain');

let config = {
    playspeed: 1,       // optional, default = 1
    fps: 60,            // optional, default = 60
    update: () => {},   // optional, default
    render: () => {},   // optional, default    
};

let engine = new Engine(config);
engine.start();
engine.stop();
```

## Usage

[![NPM](https://nodei.co/npm/powertrain.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/powertrain/)

#### `engine = new Engine(config)`

Creates a new instance of class Engine with optional dependencies set by config object. The update function will called be as accurately as possible. The render function will be called as often as possible so long as there updates are happening on schedule.
Playspeed is a convenient way to scale timing.
FPS controls base timing.

#### `engine.start()`

Starts the render loop.

#### `engine.stop()`

Stops the render loop.

## TODO:
- [x] Add test for correct number of ticks per second

## License

MIT, see [LICENSE.md](http://github.com/limeandcoconut/powertrain/blob/master/LICENSE.md) for details.
