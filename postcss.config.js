// postcss.config.js
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: [
                "> 0.01%"
            ]
        })
    ]
}
