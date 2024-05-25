import Container = Phaser.GameObjects.Container;

export default class JsonComBuilder {
    private y: integer;
    private x: integer;

    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, x: integer, y: integer) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.container = new Container(scene, x, y);
    }

    build(configs: ComConfig[]) {

        configs.map((config) => {
            let com;
            switch (config.type) {
                case 'rectangle':
                    com = this.buildRectangle();
            }

            this.container.add(com);
        })

        return this.container;
    }

    buildRectangle(conf: ComConfig) {
        return new Phaser.GameObjects.Rectangle(this.scene, 100, 100, conf.w, conf.h, 0x00ffff);
    }

    buildButton(conf: ComConfig) {
        return new Phaser.GameObjects.Rectangle(this.scene, 100, 100, conf.w, conf.h, 0x00ffff);
    }
}
