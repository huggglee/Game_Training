export class AudioManager {
  static instance = null;
  constructor() {
    this.sounds = {};
    AudioManager.instance = this;
  }

  loadSound(name, src) {
    const audio = new Audio(src);
    this.sounds[name] = audio;
  }

  playSound(name) {
    if (this.sounds[name]) this.sounds[name].play();
  }
}
