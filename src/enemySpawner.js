export default class EnemySpawner {
    constructor({ app , createEnemy}){
        this.app = app;
        this.createEnemy = createEnemy;

        this.enemies = [];
        const spawnInterval = 500;
        this.interval = setInterval(() => {
            this.spawnEnemy();
        }, spawnInterval);
    }

    spawnEnemy() {
        if (this.app.game){
            this.enemies.push(this.createEnemy());
        }
    }

    stopSpawner(){
        //clearInterval(this.interval);
    }
}