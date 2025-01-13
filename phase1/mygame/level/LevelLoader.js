export class LevelLoader {
  async loadLevel(levelId) {
      const response = await fetch(`../level/level_${levelId}.json`);
      const data = await response.json(); // Chuyển phản hồi thành JSON
      console.log(data);
      return data; 
   
  }
}
