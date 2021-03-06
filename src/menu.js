/** @type {import("../types/phaser")} */

class menu extends SceneTransition {
    constructor() {
        super({
            key: "menu"
        });
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

        // Text
        this.title = this.add.text(230, 123, "fRoGgEr", {
            font: "160px Silver",
            stroke: "#000",
            strokeThickness: 10
        });
        this.pressKey = this.add.text(200, 600 - 130, "Press any key to start", {
            font: "60px Silver",
            stroke: "#000",
            strokeThickness: 10
        });
        this.flashElement(this, this.pressKey);

        // Input Handeling
        this.input.keyboard.on(
            "keyup",
            e => {
                if (this.commands) {
                    this.bgm.stop();
                    this.sound.add('item').play();
                    this.flashElement(this, this.pressKey, false, 'Linear', 100);
                    this.scene.start("main");
                } else {
                    this.sound.add('item').play();
                    this.flashElement(this, this.pressKey, false, 'Linear', 100);
                    this.title.destroy();
                    this.instructions = this.add.image(400, 300, "instructions");
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