import * as PIXI from "pixi.js"

export default class Enemy {
    constructor({ app }) {
        this.app = app;

        const enemyTexture = new PIXI.Texture(PIXI.Texture.from('./assets/images/enemy.png').baseTexture, undefined, undefined, undefined, 0);
        this.enemy = new PIXI.Sprite(enemyTexture);
        this.enemy.anchor.set(0.5);
        this.enemy.scale.set(0.5);
        this.enemy.x = this.app.screen.width + 100;
        this.enemy.y = Math.floor(Math.random() * (this.app.screen.height - this.enemy.height - 50)) + this.enemy.height / 2 + 25;
        this.app.stage.addChild(this.enemy);
    }  
    removeEnemy(){
        this.app.stage.removeChild(this.enemy);
    }
    get position(){
        return this.enemy.position;
    }
    set position({x, y}){
        this.enemy.x = x;
        this.enemy.y = y; 
    }
}