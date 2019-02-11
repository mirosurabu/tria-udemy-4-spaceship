import Enemy from './Enemy.js';

class EnemyGroup extends Phaser.Group {
  constructor(game, bullets) {
    super(game, null);

    // Set enemy bullets group
    this.bullets = bullets;

    // Create timer for spawning enemy bullets
    this.timer = this.game.time.create();
  }

  start() {
    this.timer.start();
  }

  scheduleSpawn(time, x, y, image, health, scale, speedX, speedY, firingSpeed) {
    this.timer.add(
      time * 1000,
      () => this.spawn(x, y, image, health, scale, speedX, speedY, firingSpeed),
      this
    );
  }

  spawn(x, y, image, health, scale, speedX, speedY, firingSpeed) {
    var enemy = this.getFirstExists(false);

    if (!enemy) {
      this.add(new Enemy(this.game, x, y, image, health, scale, speedX, speedY, firingSpeed, this.bullets));
    } else {
      enemy.reset(x, y, image, health, scale, speedX, speedY, firingSpeed);
    }
  }
}

export default EnemyGroup;
