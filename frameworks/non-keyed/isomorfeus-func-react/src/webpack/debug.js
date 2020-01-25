const path = require('path');
const OwlResolver = require('opal-webpack-loader/resolver'); // to resolve ruby files

const common_config = {
    target: 'web',
    context: path.resolve(__dirname, '../app'),
    mode: "development",
    optimization: {
        minimize: false // dont minimize for debugging
    },
    performance: {
        maxAssetSize: 20000000,
        maxEntrypointSize: 20000000
    },
    // use one of these below for source maps
    // devtool: 'source-map', // this works well, good compromise between accuracy and performance
    // devtool: 'cheap-eval-source-map', // less accurate
    devtool: 'inline-source-map', // slowest
    // devtool: 'inline-cheap-source-map',
    resolve: {
        plugins: [
            // this makes it possible for webpack to find ruby files
            new OwlResolver('resolve', 'resolved')
        ],
        alias: {
            'react-dom': 'react-dom/profiling',
            'schedule/tracing': 'schedule/tracing-profiling',
        }
    },
    module: {
        rules: [
            {
                // opal-webpack-loader will compile and include ruby files in the pack
                test: /(\.js)?\.rb$/,
                use: [
                    {
                        loader: 'opal-webpack-loader',
                        options: {
                            sourceMap: true,
                            hmr: false
                        }
                    }
                ]
            }
        ]
    },
};

const bench_config = {
    entry: {
        "benchmark": [path.resolve(__dirname, '../app/imports/benchmark.js')],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/'
    }
};

const benchmark = Object.assign({}, common_config, bench_config);

module.exports = [ benchmark ];
