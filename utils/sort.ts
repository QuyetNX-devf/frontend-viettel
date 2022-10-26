export const mapOder = (arr: any, order: any, key: any) => {
    arr.sort((a: any, b: any) => order.indexOf(a[key]) - order.indexOf(a[key]));
    return arr;
};
