// https://www.youtube.com/watch?v=T8a8-SO6vP0

module Game {
    export class TypeScriptPhaser {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload
            });
        }

        preload() {

		// Graphics
		//this.game.load.image("player", "/Graphics/White.png");
		//

        }

        create() {

        }
    }
}

window.onload = () => {
    var game = new Game.TypeScriptPhaser();
}