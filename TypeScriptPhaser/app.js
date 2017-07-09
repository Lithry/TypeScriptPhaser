// https://www.youtube.com/watch?v=T8a8-SO6vP0
var Game;
(function (Game) {
    var TypeScriptPhaser = (function () {
        function TypeScriptPhaser() {
            this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update: this.update
            });
        }
        TypeScriptPhaser.prototype.preload = function () {
            this.game.load.image('Background', 'Assets/Background.jpg');
            this.game.load.image('Platforms', 'Assets/Platform.png');
            this.game.load.image('Star', 'Assets/Star.png');
            this.game.load.spritesheet('dude', 'Assets/dude.png', 32, 48);
        };
        TypeScriptPhaser.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.sprite(-10, -10, 'Background');
            // Player
            this.player = this.game.add.sprite(50, this.game.height / 2, 'Platforms');
            this.game.physics.arcade.enable(this.player);
            this.player.enableBody = true;
            this.player.anchor.setTo(0.5, 0.5);
            this.player.scale.setTo(0.2, 0.2);
            this.player.angle = 90;
            this.player.body.collideWorldBounds = true;
            this.player.body.gravity.y = 0;
            // Enemy
            this.enemy = this.game.add.sprite(this.game.width - 50, this.game.height / 2, 'Platforms');
            this.game.physics.arcade.enable(this.enemy);
            this.enemy.enableBody = true;
            this.enemy.body.immovable = true;
            this.enemy.anchor.setTo(0.5, 0.5);
            this.enemy.scale.setTo(0.2, 0.2);
            this.enemy.angle = 90;
            this.enemy.body.gravity.y = 0;
            // Boll
            this.boll = this.game.add.sprite(600, this.game.height / 2, 'Star');
            this.game.physics.arcade.enable(this.boll);
            this.player.enableBody = true;
            this.player.body.collideWorldBounds = true;
            this.player.body.gravity.y = 0;
            this.boll.body.velocity.x = -175;
            //this.boll.body.velocity.y = 175;
            this.cursors = this.game.input.keyboard.createCursorKeys();
        };
        TypeScriptPhaser.prototype.update = function () {
            this.player.body.velocity.y = 0;
            this.enemy.body.velocity.y = 0;
            //this.boll.y = this.player.y;
            // Player
            if (this.cursors.up.isDown) {
                this.player.body.velocity.y = -250;
            }
            else if (this.cursors.down.isDown) {
                this.player.body.velocity.y = 250;
            }
            // Enemy
            if (this.enemy.y - 10 > this.boll.y) {
                this.enemy.body.velocity.y = -150;
            }
            else if (this.enemy.y + 10 < this.boll.y) {
                this.enemy.body.velocity.y = 150;
            }
            // Boll
            if (this.boll.y < 20) {
                this.boll.body.velocity.y = 175;
            }
            else if (this.boll.y > this.game.height - 20) {
                this.boll.body.velocity.y = -175;
            }
            if (this.boll.body.touching.right) {
                this.boll.body.velocity.x = -175;
            }
            else if (this.boll.body.touching.left) {
                this.boll.body.velocity.x = 175;
            }
            // collision
            this.game.physics.arcade.collide(this.boll, this.enemy);
            this.game.physics.arcade.collide(this.boll, this.player, this.OnCollision, null, this);
            //this.game.physics.arcade.overlap(this.boll, this.enemy, this.OnCollision, null, this);
        };
        TypeScriptPhaser.prototype.OnCollision = function (boll, player) {
            if (boll.body.velocity.x > 0) {
                boll.body.velocity.x = -175;
            }
            else if (boll.body.velocity.x < 0) {
                boll.body.velocity.x = 175;
            }
        };
        return TypeScriptPhaser;
    }());
    Game.TypeScriptPhaser = TypeScriptPhaser;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.TypeScriptPhaser();
};
//# sourceMappingURL=app.js.map