import Player            from '../objects/Player.js';
import PlayerBulletGroup from '../objects/PlayerBulletGroup.js';
import Enemy             from '../objects/Enemy.js';
import EnemyBulletGroup  from '../objects/EnemyBulletGroup.js';
import EnemyGroup        from '../objects/EnemyGroup.js';

class PlayState extends Phaser.State {

  init(mapId) {
    // Initiate physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // If map id is not defined or is improperly defined then set map id to default value of 1
    if (!mapId) {
      mapId = 1;
    }

    this.numMaps = 3;
    this.mapId   = mapId;
    this.mapName = `map${this.mapId}`;
  }

  create() {
    // Translate map from JSON format to JS object format
    this.map = JSON.parse(this.game.cache.getText(this.mapName));

    // Create scrolling background
    this.bg = new Phaser.TileSprite(this.game, 0, 0, this.game.world.width, this.game.world.height, 'space');
    this.bg.autoScroll(0, 30);

    // Create player
    this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 50);

    // Create player bullet group
    this.playerBullets = new PlayerBulletGroup(this.game, this.player);

    // Create enemy bullet group
    this.enemyBullets = new EnemyBulletGroup(this.game);

    // Create enemies
    this.enemies = new EnemyGroup(this.game, this.enemyBullets);
    for (let e of this.map.enemies) {
      this.enemies.scheduleSpawn(e.time, e.x * this.game.world.width, -100, e.image, e.health, e.scale, e.speedX, e.speedY, 2);
    }
    this.enemies.start();

    // Level complete timer
    this.timerLevelComplete = this.game.time.events.add(this.map.duration * 1000, this.onLevelComplete, this);

    // Create and play soundtrack
    this.soundtrack = new Phaser.Sound(this.game, 'orchestra', 1, true);
    // NOTE: Autoplay policy
    // May not start playing before user interacts with the game and a new state is created.
    this.soundtrack.play();

    // Add game objects to world
    this.game.world.add(this.bg);
    this.game.world.add(this.enemies);
    this.game.world.add(this.enemyBullets);
    this.game.world.add(this.playerBullets);
    this.game.world.add(this.player);
  }

  update() {
    this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.onBulletHitsEnemy,  null, this);
    this.game.physics.arcade.overlap(this.enemyBullets,  this.player,  this.onBulletHitsPlayer, null, this);
  }

  onBulletHitsEnemy(bullet, enemy) {
    enemy.damage(1);
    bullet.kill();
  }

  onBulletHitsPlayer() {
    this.player.kill();
    this.soundtrack.stop();
    this.game.state.start('PlayState', true, false, this.mapId);
  }

  onLevelComplete() {
    var nextMapId = this.mapId + 1;
    if (nextMapId > this.numMaps) {
      nextMapId = 1;
    }

    this.soundtrack.stop();
    this.game.state.start('PlayState', true, false, nextMapId);
  }
}

export default PlayState;
