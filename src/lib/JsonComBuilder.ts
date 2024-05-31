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
                    com = this.buildRectangle(<ComRectangle>conf.option);
                    break;
                case 'roundRect':
                    com = this.buildRoundRect(conf.option);
                    break;
                case 'text':
                    com = this.buildText(conf.option);
                    break;
                case 'textBoard':
                    this.buildTextBoard(<ComTextBoard>conf.option);
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
            color: 0x000000,
            fontSize: '16px',
            text: '',
            textDecorator: false
        } as ComOptions, partComAttr);
    }

    buildRectangle(option: ComRectangle) {
        return new Rectangle(this.scene, option.x, option.y, option.w, option.h, toHexColor(option.fillColor));
    }

    buildDashLine(option: DashLine) {
        const graphics = new Graphics(this.scene);
        const color = option.color || 0x000000;
        const lineWidth = option.lineWidth || 1;
        graphics.lineStyle(lineWidth, toHexColor(color));
        const {x1, x2, y1, y2} = option;
        const dashLength = option.dashLength || 10;
        const gapLength = option.gapLength || 10;
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

    buildHDashLine(option: HVDashLine) {
        this.buildDashLine({
            x1: option.x,
            x2: option.x + option.l,
            y1: option.y,
            y2: option.y,
            ...option
        })
    }

    buildVDashLine(option: HVDashLine) {
        this.buildDashLine({
            x1: option.x,
            x2: option.x,
            y1: option.y,
            y2: option.y + option.l,
            ...option
        })
    }

    div(option: ComDiv) {

    }

    buildText(option: Partial<ComOptions>) {
        const o: ComOptions = this.fillComAttr(option);
        const text = new Phaser.GameObjects.Text(this.scene, o.x, o.y, o.text, {
            color: hex2Str(o.color),
            fontSize: unitizeSize(o.fontSize)
        });

        const comList: any[] = [text];
        if (o.textDecorator) {
            const tb = text.getBounds();
            const tw = tb.width;
            const th = tb.height;

            const bound = new Rectangle(this.scene, tw / 2, th / 2, tw, th, 0x666666, 0.5);
            bound.setStrokeStyle(1, 0x000000);
            comList.push(bound);
        }
        return comList
    }

    buildRoundRect(option: Partial<ComOptions>) {
        const g = new Phaser.GameObjects.Graphics(this.scene);
        const o: ComOptions = this.fillComAttr(option);
        if (option.color) {
            g.fillStyle(toHexColor(option.color), 1);
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

    buildTextBoard(option: ComTextBoard) {
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
        console.log(`[LOG]`, boxWidth / 2);
        const roundRect = this.buildRectangle({
            x: boxWidth / 2,
            y: 0,
            w: boxWidth,
            h: boxHeight,
            fillColor: option.fillColor
        });
        this.container.add(roundRect);
        if (text) {
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
