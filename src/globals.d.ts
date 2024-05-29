interface ComBase {
    x: integer
    y: integer
    w: integer
    h: integer
}

interface ComRadiusAttr extends ComBase {
    tl: integer
    tr: integer
    bl: integer
    br: integer
}

type Color = string | number;
type FontSize = string | number;

type Border = {
    topWidth: number
    topColor: Color
    rightWidth: number
    rightColor: Color
    bottomWidth: number
    bottomColor: Color
    leftWidth: number
    leftColor: Color
} | number;

interface TextDecorator {
    border: Border
}

interface ComOptions extends ComBase {
    text: string
    fontSize: FontSize
    textDecorator: TextDecorator | boolean
    color: Color
    fillColor: Color
    r: integer | ComRadiusAttr
    texture: string | Phaser.Textures.Texture
}

interface ComStruct {
    type: string
    option: Partial<ComOptions>
}
