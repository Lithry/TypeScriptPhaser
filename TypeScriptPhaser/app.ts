// https://www.youtube.com/watch?v=T8a8-SO6vP0

module Game {
    export class TypeScriptPhaser {
        game: Phaser.Game;
        player;
        enemy;
        boll;
        boolUp;
        cursors;
        text;
        scorePlayer;
        scoreEnemy;
        restartButton;
        restartText;

        constructor() {
            this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload, update: this.update
            });
        }

        preload() {
            this.game.load.image('Background', 'Assets/Background.jpg');
            this.game.load.image('Platforms', 'Assets/Plat.png');
            this.game.load.image('Star', 'Assets/Star.png');
            this.game.load.spritesheet('dude', 'Assets/dude.png', 32, 48);
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.sprite(-10, -10, 'Background');
            this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.R);

            // Player
            this.player = this.game.add.sprite(50, this.game.height / 2, 'Platforms');
            this.game.physics.arcade.enable(this.player, true);
            this.player.enableBody = true;
            this.player.body.immovable = true;
            this.player.anchor.setTo(0.5, 0.5);
            this.player.body.allowGravity = false;
            
            // Enemy
            this.enemy = this.game.add.sprite(this.game.width - 50, this.game.height / 2, 'Platforms');
            this.game.physics.arcade.enable(this.enemy, true);
            this.enemy.enableBody = true;
            this.enemy.body.immovable = true;
            this.enemy.anchor.setTo(0.5, 0.5);
            this.enemy.body.allowGravity = false;

            // Boll
            this.boll = this.game.add.sprite(600, this.game.height / 2, 'Star');
            this.game.physics.arcade.enable(this.boll, true);
            this.player.enableBody = true;
            this.player.body.collideWorldBounds = true;
            this.player.body.allowGravity = false;
            this.boll.body.velocity.x = -175;
            this.boll.body.velocity.y = 0;
            this.boolUp = true;

            var bar = this.game.add.graphics();
            bar.beginFill(0xFF00FF, 0.2);
            bar.drawRect(0, 0, this.game.width, 100);

            var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            this.text = this.game.add.text(this.game.width / 2 - 20, 35, "0 - 0", style);
            this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
            this.restartText = this.game.add.text(20, 20, "R to Restart", style);
            this.restartText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

            this.scorePlayer = 0;
            this.scoreEnemy = 0;

            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        update() {
            // collision
            this.game.physics.arcade.collide(this.boll, this.enemy);
            this.game.physics.arcade.collide(this.boll, this.player);

            // Score
            this.text.text = this.scorePlayer + ' - ' + this.scoreEnemy;

            // Restar
            if (this.restartButton.justPressed()) {
                this.scorePlayer = 0;
                this.scoreEnemy = 0;
                this.boll.y = this.game.height / 2;
                this.boll.x = this.game.width / 2;
                this.player.y = this.game.height / 2;
                this.enemy.y = this.game.height / 2;
                this.boll.body.velocity.x = -175;
                this.boll.body.velocity.y = 0;
                this.boolUp = true;
            }


            // Player
            this.player.body.velocity.y = 0;
            if (this.cursors.up.isDown && this.player.y > 150) {
                this.player.body.velocity.y = -170;
            }
            else if (this.cursors.down.isDown && this.player.x < this.game.height - 150) {
                this.player.body.velocity.y = 170;
            }

            // Enemy
            this.enemy.body.velocity.y = 0;
            if (this.enemy.y - 10 > this.boll.y && this.enemy.y > 150) {
                this.enemy.body.velocity.y = -170;
            }
            else if (this.enemy.y + 10 < this.boll.y && this.enemy.y < this.game.height - 50) {
                this.enemy.body.velocity.y = 170;
            }

            // Boll Limits
            if (this.boll.body.velocity.y < 0) {
                this.boolUp = true;
            }
            else {
                this.boolUp = false;
            }
            if (this.boll.y < 100 && this.boolUp) {
                this.boll.body.velocity.y = this.boll.body.velocity.y * (-1);
            }
            else if (this.boll.y > this.game.height - 20 && !this.boolUp) {
                this.boll.body.velocity.y = -(this.boll.body.velocity.y);
            }
            // Boll Collision E&P
            if (this.boll.body.touching.right) { //E
                this.boll.body.velocity.x = -175;
                if (this.boll.y > this.enemy.y) {
                    this.boll.body.velocity.y = (Phaser.Math.difference(this.enemy.y, this.boll.y) * 5);
                }
                else {
                    this.boll.body.velocity.y = -(Phaser.Math.difference(this.enemy.y, this.boll.y) * 5);
                }
            }

            else if (this.boll.body.touching.left) { //P
                this.boll.body.velocity.x = 175;
                if (this.boll.y > this.player.y) {
                    this.boll.body.velocity.y = (Phaser.Math.difference(this.player.y, this.boll.y) * 4);
                }
                else {
                    this.boll.body.velocity.y = -(Phaser.Math.difference(this.player.y, this.boll.y) * 4);
                }
            }
            // Gool
            if (this.boll.x > this.enemy.x || this.boll.x < this.player.x) {
                if (this.boll.x > this.enemy.x) {
                    this.scorePlayer += 1;
                    this.boll.body.velocity.x = -175;
                    this.enemy.y = this.game.height / 2;
                }
                else {
                    this.scoreEnemy += 1;
                    this.boll.body.velocity.x = 175;
                    this.enemy.y = this.game.height / 2 + 8;
                }
                this.boll.body.velocity.y = 0;
                this.boll.y = this.game.height / 2;
                this.boll.x = this.game.width / 2;
                this.player.y = this.game.height / 2;
                
            }
        }
    }
}

window.onload = () => {
    var game = new Game.TypeScriptPhaser();
}