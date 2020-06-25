/** @type {import("../types/phaser")} */

class main extends SceneTransition {
    constructor() {
        super({
            key: "main"
        });
    }

    preload() {}

    create() {
        super.create();

        // Game Variables
        this.lives = 3;
        this.speedFactor = 1.0;

        // Background Music
        this.bgm = this.sound.add("bgm_main");
        this.bgm.loop = true;
        this.bgm.setVolume(0.1);
        this.bgm.play();

        // Adding Sprites
        this.add.image(400, 300, "bg");

        this.sidewalks = this.add.group([
            this.add.tileSprite(50, 300, 320, 1200, "sidewalk_stone").setScale(0.5),
            this.add.tileSprite(243, 300, 160, 1200, "sidewalk_grass").setScale(0.5),
            this.add.tileSprite(401, 300, 160, 1200, "sidewalk_grass").setScale(0.5),
            this.add.tileSprite(559, 300, 160, 1200, "sidewalk_grass").setScale(0.5),
            this.add.tileSprite(719, 300, 350, 1200, "sidewalk_stone").setScale(0.5)
        ]);
        this.roads = this.add.group([
            this.add.tileSprite(167, 300, 155, 1200, "road").setScale(0.5),
            this.add.tileSprite(480, 300, 155, 1200, "road").setScale(0.5),
            this.add.tileSprite(322, 300, 155, 1200, "road").setScale(0.5),
            this.add.tileSprite(638, 300, 155, 1200, "road").setScale(0.5)
        ]);
        this.signs = this.add.tileSprite(772, 300, 80, 1200, "signs").setScale(0.5);

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

        this.player = this.physics.add
            .sprite(50, 300, "frog", "frog_run0")
            .setCollideWorldBounds(true);

        // Scoreboard
        this.scoreboard = this.add.image(400, 650, "scoreboard");
        this.heart = this.add.sprite(100, 650, "heart").setScale(5);
        this.speed = this.add.sprite(350, 650, "speed").setScale(3);
        this.speedText = this.add.text(390, 624, this.speedFactor, {
            font: "60px Silver",
            stroke: "#000",
            strokeThickness: 10
        });
        this.livesText = this.add.text(130, 622, this.lives, {
            font: "60px Silver",
            stroke: "#000",
            strokeThickness: 10
        });

        // Adding Animations
        this.anims.create({
            key: "heart",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("heart"),
            repeat: -1
        });
        this.heart.play("heart");

        this.anims.create({
            key: "frog_walk",
            frameRate: 30,
            frames: this.anims.generateFrameNames("frog", {
                prefix: "frog_run",
                start: 0,
                end: 11
            })
        });
        this.anims.create({
            key: "frog_idle",
            frameRate: 30,
            frames: this.anims.generateFrameNames("frog_idle", {
                prefix: "frog_idle",
                start: 0,
                end: 11
            }),
            repeat: -1
        });
        this.anims.create({
            key: "frog_hit",
            frameRate: 30,
            frames: this.anims.generateFrameNames("frog_hit", {
                prefix: "frog_hit",
                start: 0,
                end: 6
            }),
            duration: 1000,
            repeat: 0
        });
        this.player.on(
            "animationcomplete",
            function (anim, frame) {
                this.emit("animationcomplete_" + anim.key, anim, frame);
            },
            this.player
        );

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
        let frogVelocity = 200 * this.speedFactor;
        let carVelocity = 75 * this.speedFactor;
        // Cars
        this.red_group.setVelocityY(carVelocity);
        this.red_group.getChildren().forEach(element => {
            if (element.y > 640) {
                element.y = -80;
            }
        });
        this.grey_group.setVelocityY((carVelocity + 25));
        this.grey_group.getChildren().forEach(element => {
            if (element.y > 640) {
                element.y = -80;
            }
        });
        this.yellow_group.setVelocityY(-(carVelocity + 60));
        this.yellow_group.getChildren().forEach(element => {
            if (element.y < -80) {
                element.y = 680;
            }
        });
        this.police_group.setVelocityY(-(carVelocity + 50));
        this.police_group.getChildren().forEach(element => {
            if (element.y < -80) {
                element.y = 680;
            }
        });

        // Collision
        this.physics.world.overlap(this.red_group, this.player, () => {
            this.sound.add("hurt").play();
            if (this.lives > 1) {
                this.lives--;
                this.livesText.destroy();
                this.livesText = this.add.text(130, 622, this.lives, {
                    font: "60px Silver",
                    stroke: "#000",
                    strokeThickness: 10
                });
            } else {
                this.sound.removeAll();
                this.scene.start("menu");
            }
            this.player.x = 50;
            this.player.y = 300;
            this.player.setTexture("frog_hit", 0);
            this.player.play("frog_hit", true);
            this.player.on("animationcomplete_frog_hit", () => {
                this.player.setTexture("frog", 0);
                this.player.play("frog_idle");
            });
        });
        this.physics.world.overlap(this.grey_group, this.player, () => {
            this.sound.add("hurt").play();
            if (this.lives > 1) {
                this.lives--;
                this.livesText.destroy();
                this.livesText = this.add.text(130, 622, this.lives, {
                    font: "60px Silver",
                    stroke: "#000",
                    strokeThickness: 10
                });
            } else {
                this.sound.removeAll();
                this.scene.start("menu");
            }
            this.player.x = 50;
            this.player.y = 300;
            this.player.setTexture("frog_hit", 0);
            this.player.play("frog_hit", true);
            this.player.on("animationcomplete_frog_hit", () => {
                this.player.setTexture("frog", 0);
                this.player.play("frog_idle");
            });
        });
        this.physics.world.overlap(this.yellow_group, this.player, () => {
            this.sound.add("hurt").play();
            if (this.lives > 1) {
                this.lives--;
                this.livesText.destroy();
                this.livesText = this.add.text(130, 622, this.lives, {
                    font: "60px Silver",
                    stroke: "#000",
                    strokeThickness: 10
                });
            } else {
                this.sound.removeAll();
                this.scene.start("menu");
            }
            this.player.x = 50;
            this.player.y = 300;
            this.player.setTexture("frog_hit", 0);
            this.player.play("frog_hit", true);
            this.player.on("animationcomplete_frog_hit", () => {
                this.player.setTexture("frog", 0);
                this.player.play("frog_idle");
            });
        });
        this.physics.world.overlap(this.police_group, this.player, () => {
            this.sound.add("hurt").play();
            if (this.lives > 1) {
                this.lives--;
                this.livesText.destroy();
                this.livesText = this.add.text(130, 622, this.lives, {
                    font: "60px Silver",
                    stroke: "#000",
                    strokeThickness: 10
                });
            } else {
                this.sound.removeAll();
                this.scene.start("menu");
            }
            this.player.x = 50;
            this.player.y = 300;
            this.player.setTexture("frog_hit", 0);
            this.player.play("frog_hit", true);
            this.player.on("animationcomplete_frog_hit", () => {
                this.player.setTexture("frog", 0);
                this.player.play("frog_idle");
            });
        });

        // Player Mouvement
        if (this.player.active && this.player.anims.getCurrentKey() != "frog_hit") {
            if (this.cursors.left.isDown) {
                this.player.setFlipX(true);
                this.player.setVelocityX(-frogVelocity);
                this.player.play("frog_walk", true);
                if (this.player.x >= 750) {
                    this.sound.add("speedup").play()
                    this.player.x = 50;
                    this.player.y = 300;
                    this.speedFactor += 0.1;
                    this.speedText.destroy();
                    this.speedText = this.add.text(390, 624, this.speedFactor.toPrecision(2), {
                        font: "60px Silver",
                        stroke: "#000",
                        strokeThickness: 10
                    });
                }
            } else if (this.cursors.right.isDown) {
                this.player.setFlipX(false);
                this.player.setVelocityX(frogVelocity);
                this.player.play("frog_walk", true);
                if (this.player.x >= 750) {
                    this.sound.add("speedup").play()
                    this.player.x = 50;
                    this.player.y = 300;
                    this.speedFactor += 0.1;
                    this.speedText.destroy();
                    this.speedText = this.add.text(390, 624, this.speedFactor.toPrecision(2), {
                        font: "60px Silver",
                        stroke: "#000",
                        strokeThickness: 10
                    });
                }
            } else if (this.cursors.up.isDown) {
                this.player.setVelocityY(-frogVelocity);
                this.player.play("frog_walk", true);
                if (this.player.x >= 750) {
                    this.sound.add("speedup").play()
                    this.player.x = 50;
                    this.player.y = 300;
                    this.speedFactor += 0.1;
                    this.speedText.destroy();
                    this.speedText = this.add.text(390, 624, this.speedFactor.toPrecision(2), {
                        font: "60px Silver",
                        stroke: "#000",
                        strokeThickness: 10
                    });
                }
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(frogVelocity);
                this.player.play("frog_walk", true);
                if (this.player.x >= 750) {
                    this.sound.add("speedup").play()
                    this.player.x = 50;
                    this.player.y = 300;
                    this.speedFactor += 0.1;
                    this.speedText.destroy();
                    this.speedText = this.add.text(390, 624, this.speedFactor.toPrecision(2), {
                        font: "60px Silver",
                        stroke: "#000",
                        strokeThickness: 10
                    });
                }
            } else {
                this.player.setVelocity(0);
                this.player.play("frog_idle", true);
            }
        }
    }
}