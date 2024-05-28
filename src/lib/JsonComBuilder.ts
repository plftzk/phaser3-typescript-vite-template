import Container = Phaser.GameObjects.Container;
import Image = Phaser.GameObjects.Image;
import {toHexColor} from "/@/util/color";

export default class JsonComBuilder {
    private readonly scene: Phaser.Scene;
    private readonly container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, x: integer, y: integer) {
        this.scene = scene;
        this.container = new Container(scene, x, y);
    }

    build(configs: ComStruct[]) {
        configs.map((conf) => {
            let com;
            switch (conf.type) {
                case 'rectangle':
                    com = this.buildRectangle(conf.option);
                    break;
                case 'roundRect':
                    com = this.buildRoundRect(conf.option);
                    break;
                case 'text':
                    com = this.buildText(conf.option);
                    break;
                case 'textBoard':
                    this.buildTextBoard(conf.option);
                    break;
                case 'button':
                    this.buildButton(conf.option);
                    break;
            }
            if (com) {
                this.container.add(com);
            }
        })

        return this.container;
    }

    fillComAttr(partComAttr: Partial<ComOptions>): ComOptions {
        return Object.assign({
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            r: 0,
            color: 0,
            fillColor: 0,
            text: ''
        } as ComOptions, partComAttr);
    }

    buildRectangle(option: Partial<ComOptions>) {
        return new Phaser.GameObjects.Rectangle(this.scene, 0, 0, option.w, option.h, 0x0f0fff);
    }

    buildText(option: Partial<ComOptions>) {
        return new Phaser.GameObjects.Text(this.scene, 0, 0, option.text || 'hello', {
            color: '#00f',
            fontSize: '16px'
        }).setOrigin(0.5, 0.5);
    }

    buildRoundRect(option: Partial<ComOptions>) {
        const g = new Phaser.GameObjects.Graphics(this.scene);
        const opt: ComOptions = this.fillComAttr(option);
        if (option.fillColor) {
            g.fillStyle(toHexColor(option.fillColor), 1);
        }
        g.fillRoundedRect(opt.x, opt.y, opt.w, opt.h, opt.r);
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

    buildTextBoard(option: Partial<ComOptions>) {
        const textInfo = this.getCharSize(option.text || '', {
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
        const roundRect = this.buildRoundRect({
            w: boxWidth,
            h: boxHeight,
            fillColor: option.fillColor
        });
        this.container.add(roundRect);
        if (text) {
            // text.setOrigin(0.5, 0.5);
            // text.setAlign('center');
            text.setPosition(paddingLeft, paddingTop);
            this.container.add(text);
        }

        console.log(`[LOG] textInfo`, textInfo);
    }

    buildButton(option: Partial<ComOptions>) {
        const opt: ComOptions = this.fillComAttr(option);
        const bg = new Image(this.scene, opt.x, opt.y, opt.texture);
        this.container.add(bg);
    }

}
