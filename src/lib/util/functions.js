module.exports = {
    searchQuery: (query, toSearch) =>
        new RegExp(`.*${query.split(" ").join(".*")}.*`, "gi").test(toSearch),
    random: (max, min) => Math.floor(Math.random() * max) + min,

};