import Phaser from 'phaser'

export default class ReaderScene extends Phaser.Scene {
    constructor() {
        super('reader');
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
        const xGap = 10;
        const yGap = 10;
        const lastCharPosition = {
            x: 10,
            y: 10,
        };
        for (const i in strList) {
            const char = strList[i];
            let fontSize = 20;
            if (unitCharIndex === 0) {
                fontSize = 40;
            }
            if (char === '\n') {
                rowIndex++;
                lastCharPosition.x = xGap;
                continue;
            }
            const text = this.add.text(-1000, -1000, char, {
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
                lastCharPosition.y = yGap + rowIndex * largerCharSize.height * lineHeight;
                if (unitCharIndex > 0 && charSize) {
                    lastCharPosition.y += largerCharSize.height - charSize.height - 5;
                }
                const x = lastCharPosition.x + textWidth + 3;
                lastCharPosition.x = x;
                const y = lastCharPosition.y;
                text.setX(x - textWidth);
                text.setY(y);
                if (unitCharIndex === 0) {
                    text.setColor('#128f6b');
                }
            }
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

        this.rexUI.add.buttons({
            x: 400,
            y: 300,
            orientation: 0,
            buttons: [
                this.createButton('下载图片'),
            ],
            space: {item: 8}
        });

    }

    createButton(text: string) {
        return this.rexUI.add.label({
            width: 100,
            height: 40,
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x7b5e57),
            text: this.add.text(0, 0, text, {
                fontSize: '18px'
            }),
            space: {
                left: 10,
                right: 10,
            }
        });
    }
}
