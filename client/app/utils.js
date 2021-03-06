export const isValidAddress = (input) => {
    if (!input.length) {
        return false;
    }
    return !!input.match(/[\w\d-]+\s[\w\d].*/);
};