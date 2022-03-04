export const longDay = (num) => {
    if (typeof (num) === 'number') {
        return new Date(num * 1000).toLocaleString('en-us', { weekday: 'long' })
    }
    return null;
}