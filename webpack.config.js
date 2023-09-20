const path = require('path');

module.exports = {
    mode: 'development',
    entry: 
    {
        main: path.resolve(__dirname, 'src', 'main.js')
    },
    output: 
    {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'   // name is from entry main, therefor main.js
    }
}

