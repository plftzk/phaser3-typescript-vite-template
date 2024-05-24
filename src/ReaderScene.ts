import Phaser from 'phaser'

export default class ReaderScene extends Phaser.Scene {
    constructor() {
        super('reader')
    }

    create() {
        const str = 'あ猫阿狗。い言不合。う霾天气。え而不伤。お心汤血。\n' +
        'か车司机。き死回生。く笑不得。け天辟地。こ人心弦。\n' +
        'さ逼兮兮。し装革履。す心裂肺。せ翁失马。そ肠刮肚。\n' +
        'た山之石。ち上八下。つ瓜群众。て平盛世。と路太深。\n' +
        'な喊助威。に死我活。ぬ发冲冠。ね人寻味。の羞成怒。\n' +
        'は利波特。ひ皮笑验。ふ如东海。へ阔天空。ほ眼金睛。\n' +
        'ま咪宝贝。みみ之音。む以子贵。め头苦干。も哭老鼠。\n' +
        'や縮软件。ゆ谊小船。よ维万貫。らら扯扯。る管伤身。\n' +
        'れ日方长。ろ司机稳。わ地三尺。を皇非酋。ん将仇报。';

        this.add.text(10, 10, str, {
            color: '#333',
            fontSize: '20px'
        });
    }
}
