export function extend<T, U>(first: T, second: U): T & U {
    const result = <T & U>{};
    for (const k in first) {
        (<any>result)[k] = (<any>first)[k];
    }
    for (const k in second) {
        if (!Object.prototype.hasOwnProperty.call(result, k)) {
            (<any>result)[k] = (<any>second)[k];
        }
    }
    return result;
}
