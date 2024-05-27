export function hexStr2Num(str: string): number {
    str = str.replace('#', '');
    const strList = str.split('');
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
