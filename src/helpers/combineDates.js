export const combineDates = (dateNum, secDateNum) => {
    if (typeof (dateNum) === 'number' && typeof (secDateNum) === 'number') {
        const date = new Date(dateNum * 1000).toUTCString().split(' ');
        const secDate = new Date(secDateNum * 1000).toUTCString().split(' ');
        return date[2] + ' ' + date[1] + ' - ' + secDate[1] + ' ' + date[3];
    }
    return null;
}