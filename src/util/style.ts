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
        '(\\d+)px( +(solid|dash))? +#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})',
        'i'
    );
    const matches = s.match(ptn);
    const b = <ShorthandBorder>{};
    if (Array.isArray(matches) && matches.length === 8) {
        b.bt = b.br = b.bb = b.bl = parseInt(matches[1]);
        if (matches[3]) {
            b.btType = b.brType = b.bbType = b.blType = matches[3];
        }
        if (matches[4]) {
            b.btColor = b.btColor = b.btColor = b.btColor = '#' + matches[4];
        }
    }
    return b;
}

export function border(v: Border) {
    if (typeof v === 'string') {
        parseBorderString(v);
    }
    return <ShorthandBorder>v;
}
