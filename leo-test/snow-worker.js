function SnowFlake(canvasWidth, canvasHeight) {
    this.color = '#D4C9ED';
    this.init(canvasWidth, canvasHeight);
}

SnowFlake.prototype.init = function (canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * -canvasHeight;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.R = 1 + Math.random() * 2;
    this.opacity = .5 + Math.random() * .5;
};

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

self.onmessage = message => {
    const data = message.data;
    const COUNT = data.count;
    const width = data.width;
    const height = data.height;
    const snowFlakes = new Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        snowFlakes[ i ] = new SnowFlake(width, height, 50);
    }

    self.postMessage({
        snowFlakes: snowFlakes
    });
};