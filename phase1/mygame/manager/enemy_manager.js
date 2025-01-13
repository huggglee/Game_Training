import { Enemy } from "../object/Enemy.js";
import { CollisionManager } from "../handle/CollisionManager.js";

export class EnemyManager{
    constructor(){
        this.enemies=[];
    }

    init(enemiesData){
        this.enemies=[];
        enemiesData.forEach(enemy => {
            this.addEnemy(enemy.x,enemy.y);
        });
    }

    update(x,y){
        this.enemies.forEach(enemy =>{
            enemy.changeTarget(x,y)
            enemy.update();
        })
    }

    addEnemy(x,y){
        let enemy = new Enemy(x,y);
        this.enemies.push(enemy);
    }

    draw(context){
        this.enemies.forEach(enemy=>{
            enemy.draw(context);
        })
    }

}