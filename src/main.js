/** @type {import("../types/phaser")} */

class main extends SceneTransition {
    constructor() {
        super({
            key: "main"
        });
    }

    preload() {
        this.load.image("bg", "assets/sky.png");
        this.load.audio('bgm_main', ['assets/sounds/sci_fi_platformer02.ogg']);
        this.load.atlas("frog", "assets/frog_run.png", "assets/frog_run.json");
        this.load.atlas("frog_idle", "assets/frog_idle.png", "assets/frog_idle.json");
    }

    create() {
        super.create();

        this.bgm = this.sound.add('bgm_main');
        this.bgm.loop = true;
        this.bgm.setVolume(0.1);
        this.bgm.play();

        this.add.image(400, 300, "bg");
        this.player = this.physics.add.sprite(400, 300, "frog", "frog_run0");

        this.anims.create({
            key: "frog_walk",
            frameRate: 15,
            frames: this.anims.generateFrameNames("frog", {
                prefix: "frog_run",
                start: 0,
                end: 11
            })
        })
        this.anims.create({
            key: "frog_idle",
            frameRate: 15,
            frames: this.anims.generateFrameNames("frog_idle", {
                prefix: "frog_idle",
                start: 0,
                end: 11
            }),
            repeat: -1
        })

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on(
            "keyup_ESC",
            e => {
                this.sound.removeAll();
                this.scene.start("menu");
            },
            this
        );
    }

    update(delta) {
        if (this.cursors.left.isDown) {
            this.player.setFlipX(true);
            this.player.setVelocityX(-40);
            this.player.play("frog_walk", true)

        } else if (this.cursors.right.isDown) {
            this.player.setFlipX(false);
            this.player.setVelocityX(40);
            this.player.play("frog_walk", true)

        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-40);
            this.player.play("frog_walk", true)

        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(40);
            this.player.play("frog_walk", true)

        } else {
            this.player.setVelocity(0);
            this.player.play("frog_idle", true)
        }
    }
}