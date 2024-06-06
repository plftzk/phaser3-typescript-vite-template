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

type ShorthandPadding = {
    pt: integer
    pr: integer
    pb: integer
    pl: integer
}

type ShorthandMargin = {
    mt: integer
    mr: integer
    mb: integer
    ml: integer
}

type ShorthandBorder = {
    bt: integer
    br: integer
    bb: integer
    bl: integer
    btColor: Color
    brColor: Color
    bbColor: Color
    blColor: Color
    btType: string
    brType: string
    bbType: string
    blType: string
    btAlpha: number
    brAlpha: number
    bbAlpha: number
    blAlpha: number
}

type ShorthandBackground = {
    type: string,
    img: string
    position: string
}

type Padding = string | ShorthandPadding;
type Margin = string | ShorthandMargin;
type Border = string | ShorthandBorder;
type Background = ShorthandBackground;

interface LineBase {
    color?: Color
    lineWidth?: integer
    alpha?: number
}

interface SolidLine extends LineBase {
    x1: integer
    x2: integer
    y1: integer
    y2: integer
}

interface HVSolidLine extends LineBase {
    x: integer
    y: integer
    l: integer
}

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

interface ComDiv extends ComBase {
    padding?: Padding
    margin?: Margin
    border?: Border
    background?: Partial<Background>[] | Partial<Background>
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
