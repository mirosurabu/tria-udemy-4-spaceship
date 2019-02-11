import PlayerBullet from './PlayerBullet.js';

class PlayerBulletGroup extends Phaser.Group {
  constructor(game, sourceSprite) {
    super(game, null);

    // Sprite that shoots bullets
    this.sourceSprite = sourceSprite;

    // Spawn bullets five times a second
    this.timer = this.game.time.events.loop(1000 / 5, this.spawn, this);

    // Spawn first bullet
    this.spawn();
  }

  spawn() {
    var bullet = this.getFirstExists(false);

    if (!bullet) {
      this.add(new PlayerBullet(this.game, this.sourceSprite.x, this.sourceSprite.top));
    } else {
      bullet.reset(this.sourceSprite.x, this.sourceSprite.top);
    }
  }
}

export default PlayerBulletGroup;
