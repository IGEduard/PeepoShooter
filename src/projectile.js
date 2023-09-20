import * as PIXI from "pixi.js"

export default class Projectile {
    constructor({app, player}){
        this.app = app;
        this.player = player;

        const projectileTexture = new PIXI.Texture(PIXI.Texture.from('./assets/images/projectile.png').baseTexture, undefined, undefined, undefined, 12);
        this.projectile = new PIXI.Sprite(projectileTexture);
        this.projectile.anchor.set(0.5);
        this.projectile.scale.x *= -1;
        this.projectile.scale.set(0.3);
        this.projectile.x = this.player.player.x + this.player.player.width / 2;
        this.projectile.y = this.player.player.y;
        this.app.stage.addChild(this.projectile);
    }
    removeProjectile(){
        this.app.stage.removeChild(this.projectile);
    }
    get position(){
        return this.projectile.position;
    }
    set position({x, y}){
        this.projectile.x = x;
        this.projectile.y = y; 
    }
}