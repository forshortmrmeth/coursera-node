'use strict';


(function () {
    var FLAKES_COUNT = 300;

    function SnowFlake(width, height) {
        this.color = '#D4C9ED';
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
        this.r = 0;
        this.reset(width, height);
    }

    SnowFlake.prototype.reset = function (width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = Math.random() * 2;
        this.vx = .5 - Math.random();
        this.r = 1 + Math.random() * 2;
        this.opacity = .5 + Math.random() * .5;
    };

    SnowFlake.prototype.draw = function (ctx) {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    };

    document.addEventListener('DOMContentLoaded', () => {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var width = window.innerWidth;
        var height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        var snowflakes = new Array(FLAKES_COUNT);
        for (var i = 0; i < FLAKES_COUNT; i++) {
            snowflakes[i] = new SnowFlake(width, height);
        }

        function update() {
            ctx.clearRect(0, 0, width, height);

            for (i = 0; i < FLAKES_COUNT; i++) {
                var snowflake = snowflakes[ i ];
                snowflake.y += snowflake.vy;
                snowflake.x += snowflake.vx;

                snowflake.draw(ctx);

                if (snowflake.y > height) {
                    snowflake.reset(width, height);
                }
            }

            requestAnimationFrame(update);
        }

        update();
    })
})();
