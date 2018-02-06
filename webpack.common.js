const path = require('path');
const webpack = require('webpack');
var ROOT_PATH = __dirname;

var fs = require('fs');
var SOURCES_PATH = path.join(ROOT_PATH, 'src/js');
var ASSET_PATH = path.join(ROOT_PATH, 'src/assets/js');
var NODE_PATH = path.join(ROOT_PATH, 'node_modules');
var resolve = {
    modules: [SOURCES_PATH, ROOT_PATH, NODE_PATH, ASSET_PATH],
    alias: {
        //  也可以不写
        jquery: 'src/assets/js/jquery.min.js',
        bluebird: 'src/assets/js/bluebird.js',
        zlib: 'src/assets/js/gunzip.min.js',
        hammerjs: 'src/assets/js/hammer.js',
        leapjs: 'src/assets/js/leap.js',
        OSG: 'src/assets/js/OSG.js',
        P: 'src/assets/js/bluebird.js',

    }
};

var externals = [
    {
        jquery: {
            root: '$',
            commonjs2: 'jquery',
            commonjs: 'jquery',
            amd: 'jquery'
        },
        OSG: {
            root: 'OSG',
            commonjs2: 'OSG',
            commonjs: 'OSG',
            amd: 'OSG'
        },
        P: {
            root: 'P',
            commonjs2: 'P',
            commonjs: 'P',
            amd: 'P'
        },
        JSZip: {
            root: 'JSZip',
            commonjs2: 'JSZip',
            commonjs: 'JSZip',
            amd: 'JSZip'
        }
    }
];

function getEntry() {
    var dir = path.resolve(process.cwd(), 'src/js');
    var matchs = [], entrys = {};
    fs.readdirSync(dir).forEach(function (filename) {
        var path = dir + "/" + filename
        var stat = fs.statSync(path)
        if (stat && stat.isDirectory()) {
            path = path + "/" + filename;
            entrys[filename] = [path, 'js'].join('.');
        }
        else {
            matchs = filename.match(/(.+)\.js$/);
            if (matchs) {
                entrys[matchs[1]] = path;
            }
        }
    })

    return entrys;
}

module.exports = {
    entry: getEntry(),
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        })

    ],
    externals: externals,
    output: {
        filename: '[name].js',//.[chunkhash]
        chunkFilename:
            "[name].[chunkhash].js",
        path: path.resolve(__dirname, 'dist/static/js/'),
        libraryTarget: 'umd'
    },
    resolve: resolve
    ,
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};