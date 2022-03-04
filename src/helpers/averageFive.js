export const averageFive = (array) => {
    try {
        const resultArray = [...array];
        resultArray.splice(5, 6)
        return Math.round(array.reduce((prev, curr) => prev + curr.temp.day, 0) / array.length);
    } catch (error) {
        return error;
    }
}