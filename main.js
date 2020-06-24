class main extends SceneTransition {   
    constructor() {
        super({
            key: "main"
        });
    }

    preload() {
        this.load.image("bg", "assets/sky.png");
        this.load.image("frog", "assets/frog.png");
        this.load.audio('bgm_main', ['assets/sounds/sci_fi_platformer02.ogg']);
    }

    create() {
        super.create();

        this.bgm = this.sound.add('bgm_main');
        this.bgm.loop = true;
        this.bgm.setVolume(0.1);
        this.bgm.play();

        this.add.image(400, 300, "bg");
        this.player = this.add.image(400, 300, "frog");

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
            this.player.x--;
        } else if (this.cursors.right.isDown) {
            this.player.x++;
        } else if (this.cursors.up.isDown) {
            this.player.y--;
        } else if (this.cursors.down.isDown) {
            this.player.y++;
        }
    }
}