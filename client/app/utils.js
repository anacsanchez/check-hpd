export const isValidAddress = (input) => {
    if (!input.length) {
        return false;
    }
    return !!input.match(/[\w\d-]+\s[\w\d].*/);
};

export const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric'});
};