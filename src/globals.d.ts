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

interface ComOptions extends ComBase {
    text: string
    color: Color
    fillColor: Color
    r: integer | ComRadiusAttr
    texture: string | Phaser.Textures.Texture
}

interface ComStruct {
    type: string
    option: Partial<ComOptions>
}
