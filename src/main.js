/** @type {import("../types/phaser")} */

class main extends Phaser.Scene {
    constructor() {
        super({
            key: "main"
        });
    }

    preload() {}

    create() {
        // Background Music
        this.bgm = this.sound.add("bgm_main");
        this.bgm.loop = true;
        this.bgm.setVolume(0.1);
        this.bgm.play();

        // Adding Sprites
        this.add.image(400, 300, "bg");



        

        this.sidewalks = this.add.group([
            this.add.tileSprite(50, 300, 320, 1200, 'sidewalk_stone').setScale(0.5),
            this.add.tileSprite(243, 300, 160, 1200, 'sidewalk_grass').setScale(0.5),
            this.add.tileSprite(401, 300, 160, 1200, 'sidewalk_grass').setScale(0.5),
            this.add.tileSprite(559, 300, 160, 1200, 'sidewalk_grass').setScale(0.5),
            this.add.tileSprite(719, 300, 350, 1200, 'sidewalk_stone').setScale(0.5)
        ])

        this.roads = this.add.group([
            this.add.tileSprite(167, 300, 155, 1200, "road").setScale(0.5),
            this.add.tileSprite(480, 300, 155, 1200, "road").setScale(0.5),
            this.add.tileSprite(322, 300, 155, 1200, "road").setScale(0.5),
            this.add.tileSprite(638, 300, 155, 1200, "road").setScale(0.5)
        ]);

        this.red_group = this.physics.add.group([
            this.physics.add
            .sprite(167, 100, "car_red")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(167, 500, "car_red")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(167, 700, "car_red")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(167, 300, "car_red")
            .setImmovable(true)
            .setScale(0.5)
        ]);
        this.grey_group = this.physics.add.group([
            this.physics.add
            .sprite(480, 100, "car_grey")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(480, 500, "car_grey")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(480, 700, "car_grey")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(480, 300, "car_grey")
            .setImmovable(true)
            .setScale(0.5)
        ]);
        this.yellow_group = this.physics.add.group([
            this.physics.add
            .sprite(322, 100, "car_yellow")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(322, 500, "car_yellow")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(322, 700, "car_yellow")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(322, 300, "car_yellow")
            .setImmovable(true)
            .setScale(0.5)
        ]);
        this.police_group = this.physics.add.group([
            this.physics.add
            .sprite(638, 100, "car_police")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(638, 500, "car_police")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(638, 700, "car_police")
            .setImmovable(true)
            .setScale(0.5),
            this.physics.add
            .sprite(638, 300, "car_police")
            .setImmovable(true)
            .setScale(0.5)
        ]);


        this.player = this.physics.add.sprite(50, 300, "frog", "frog_run0").setCollideWorldBounds();

        // Adding Animations
        this.anims.create({
            key: "frog_walk",
            frameRate: 15,
            frames: this.anims.generateFrameNames("frog", {
                prefix: "frog_run",
                start: 0,
                end: 11
            })
        });
        this.anims.create({
            key: "frog_idle",
            frameRate: 15,
            frames: this.anims.generateFrameNames("frog_idle", {
                prefix: "frog_idle",
                start: 0,
                end: 11
            }),
            repeat: -1
        });

        // Adding Keyboard Input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Revert Mechanism
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
        // Variables
        let frogVelocity = 80
        // Cars
        this.red_group.setVelocityY(75);
        this.red_group.getChildren().forEach(element => {
            if (element.y > 640) {
                element.y = -80;
            }
        });
        this.grey_group.setVelocityY(100);
        this.grey_group.getChildren().forEach(element => {
            if (element.y > 640) {
                element.y = -80;
            }
        });
        this.yellow_group.setVelocityY(-150);
        this.yellow_group.getChildren().forEach(element => {
            if (element.y < -80) {
                element.y = 680;
            }
        });
        this.police_group.setVelocityY(-125);
        this.police_group.getChildren().forEach(element => {
            if (element.y < -80) {
                element.y = 680;
            }
        });

        // Collision
        this.physics.world.setBoundsCollision();
        this.physics.world.collide(this.red_group, this.player, () => {});
        this.physics.world.collide(this.grey_group, this.player, () => {});
        this.physics.world.collide(this.yellow_group, this.player, () => {});

        // Player Mouvement
        if (this.cursors.left.isDown) {
            this.player.setFlipX(true);
            this.player.setVelocityX(-frogVelocity);
            this.player.play("frog_walk", true);
        } else if (this.cursors.right.isDown) {
            this.player.setFlipX(false);
            this.player.setVelocityX(frogVelocity);
            this.player.play("frog_walk", true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-frogVelocity);
            this.player.play("frog_walk", true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(frogVelocity);
            this.player.play("frog_walk", true);
        } else {
            this.player.setVelocity(0);
            this.player.play("frog_idle", true);
        }
    }
}