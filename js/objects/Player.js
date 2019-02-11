class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player');

    // Set anchor to the center of this sprite
    this.anchor.setTo(0.5);

    // Set up physics
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    // Set up cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // Speed constant
    this.SPEED = 200;
  }

  update() {
    // Update input
    let keyLeft  = this.cursors.left .isDown,
        keyRight = this.cursors.right.isDown;

    if (this.game.input.activePointer.isDown) {
      if (this.game.input.activePointer.position.x >= this.game.world.centerX) {
        keyRight = true;
      } else {
        keyLeft  = true;
      }
    }

    // Update horizontal motion
    if (keyLeft && !keyRight) {
      this.body.velocity.x = -this.SPEED;
    } else if (keyRight && !keyLeft) {
      this.body.velocity.x = +this.SPEED;
    } else if (!keyRight && !keyLeft) {
      this.body.velocity.x = 0;
    }
  }
}

export default Player;
