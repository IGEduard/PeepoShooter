import * as PIXI from 'pixi.js'
import { Sound } from "@pixi/sound";
import Player from './player.js';
import Enemy from './enemy.js';
import EnemySpawner from './enemySpawner.js';
import Projectile from './projectile.js';
import ProjectileSpawner from './projectileSpawner.js';
import GameText from './gameText.js';

const app = new PIXI.Application({
    autoResize: true,
    resizeTo: window,
    backgroundColor: 0x000000,
    //view: document.querySelector('#scene')
});
document.body.appendChild(app.view);

app.game = true;
app.score = 0;

let timer = 1;
let speed = 1;

// load
PIXI.Assets.load([
    './assets/images/player.png',
    './assets/images/enemy.png',
    './assets/images/projectile.png',
    './assets/images/background.jpg',
]).then(onAssetsLoaded);

// start
function onAssetsLoaded() {

    //console.log(PIXI.Ticker.shared.FPS);

    const style = new PIXI.TextStyle({
        fill: [
            "#ff0000", // 
            "#ff7700", // 
            "#ffff00", // 
            "#00ff00", // 
            "#00ffff", // 
            "#0000ff", // 
            "#ff0077", // 
            "#ff00ff" // 
        ]
    });

    const background = new PIXI.Sprite(PIXI.Texture.from('./assets/images/background.jpg'));
    background.width = app.screen.width;
    background.height = app.screen.height;
    background.alpha = 1;
    app.stage.addChild(background);

    const soundPop = Sound.from('./assets/sounds/pop.mp3');

    let player = new Player({ app });
    let enemySpawner = new EnemySpawner({ app, createEnemy: () => new Enemy({ app }) });
    let projectileSpawner = new ProjectileSpawner({ app, createProjectile: () => new Projectile({ app, player }) });
    let gameText = new GameText({ app, player });

    // update 
    app.ticker.add((delta) => {
        if (app.game) {
            timer += 1 / 60 * delta;
            player.update(delta);
            handleProjectiles(delta);
            handleEnemies(delta);
            handleCollision();

            if (timer > 1) {
                speed += 0.1;
                timer = 0;
            }
        }
    });

    function handleEnemies(delta) {
        enemySpawner.enemies.forEach(enemy => {
            enemy.position.x -= 5 * delta * speed;
            if (enemy.position.x < 0) {
                enemySpawner.enemies.splice(enemySpawner.enemies.indexOf(enemy), 1);
                enemy.removeEnemy();
                takeDamage();
            }
        });
    }
    function handleProjectiles(delta) {
        projectileSpawner.projectiles.forEach(projectile => {
            projectile.position.x += 10 * delta * speed;
            if (projectile.position.x > app.screen.width) {
                projectileSpawner.projectiles.splice(projectileSpawner.projectiles.indexOf(projectile), 1);
                projectile.removeProjectile();
            }
        });
    }

    function restart() {
        player.player.y = app.screen.height * 0.5;
        player.player.visible = true;
        player.playerHealth = 5;
        app.score = 0;
        speed = 1;

        gameText.gameOverText.visible = false;
        gameText.restartText.visible = false;
        background.visible = true;
        gameText.update();

        app.game = true;
    }

    function takeDamage() {
        soundPop.play();
        player.playerHealth -= 1;
        if (player.playerHealth <= 0) {
            app.game = false;
            enemySpawner.stopSpawner();
            while (projectileSpawner.projectiles[0]) {
                projectileSpawner.projectiles[0].removeProjectile();
                projectileSpawner.projectiles.splice(projectileSpawner.projectiles[0], 1);
            }
            while (enemySpawner.enemies[0]) {
                enemySpawner.enemies[0].removeEnemy();
                enemySpawner.enemies.splice(enemySpawner.enemies[0], 1);
            }
            player.player.visible = false;
            background.visible = false;
            gameText.gameOverText.visible = true;
            gameText.restartText.visible = true;
        }
        gameText.update();
    }

    function increaseScore() {
        app.score += 1;
        gameText.update();
    }

    function checkCollision(object1, object2) {
        const bounds1 = object1.getBounds();
        const bounds2 = object2.getBounds();

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

    function handleCollision() {
        enemySpawner.enemies.forEach(enemy => {
            // enemy - projectile collision
            projectileSpawner.projectiles.forEach(projectile => {
                if (checkCollision(enemy.enemy, projectile.projectile)) {
                    soundPop.play();
                    projectileSpawner.projectiles.splice(projectileSpawner.projectiles.indexOf(projectile), 1);
                    projectile.removeProjectile();
                    enemySpawner.enemies.splice(enemySpawner.enemies.indexOf(enemy), 1);
                    enemy.removeEnemy();
                    increaseScore();
                }
            })
            // enemy - player collision
            if (checkCollision(enemy.enemy, player.player)) { // function needs sprites, so player.player
                enemySpawner.enemies.splice(enemySpawner.enemies.indexOf(enemy), 1);
                enemy.removeEnemy();
                takeDamage();
            }
        });
    }

    document.addEventListener(
        "keydown",
        (event) => {
            const keyName = event.key;
            if (!app.game && (keyName === "r" || keyName === "R")) {
                restart();
            }
        }
    )

    window.addEventListener("resize", function () {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        background.width = app.screen.width;
        background.height = app.screen.height;
    });
}
