/** @type {import("../types/phaser")} */

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
    scene: [ menu, main ],
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
});
