
function getTimeStamp(){
    // return timesStamp in ISO 8601.

    const now = new Date();

    const localTimestamp = now.toLocaleString();

    return localTimestamp;
    
}

module.exports = getTimeStamp;