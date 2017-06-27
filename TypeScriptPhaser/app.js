var Game;
(function (Game) {
    var TypeScriptPhaser = (function () {
        function TypeScriptPhaser() {
            this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload
            });
        }
        TypeScriptPhaser.prototype.preload = function () {
        };
        TypeScriptPhaser.prototype.create = function () {
        };
        return TypeScriptPhaser;
    }());
    Game.TypeScriptPhaser = TypeScriptPhaser;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.TypeScriptPhaser();
};
//# sourceMappingURL=app.js.map