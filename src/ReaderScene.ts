import JsonComBuilder from "/@/lib/JsonComBuilder";

export default class ReaderScene extends Phaser.Scene {
    private earth: null | Phaser.GameObjects.Image;

    constructor() {
        super('reader');
        this.earth = null;
    }

    preload() {
        this.load.image('earth', 'assets/img/square-earth.png');
        this.load.image('btnBg', 'assets/img/button-bg.png');
    }

    update(time: number) {
        if (this.earth) {
            this.earth.rotation += 0.005;
            this.earth.y = this.earth.y + Math.sin(time / 1000 * 2);
        }
    }

    create() {
        this.cameras.main.setBackgroundColor('#fff');

        const chars = 'あ猫阿狗。い言不合。う霾天气。え而不伤。お心汤血。\n' +
            'か车司机。き死回生。く笑不得。け天辟地。こ人心弦。\n' +
            'さ逼兮兮。し装革履。す心裂肺。せ翁失马。そ肠刮肚。\n' +
            'た山之石。ち上八下。つ瓜群众。て平盛世。と路太深。\n' +
            'な喊助威。に死我活。ぬ发冲冠。ね人寻味。の羞成怒。\n' +
            'は利波特。ひ皮笑验。ふ如东海。へ阔天空。ほ眼金睛。\n' +
            'ま咪宝贝。みみ之音。む以子贵。め头苦干。も哭老鼠。\n' +
            'や縮软件。ゆ谊小船。よ维万貫。らら扯扯。る管伤身。\n' +
            'れ日方长。ろ司机稳。わ地三尺。を皇非酋。ん将仇报。';
        // const text = this.add.text(0, 0, chars, {
        //     color: '#333',
        //     fontSize: '20px'
        // });
        // console.log(`[LOG]`, text.width, text.height);
        const strList = chars.split('');
        const lineHeight = 1.2;
        let rowIndex = 0;
        let unitCharIndex = 0;
        let largerCharSize = null;
        let charSize = null;
        const xGap = 5;
        const yGap = 10;
        const drawingCharPosition = {
            x: 10,
            y: 10,
        };
        for (const i in strList) {
            const char = strList[i];
            let fontSize = 40;
            if (unitCharIndex === 0) {
                fontSize = 60;
            }
            if (char === '\n') {
                rowIndex++;
                drawingCharPosition.x = xGap;
                continue;
            }
            const text = this.add.text(-1000, -1000, char, {
                fontFamily: '隶书',
                color: '#ecc100',
                fontSize: fontSize + 'px',
                align: 'center'
            });
            const textWidth = text.width;
            const textHeight = text.height;
            if (unitCharIndex === 0) {
                if (!largerCharSize) {
                    largerCharSize = {width: textWidth, height: textHeight};
                }
            } else {
                if (!charSize) {
                    charSize = {width: textWidth, height: textHeight};
                }
            }
            if (largerCharSize) {
                drawingCharPosition.y = yGap + rowIndex * largerCharSize.height * lineHeight;
                if (unitCharIndex > 0 && charSize) {
                    drawingCharPosition.y += largerCharSize.height - charSize.height;
                }
                const x = drawingCharPosition.x + textWidth / 2;
                drawingCharPosition.x = x + textWidth / 2 + 10;
                const y = drawingCharPosition.y;
                text.setX(x);
                text.setY(y);
                if (unitCharIndex === 0) {
                    text.setColor('#128f6b');
                }
            }

            const tb = text.getBounds();
            const tw = tb.width;
            const th = tb.height;

            this.add.rectangle(
                text.x + tw / 2, // 矩形的X坐标
                text.y + th / 2, // 矩形的Y坐标
                tw, // 矩形的宽度
                th, // 矩形的高度
                0x333333, // 矩形的填充颜色
                0.1 // 矩形的透明度
            );


            if (char === '。') {
                unitCharIndex = 0;
            } else {
                unitCharIndex++;
            }
        }

        // this.renderer.snapshot((img: any) => {
        //     const link = document.createElement('a');
        //     link.href = img.src;
        //     link.download = 'screenshot.png';
        //     link.click();
        // });
        this.earth = this.add.image(window.innerWidth - 200, 600, 'earth');
        const com = new JsonComBuilder(this, 200, 200);


        this.add.existing(com.build([{
            type: 'button',
            option: {
                x: window.innerWidth - 450,
                y: window.innerHeight - 300,
                w: 160,
                h: 90,
                texture: 'btnBg'
            }
        }]));
    }
}
