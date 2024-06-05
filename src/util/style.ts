export function hexString2Number(s: string): number {
    s = s.replace('#', '');
    const strList = s.split('');
    if (strList.length === 3) {
        const arr: string[] = [];
        strList.map((v) => {
            arr.push(v, v);
        });
        return parseInt(arr.join(''), 16);
    } else if (strList.length === 6) {
        return parseInt(strList.join(''), 16);
    }
    return 0;
}

export function hex2Str(v: string | number): string {
    if (typeof v === 'number') {
        return '#' + v.toString(16);
    }
    return v;
}

export function toHexColor(v: string | number): number {
    if (typeof v === 'string') {
        return hexString2Number(v);
    }
    return v;
}

export function unitizeSize(v: string | number, unit = 'px'): string {
    if (typeof v === 'number') {
        return `${v}${unit}`;
    }
    return v;
}

function parseBorderString(s: string) {
    const ptn = new RegExp(
        '(\\d+)(px)?( +(solid|dash))? +#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})',
        'i'
    );
    const matches = s.match(ptn);
    const b = <ShorthandBorder>{};
    if (Array.isArray(matches) && matches.length === 6) {
        b.bt = b.br = b.bb = b.bl = parseInt(matches[1]);
        if (matches[4]) {
            b.btType = b.brType = b.bbType = b.blType = matches[4];
        }
        if (matches[5]) {
            b.btColor = b.btColor = b.btColor = b.btColor = '#' + matches[5];
        }
    }
    return b;
}

export function border(v: Border | undefined | null) {
    if (!v) {
        v = {
            bt: 0,
            br: 0,
            bb: 0,
            bl: 0,
            btColor: 0x000000,
            brColor: 0x000000,
            bbColor: 0x000000,
            blColor: 0x000000,
            btType: 'solid',
            brType: 'solid',
            bbType: 'solid',
            blType: 'solid',
            btAlpha: 1,
            brAlpha: 1,
            bbAlpha: 1,
            blAlpha: 1,
        };
    } else if (typeof v === 'string') {
        v = parseBorderString(v);
    }
    return <ShorthandBorder>v;
}

function parseMarginString(s: string) {
    const ptn = new RegExp(
        '(\\d+)(px)?(\\s(\\d+)(px)?)?(\\s(\\d+)(px)?)?(\\s(\\d+)(px)?)?',
        'i'
    );
    const matches = s.match(ptn);
    const m = <ShorthandMargin>{
        mt: 0,
        mr: 0,
        mb: 0,
        ml: 0
    };
    if (Array.isArray(matches) && matches.length === 12) {
        const m1 = matches[1];
        const m2 = matches[4];
        const m3 = matches[7];
        const m4 = matches[10];
        if (m1) {
            const mt = parseInt(m1);
            m.mt = mt;
            m.mr = mt;
            m.mb = mt;
            m.ml = mt;
            if (m2) {
                const mr = parseInt(m2);
                m.mr = mr;
                m.mb = mt;
                m.ml = mr;
                if (m3) {
                    m.mb = parseInt(m3);
                    m.ml = mr;
                    if (m4) {
                        m.ml = parseInt(m4);
                    }
                }
            }
        }
    }
    return m;
}

export function margin(v: Margin | null | undefined) {
    if (!v) {
        v = {
            mt: 0,
            mr: 0,
            mb: 0,
            ml: 0
        }
    } else if (typeof v === 'string') {
        v = parseMarginString(v);
    }
    return <ShorthandMargin>v;
}

export function background(v: Partial<Background> | null | undefined) {
    const dv: Background = {
        img: '',
        position: 'left'
    };
    if (v) {
        Object.assign(dv, v);
    }
    return <ShorthandBackground>dv;
}
