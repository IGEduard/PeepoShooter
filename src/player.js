import * as PIXI from "pixi.js"

let upDown = 0;
let upKeyPressed = false;
let downKeyPressed = false;

export default class Player {
    constructor({ app }) {
        this.app = app;

        this.player = new PIXI.Sprite(PIXI.Texture.from('./assets/images/player.png'));
        this.player.anchor.set(0.5);
        this.player.scale.set(0.7);
        this.player.x = this.player.width / 2;
        this.player.y = this.app.screen.height * 0.5;
        this.app.stage.addChild(this.player);

        this.playerHealth = 5;

        this.playerHealthText = new PIXI.Text("");
        this.playerHealthText.style.fill = 0xffffff;
        this.playerHealthText.x = 0;
        this.playerHealthText.y = 0;
        this.app.stage.addChild(this.playerHealthText);
    }

    get position(){
        return this.player.position;
    }

    update(delta) {
        if (upKeyPressed && this.player.y > this.player.height / 2 + 50) {
            upDown = -10;
        } else if (downKeyPressed && this.player.y < this.app.screen.height - this.player.height / 2) {
            upDown = 10;
        } else {
            upDown = 0;
        }
        this.player.y += upDown * delta;
    }
}

document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;
        if (keyName === "ArrowUp" || keyName === "w" || keyName === "W") {
            upKeyPressed = true;
        } else if (keyName === "ArrowDown" || keyName === "s" || keyName === "S") {
            downKeyPressed = true;
        }
    }
)

document.addEventListener(
    "keyup",
    (event) => {
        const keyName = event.key;
        if (keyName === "ArrowUp" || keyName === "w" || keyName === "W") {
            upKeyPressed = false;
        } else if (keyName === "ArrowDown" || keyName === "s" || keyName === "S") {
            downKeyPressed = false;
        }
    }
)
