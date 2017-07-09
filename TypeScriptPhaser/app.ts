// https://www.youtube.com/watch?v=T8a8-SO6vP0

module Game {
    export class TypeScriptPhaser {
        game: Phaser.Game;
        player;
        enemy;
        boll;
        cursors;

        constructor() {
            this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update: this.update
            });
        }

        preload() {
            this.game.load.image('Background', 'Assets/Background.jpg');
            this.game.load.image('Platforms', 'Assets/Platform.png');
            this.game.load.image('Star', 'Assets/Star.png');
            this.game.load.spritesheet('dude', 'Assets/dude.png', 32, 48);
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.sprite(-10, -10, 'Background');

            // Player
            this.player = this.game.add.sprite(50, this.game.height / 2, 'Platforms');
            this.game.physics.arcade.enable(this.player, true);
            this.player.enableBody = true;
            this.player.body.immovable = true;
            this.player.anchor.setTo(0.5, 0.5);
            this.player.scale.setTo(0.2, 0.2);
            this.player.angle = 90;
            this.player.body.allowGravity = false;
            
            // Enemy
            this.enemy = this.game.add.sprite(this.game.width - 50, this.game.height / 2, 'Platforms');
            this.game.physics.arcade.enable(this.enemy, true);
            this.enemy.enableBody = true;
            this.enemy.body.immovable = true;
            this.enemy.anchor.setTo(0.5, 0.5);
            this.enemy.scale.setTo(0.2, 0.2);
            this.enemy.angle = 90;
            this.enemy.body.allowGravity = false;

            // Boll
            this.boll = this.game.add.sprite(600, this.game.height / 2, 'Star');
            this.game.physics.arcade.enable(this.boll, true);
            this.player.enableBody = true;
            this.player.body.collideWorldBounds = true;
            this.player.body.allowGravity = false;
            this.boll.body.velocity.x = 175;
            this.boll.body.velocity.y = 160;

            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        update() {
            // collision
            this.game.physics.arcade.collide(this.boll, this.enemy, this.OnCollisionBoll, null, this.game);
            this.game.physics.arcade.overlap(this.boll, this.player, this.OnCollisionBoll, null, this.game);

            // Player
            this.player.body.velocity.y = 0;
            if (this.cursors.up.isDown) {
                this.player.body.velocity.y = -250;
            }
            else if (this.cursors.down.isDown) {
                this.player.body.velocity.y = 250;
            }

            // Enemy
            this.enemy.body.velocity.y = 0;
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
        }

        OnCollisionBoll() {
            if (this.boll.body.velocity.x > 0) {
                this.boll.body.velocity.x = -175;
            }
            else if (this.boll.body.velocity.x < 0) {
                this.boll.body.velocity.x = 175;
            }
        }
    }
}

window.onload = () => {
    var game = new Game.TypeScriptPhaser();
}