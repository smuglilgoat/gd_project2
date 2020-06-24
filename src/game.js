/** @type {import("../types/phaser")} */

// Game Configuration
var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [loadbar, menu, main],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
});