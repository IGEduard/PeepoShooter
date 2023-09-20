import { Sound } from "@pixi/sound";
let canShoot = false;

export default class ProjectileSpawner {
    constructor({ app, createProjectile }) {
        this.app = app;
        this.createProjectile = createProjectile;
        
        this.soundQuack = Sound.from('./assets/sounds/quack.mp3');
        this.soundQuack.volume = 0.07;

        this.app.stage.eventMode = 'static';
        this.app.stage.isInteractive();
        this.app.stage.on('pointerdown', () => {
            canShoot = true;
        });
        this.app.stage.on('pointerup', () => {
            canShoot = false;
        });
        this.projectiles = [];
        const spawnInterval = 200;
        this.interval = setInterval(() => {
            if (canShoot) {
                this.spawnProjectile();
            }
        }, spawnInterval);
    }

    spawnProjectile() {
        if (this.app.game) {
            this.soundQuack.play();
            this.projectiles.push(this.createProjectile());
        }
    }

    stopSpawner() {
        //clearInterval(this.interval);
    }
}


document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;
        if (keyName === " ") {// this is Space key
            canShoot = true;
        }
    }
)
document.addEventListener(
    "keyup",
    (event) => {
        const keyName = event.key;
        if (keyName === " ") {
            canShoot = false;
        }
    }
)