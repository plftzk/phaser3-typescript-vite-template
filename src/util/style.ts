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
