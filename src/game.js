/** @type {import("../types/phaser")} */

// Game Configuration
var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 699,
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

console.log(`%c ________________________________________
< Wech bih rebek tekhzer fel code ? >
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, "font-family:monospace")
