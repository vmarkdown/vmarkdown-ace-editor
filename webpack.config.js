const path = require('path');
const merge = require('webpack-merge');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: "[name]",
        libraryExport: 'default'
    },
    module: {
        rules: [
        ]
    },
    externals: {
    },
    plugins: [

    ],
    devServer: {
        contentBase: path.join(__dirname, "examples")
    }
};

module.exports = [
    merge(config, {
        entry: {
            'ace': path.resolve(__dirname, 'src/ace.js'),
        },
        output: {
        },
        externals: {

        }
    }),
    merge(config, {
        entry: {
            'vmarkdown-ace-editor': path.resolve(__dirname, 'src/index.js'),
        },
        output: {
            library: "AceEditor",
        },
        externals: {
            'ace': 'ace'
        }
    })
];

