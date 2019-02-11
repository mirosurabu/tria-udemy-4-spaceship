class Enemy extends Phaser.Sprite {

  constructor(game, x, y, image, health, scale, speedX, speedY, firingSpeed, bullets) {
    super(game);

    // Set enemy bullets group
    this.bullets = bullets;

    // Set shooting timer
    this.timer = this.game.time.create(false);
    this.timer.start();

    this.reset(x, y, image, health, scale, speedX, speedY, firingSpeed);

    this.scheduleShooting();
  }

  reset(x, y, image, health, scale, speedX, speedY, firingSpeed) {
    super.reset(x, y, health);

    // Set image
    this.loadTexture(image);

    // Set anchor to center
    this.anchor.setTo(0.5);

    // Set scale
    this.scale.setTo(scale);

    // Set up physics
    this.game.physics.arcade.enable(this);
    this.body.velocity.x    = speedX;
    this.body.velocity.y    = speedY;
    this.collideWorldBounds = true;

    // Set firing speed
    this.firingSpeed = firingSpeed;

    // Set up animations
    this.animations.add('suffer', [0, 1, 2, 1, 0], 25, false);

    // Resume timer
    this.timer.resume();
  }

  update() {
    // Bounce if colliding one of the vertical edges of the world
    if (this.position.x < 0.05 * this.game.world.width) {
      this.position.x = 0.05 * this.game.world.width + 2;
      this.body.velocity.x *= -1;
    } else if (this.position.x > 0.95 * this.game.world.width) {
      this.position.x = 0.95 * this.game.world.width - 2;
      this.body.velocity.x *= -1;
    }

    // Kill if below the bottom of the world
    if (this.position.y > this.game.world.height) {
      this.kill();
    }
  }

  scheduleShooting() {
    this.shoot();

    this.timer.add(this.firingSpeed * 1000, this.scheduleShooting, this);
  }

  shoot() {
    this.bullets.spawn(this.x, this.bottom);
  }

  damage(amount) {
    super.damage(amount);

    // Play suffering animation
    this.play('suffer');

    // If dead then explode
    if (this.health <= 0) {
      var emitter = new Phaser.Particles.Arcade.Emitter(this.game, this.x, this.y, 100);
      emitter.makeParticles('enemyParticle');
      emitter.minParticleSpeed.setTo(-200, -200);
      emitter.maxParticleSpeed.setTo(+200, +200);
      emitter.gravity = 0;
      emitter.start(true, 500, null, 100);

      this.game.add.existing(emitter);

      this.timer.pause();
    }
  }
}

export default Enemy;
