/** @type {import("../types/phaser")} */

// Game Configuration
var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 699,
    physics: {
        default: "arcade"
    },
    scene: [loadbar, menu, main, gameover],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
});

