import Container = Phaser.GameObjects.Container;
import Image = Phaser.GameObjects.Image;
import Rectangle = Phaser.GameObjects.Rectangle;
import Graphics = Phaser.GameObjects.Graphics;
import {hex2Str, unitizeSize, toHexColor} from "/@/util/style";

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
                if (Array.isArray(com)) {
                    com.map((item) => {
                        this.container.add(item);
                    });
                } else {
                    this.container.add(com);
                }
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
            fontSize: '16px',
            text: '',
            textDecorator: false
        } as ComOptions, partComAttr);
    }

    buildRectangle(option: Partial<ComOptions>) {
        return new Rectangle(this.scene, 0, 0, option.w, option.h, 0x0f0fff);
    }

    buildDashLine() {
        const graphics = new Graphics(this.scene);
        graphics.lineStyle(1, 0xff0000);
        const x1 = 10;
        const x2 = 100;
        const y1 = 10;
        const y2 = 10;
        const dashLength = 10;
        const gapLength = 5;
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const dashGapLength = dashLength + gapLength;
        const dashCount = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashGapLength);
        const dashX = deltaX / dashCount;
        const dashY = deltaY / dashCount;
        for (let i = 0; i < dashCount; i++) {
            const startX = x1 + i * dashX;
            const startY = y1 + i * dashY;
            const endX = startX + dashX * (dashLength / dashGapLength);
            const endY = startY + dashY * (dashLength / dashGapLength);
            graphics.lineBetween(startX, startY, endX, endY);
        }
        this.container.add(graphics);
        this.scene.add.existing(graphics);
    }

    buildText(option: Partial<ComOptions>) {
        const o: ComOptions = this.fillComAttr(option);
        const text = new Phaser.GameObjects.Text(this.scene, o.x, o.y, o.text, {
            color: hex2Str(o.color),
            fontSize: unitizeSize(o.fontSize)
        }).setOrigin(0.5, 0.5);

        const comList: any[] = [text];
        if (o.textDecorator) {
            const tb = text.getBounds();
            const tw = tb.width;
            const th = tb.height;

            const bound = new Rectangle(this.scene, 0, 0, tw, th, 0x666666, 0.5);
            bound.setStrokeStyle(1, 0x000000);
            comList.push(bound);
        }
        return comList
    }

    buildRoundRect(option: Partial<ComOptions>) {
        const g = new Phaser.GameObjects.Graphics(this.scene);
        const o: ComOptions = this.fillComAttr(option);
        if (option.fillColor) {
            g.fillStyle(toHexColor(option.fillColor), 1);
        }
        g.fillRoundedRect(o.x, o.y, o.w, o.h, o.r);
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
