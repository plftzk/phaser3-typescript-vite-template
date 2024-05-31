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

interface DashLineBase {
    dashLength?: integer
    gapLength?: integer
    color?: Color
    lineWidth?: integer
}

interface DashLine extends DashLineBase {
    x1: integer
    x2: integer
    y1: integer
    y2: integer
}

interface HVDashLine extends DashLineBase {
    x: integer
    y: integer
    l: integer
}

interface TextDecorator {
    border: Border
}

interface ComOptions extends ComBase {
    text: string
    fontSize: FontSize
    textDecorator: TextDecorator | boolean
    color: Color
    r: integer | ComRadiusAttr
    texture: string | Phaser.Textures.Texture
}

interface ComRectangle extends ComBase {
    fillColor: Color
}

interface ComTextBoard extends ComBase {
    text: string
    fillColor: Color
}

interface ComStruct {
    type: string
    option: Partial<ComOptions>
}
