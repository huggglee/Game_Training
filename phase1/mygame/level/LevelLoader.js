class LevelLoader {
    loadLevel(levelId) {
        const data = require(`../../assets/levels/level_${levelId}.json`);
      return data;
    }
  }