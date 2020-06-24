class menu extends SceneTransition {
    constructor() {
        super({
            key: "menu"
        });
    }

    preload() {
        this.load.image('bg-clouds', 'assets/bg-clouds.png');
        this.load.image("bg-mountains", 'assets/bg-mountains.png');
        this.load.image("bg-trees", 'assets/bg-trees.png')
        this.load.audio('bgm_menu', ['assets/sounds/the_valley.ogg']);
        this.load.audio('item', ['assets/sounds/item.ogg']);
    }

    create() {
        super.create();

        this.bgm = this.sound.add('bgm_menu');
        this.bgm.loop = true;
        this.bgm.setVolume(0.2);
        this.bgm.play();
        this.bg_clouds = this.add.image(400, 300, 'bg-clouds');
        this.bg_clouds.displayWidth = 800;
        this.bg_clouds.displayHeight = 600;
        this.bg_mountains = this.add.image(400, 280, 'bg-mountains');
        this.bg_mountains.displayWidth = 800;
        this.bg_mountains.displayHeight = 600;
        this.bg_mountains2 = this.add.image(1200, 280, 'bg-mountains');
        this.bg_mountains2.displayWidth = 800;
        this.bg_mountains2.displayHeight = 600;
        this.bg_trees = this.add.image(400, 300, 'bg-trees');
        this.bg_trees.displayWidth = 800;
        this.bg_trees.displayHeight = 600;
        this.bg_trees2 = this.add.image(1200, 300, 'bg-trees');
        this.bg_trees2.displayWidth = 800;
        this.bg_trees2.displayHeight = 600;
        this.title = this.add.text(230, 123, "fRoGgEr", {
            font: "160px Silver", stroke: "#000", strokeThickness: 10  
        });
        this.pressKey = this.add.text(200, 600 - 80, "Press any key to start", {
            font: "60px Silver", stroke: "#000", strokeThickness: 10 
        });

        this.flashElement(this, this.pressKey);

        // this.input.on('pointerdown', (e) => {
        //     this.text.x = e.x;
        //     console.log(e.x)
        //     this.text.y = e.y;
        //     console.log(e.y)
        // }, this);

        this.input.keyboard.on(
            "keyup_ENTER",
            e => {
                this.bgm.stop();
                this.sound.add('item').play();
                this.flashElement(this, this.pressKey, false, 'Linear', 100);
                this.scene.start("main");
            },
            this
        );
    }

    update(delta) {
        this.bg_mountains.x -= 0.1;
        if (this.bg_mountains.x < -400) {
            this.bg_mountains.x = 1200
        }
        this.bg_mountains2.x -= 0.1;
        if (this.bg_mountains2.x < -400) {
            this.bg_mountains2.x = 1200
        }
        this.bg_trees.x -= 0.3;
        if (this.bg_trees.x < -400) {
            this.bg_trees.x = 1200
        }
        this.bg_trees2.x -= 0.3;
        if (this.bg_trees2.x < -400) {
            this.bg_trees2.x = 1200
        }
    }

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