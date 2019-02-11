class PlayerBullet extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'bullet');

    this.reset(x, y);
  }

  reset(x, y) {
    super.reset(x, y);

    // Set up physics
    this.game.physics.arcade.enable(this);

    // Set anchor to the center of the sprite
    this.anchor.setTo(0.5);

    // Kill the bullet when out of world bounds
    this.checkWorldBounds = true;
    this.outOfBoundsKill  = true;

    // Bullet speed
    this.body.velocity.y = -1000;
  }
}

export default PlayerBullet;
