import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";
import spaceshipUrl from "/assets/spaceship.png";
import rocketUrl from "/assets/rocket.png";

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  starfield?: Phaser.GameObjects.TileSprite;
  spinner?: Phaser.GameObjects.Shape;
  spaceShip?: Phaser.GameObjects.Sprite;
  rocket?: Phaser.GameObjects.Sprite;

  rotationSpeed = Phaser.Math.PI2 / 1000; // radians per millisecond
  isFiring = false;

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
    this.load.image("spaceship", spaceshipUrl);
    this.load.image("rocketship", rocketUrl);
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");

    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);
    //this.spinner = this.add.rectangle(100, 430, 50, 50, 0x67b36c);
    this.rocket = this.add.sprite(100, 430, "rocketship");
    this.spaceShip = this.add.sprite(640, 100, "spaceship");
  }

  // update(_timeMs: number, delta: number) {
  update() {
    this.starfield!.tilePositionX -= 4;

    if (this.left!.isDown && !this.isFiring) {
      //this.spinner!.rotation -= delta * this.rotationSpeed;
      this.rocket!.x -= 3;
    }
    if (this.right!.isDown && !this.isFiring) {
      //this.spinner!.rotation += delta * this.rotationSpeed;
      this.rocket!.x += 3;
    }

    if (this.fire!.isDown) {
      /*
      this.tweens.add({
        targets: this.spinner,
        scale: { from: 1.5, to: 1 },
        duration: 300,
        ease: Phaser.Math.Easing.Sine.Out,
      });
      */
      this.isFiring = true;
    }
    if (this.isFiring) {
      this.rocket!.y -= 3;
    }
    if (this.rocket!.y <= 0) {
      this.rocket!.y = 430;
      this.isFiring = false;
    }

    this.spaceShip!.x -= 3;
    if (this.spaceShip!.x <= 0) {
      this.spaceShip!.x = 640;
      const randomYRespawn = Math.floor(400 * Math.random());
      this.spaceShip!.y = randomYRespawn;
    }
  }
}
