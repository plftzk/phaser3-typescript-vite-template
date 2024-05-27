import Container = Phaser.GameObjects.Container;
import {hexStr2Num} from "/@/util/color";

export default class JsonComBuilder {
    private readonly scene: Phaser.Scene;
    private readonly container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, x: integer, y: integer) {
        this.scene = scene;
        this.container = new Container(scene, x, y);
    }

    build(configs: ComStruct[]) {

        configs.map((config) => {
            let com;
            switch (config.type) {
                case 'rectangle':
                    com = this.buildRectangle(config.conf);
                    break;
                case 'roundRectangle':
                    com = this.buildRoundRectangle(config.conf);
                    break;
                case 'text':
                    com = this.buildText(config.conf);
                    break;
                case 'button':
                    this.buildButton(config.conf);
                    break;
            }
            if (com) {
                this.container.add(com);
            }
        })

        return this.container;
    }

    buildRectangle(conf: ComConf) {
        return new Phaser.GameObjects.Rectangle(this.scene, 0, 0, conf.w, conf.h, 0x0f0fff);
    }

    buildText(conf: ComConf) {
        return new Phaser.GameObjects.Text(this.scene, 0, 0, conf.text || 'hello', {
            color: '#00f',
            fontSize: '16px'
        }).setOrigin(0.5, 0.5);
    }

    buildRoundRectangle(conf: ComConf) {
        const g = new Phaser.GameObjects.Graphics(this.scene);
        g.fillStyle(hexStr2Num('#333333'), 1);
        g.lineStyle(1, 0x000000, 1);
        g.fillRoundedRect(0, 0, conf.w || 60, conf.h || 20, 10);
        return g;
    }

    getCharSize(str: string, style: Phaser.Types.GameObjects.Text.TextStyle, option: any) {
        const chars = str.split('');
        const params: any = {
            gap: 0,
            boxWidth: 0,
            boxHeight: 0,
            paddingTop: 5,
            paddingRight: 12,
            paddingBottom: 5,
            paddingLeft: 12,
        };
        if (option) {
            Object.assign(params, option);
        }
        let text = null;
        let rowMaxCharNum = 0;
        let boxWidth = params.boxWidth;
        let boxHeight = params.boxHeight;
        let charWidth = 0;
        let charHeight = 0;
        if (chars.length > 0) {
            const char = chars[0];
            text = new Phaser.GameObjects.Text(this.scene, -1000, -1000, char, style);
            charWidth = text.width;
            charHeight = text.height;
            if (boxWidth) {
                const boxValidWidth = params.boxWidth - params.paddingRight - params.paddingLeft;
                if (text.width) {
                    rowMaxCharNum = Math.floor(boxValidWidth / text.width);
                }
            } else {
                boxWidth = params.paddingRight
                    + params.paddingLeft
                    + text.width * chars.length
                    + (chars.length - 1) * params.gap;
            }
            if (boxHeight) {
                // todo
            } else {
                boxHeight = charHeight + params.paddingTop + params.paddingBottom;
            }
            if (chars.length > 1) {
                text.setText(str);
            }
        }
        const {
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
        } = params;
        return {
            text,
            charWidth,
            charHeight,
            boxWidth,
            boxHeight,
            rowMaxCharNum,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
        }
    }

    buildButton(conf: ComConf) {
        const textInfo = this.getCharSize(conf.text || '', {
            fontSize: 15,
            color: '#333',
        }, {});
        const {
            text,
            boxWidth,
            boxHeight,
            paddingTop,
            paddingLeft
        } = textInfo;
        const roundRectangle = this.buildRoundRectangle({
            w: boxWidth,
            h: boxHeight,
            fillColor: conf.backgroundColor || ''
        });
        this.container.add(roundRectangle);
        if (text) {
            // text.setOrigin(0.5, 0.5);
            // text.setAlign('center');
            text.setPosition(paddingLeft, paddingTop);
            this.container.add(text);
        }

        console.log(`[LOG] textInfo`, textInfo);
    }
}
