/** @type {import("../types/phaser")} */

class loadbar extends SceneTransition {
    constructor() {
        super({
            key: "loadbar"
        });
    }

    preload() {
        this.load.image('bg-clouds', 'assets/bg-clouds.png');
        this.load.image("bg-mountains", 'assets/bg-mountains.png');
        this.load.image("bg-trees", 'assets/bg-trees.png')
        this.load.audio('bgm_menu', ['assets/sounds/the_valley.ogg']);
        this.load.audio('item', ['assets/sounds/item.ogg']);
        this.load.image("scoreboard", "assets/scoreboard.png");
        this.load.image("instructions", "assets/instructions.png");
        this.load.image("gameover", "assets/gameover.png");
        this.load.image("car_red", "assets/car_red.png");
        this.load.image("car_grey", "assets/car_grey.png");
        this.load.image("car_yellow", "assets/car_yellow.png");
        this.load.image("car_police", "assets/car_police.png");
        this.load.image("road", "assets/road.png");
        this.load.spritesheet("heart", "assets/heart.png", { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet("coin", "assets/coin.png", { frameWidth: 41, frameHeight: 41 });
        this.load.image("sidewalk_stone", "assets/sidewalk_stone.png");
        this.load.image("sidewalk_grass", "assets/sidewalk_grass.png");
        this.load.image("signs", "assets/signs.png");
        this.load.image("speed", "assets/speed.png");
        this.load.audio('bgm_main', ['assets/sounds/sci_fi_platformer02.ogg']);
        this.load.audio('hurt', ['assets/sounds/hurt.ogg']);
        this.load.audio('speedup', ['assets/sounds/jump.ogg']);
        this.load.atlas("frog", "assets/frog_run.png", "assets/frog_run.json");
        this.load.atlas("frog_idle", "assets/frog_idle.png", "assets/frog_idle.json");
        this.load.atlas("frog_hit", "assets/frog_hit.png", "assets/frog_hit.json");

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on("progress", (p) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * p, 50)
        })
    }

    create() {
        this.scene.start("menu");
    }
}