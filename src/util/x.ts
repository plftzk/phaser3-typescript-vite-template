import Container = Phaser.GameObjects.Container;

export function comRectangle(scene: Phaser.Scene, com: Com) {
    return new Phaser.GameObjects.Rectangle(scene, 100, 100, com.w, com.h, 0x00ffff);
}

export function comButton(scene: Phaser.Scene, com: Com) {
    return new Phaser.GameObjects.Rectangle(scene, 100, 100, com.w, com.h, 0x00ffff);
}

export function json2Com(scene: Phaser.Scene, jo: JsonCom) {
    const config = Object.assign({
        x: 0,
        y: 0
    }, jo);
    const container = new Container(scene, config.x, config.y);
    config.children.map((o: Com) => {
        const {type} = o;
        if (type === 'rectangle') {
            const rectangle = comRectangle(scene, o);
            container.add(rectangle);
        } else {

        }
    });
    return container;
}
