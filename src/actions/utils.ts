export const isValid = (val: any): boolean => {
    const date = new Date(val);

    return date instanceof Date && !isNaN(date.valueOf());
}
