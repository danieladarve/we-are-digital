module.exports = {
    proxy: "localhost:3000",
    files: [
        "public/assets/*.css", 
        "public/assets/*.js"
    ],
    ignore: ["node_modules"],
    reloadDelay: 10,
    ui: false,
    notify: false,
    port: 3001,
};