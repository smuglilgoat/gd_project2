/** @type {import("../types/phaser")} */

class gameover extends SceneTransition {
    constructor() {
        super({
            key: "gameover"
        });
    }

    init(data) {
        // Getting Player Score
        this.score = data.score
        this.lives = data.lives
        this.speed = data.speed
    }

    create() {
        super.create();

        // Variables
        this.commands = false;

        // Music & Background
        this.bgm = this.sound.add('bgm_menu');
        this.bgm.loop = true;
        this.bgm.setVolume(0.2);
        this.bgm.play();
        this.bg_clouds = this.add.tileSprite(400, 350, 800, 600, 'bg-clouds');
        this.bg_clouds.tileScaleY = 2.88;
        this.bg_clouds.tileScaleX = 2.88;
        this.bg_mountains = this.add.tileSprite(400, 350, 800, 300, 'bg-mountains');
        this.bg_trees = this.add.tileSprite(400, 350, 800, 600, 'bg-trees');
        this.bg_trees.tileScaleY = 3;
        this.bg_trees.tileScaleX = 3;

        this.pressKey = this.add.text(200, 600 - 130, "Press any key to start", {
            font: "60px Silver",
            stroke: "#000",
            strokeThickness: 10
        });
        this.flashElement(this, this.pressKey);

        // Text
        this.board = this.add.image(400, 230, "gameover");
        this.add.sprite(340, 200, "heart")
        this.add.sprite(340, 250, "coin")
        this.add.sprite(340, 300, "speed")
        this.livesText = this.add.text(380, 173, "= " + this.lives, {
            font: "60px Silver",
            stroke: "#000",
            strokeThickness: 10
        })
        this.coinText = this.add.text(380, 223, "= " + this.score, {
            font: "60px Silver",
            stroke: "#000",
            strokeThickness: 10
        })
        this.speedText = this.add.text(380, 273, "= " + this.speed, {
            font: "60px Silver",
            stroke: "#000",
            strokeThickness: 10
        })
        

        // Input Handeling
        this.input.keyboard.on(
            "keyup",
            e => {
                if (this.commands) {
                    this.bgm.stop();
                    this.sound.add('item').play();
                    this.flashElement(this, this.pressKey, false, 'Linear', 100);
                    this.scene.start("menu");
                } else {
                    this.commands = true;
                } 
            },
            this
        );
    }

    update(delta) {
        // Move BG
        this.bg_mountains.tilePositionX -= 0.2;
        this.bg_trees.tilePositionX += 0.3;
    }

    // Utility Func
    flashElement(
        scene,
        element,
        repeat = true,
        easing = "Linear",
        overallDuration = 500,
        visiblePauseDuration = 100
    ) {
        if (scene && element) {
            let flashDuration = overallDuration - visiblePauseDuration / 2;

            scene.tweens.timeline({
                tweens: [{
                        targets: element,
                        duration: 0,
                        alpha: 0,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 1
                    },
                    {
                        targets: element,
                        duration: visiblePauseDuration,
                        alpha: 1
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 0,
                        onComplete: () => {
                            if (repeat === true) {
                                this.flashElement(scene, element);
                            }
                        }
                    }
                ]
            });
        }
    }
}