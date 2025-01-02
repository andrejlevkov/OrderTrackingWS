function formatDate(date) {
    const pad = (num) => (num < 10 ? '0' + num : num); // Helper function to pad single digits
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getDateDifference(date1, date2){
    return (date2 - date1)/60000;
}

module.exports = {formatDate, getDateDifference}