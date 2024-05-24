import '/@/style/global.scss';
import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

declare module 'phaser' {
    interface Scene {
        rexUI: RexUIPlugin;
    }
}

import ReaderScene from './ReaderScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'app',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade'
    },
    scene: [ReaderScene],
    loader: {
        crossOrigin: 'anonymous'          // 避免图片跨域
    },
    render: {
        antialias: true,                  // 抗锯齿，建议开
        transparent: true                 // Canvas容器背景透明，如果有和DOM有交互时这项可以开，记得把背景色关掉
    },
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
        }]
    }
}

export default new Phaser.Game(config)
