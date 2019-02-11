export default class BootState extends Phaser.State {

  init() {
    this.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically   = true;
  }

  create() {
    this.state.start('PreloadState');
  }

}
