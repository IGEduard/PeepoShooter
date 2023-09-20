import * as PIXI from 'pixi.js'

export default class GameText {
    constructor({ app, player }) {
        this.app = app;
        this.player = player;

        this.scoreText = new PIXI.Text("Score: 0");
        this.scoreText.style.fill = 0xffffff;
        this.scoreText.x = this.app.screen.width / 2 - this.scoreText.width / 2;;
        this.scoreText.y = 0;
        this.app.stage.addChild(this.scoreText);

        this.gameOverText = new PIXI.Text("Game Over");
        this.gameOverText.style.fontSize = 75;
        this.gameOverText.style.fill = 0xffffff;
        this.gameOverText.x = this.app.screen.width / 2 - this.gameOverText.width / 2;
        this.gameOverText.y = this.app.screen.height / 2 - this.gameOverText.height;
        this.app.stage.addChild(this.gameOverText);
        this.gameOverText.visible = false;

        this.restartText = new PIXI.Text("Press \"R\" to restart.");
        this.restartText.style.fill = 0xffffff;
        this.restartText.x = this.app.screen.width / 2 - this.restartText.width / 2;
        this.restartText.y = this.app.screen.height / 2;
        this.app.stage.addChild(this.restartText);
        this.restartText.visible = false;

        this.update();
    }

    update(){
        this.scoreText.text = "Score: " + this.app.score;
        let healthString = "";
        for (let i = 0; i < this.player.playerHealth; i++) {
            healthString += "♥️";
        }
        this.player.playerHealthText.text = healthString;
    }
}