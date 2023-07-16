const getDate = () =>{
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric"};
    return new Date().toLocaleDateString("en-GB", options);
}
const getDay = () =>{
    return "sunday";
}

module.exports = {getDate, getDay};
