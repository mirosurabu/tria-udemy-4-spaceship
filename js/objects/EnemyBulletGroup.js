import EnemyBullet from './EnemyBullet.js';

class EnemyBulletGroup extends Phaser.Group {
  constructor(game) {
    super(game, null);
  }

  spawn(x, y) {
    var bullet = this.getFirstExists(false);
    
    if (!bullet) {
      this.add(new EnemyBullet(this.game, x, y));
    } else {
      bullet.reset(x, y);
    }
  }
}

export default EnemyBulletGroup;
