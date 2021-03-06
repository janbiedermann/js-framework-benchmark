const path = require('path');
const OwlResolver = require('opal-webpack-loader/resolver');

const common_config = {
    target: 'web',
    context: path.resolve(__dirname, '../app'),
    mode: "production",
    optimization: {
        minimize: true
    },
    performance: {
        maxAssetSize: 20000000,
        maxEntrypointSize: 20000000
    },
    resolve: {
        plugins: [
            new OwlResolver('resolve', 'resolved') // resolve ruby files
        ],
        alias: {
            'react': 'nervjs',
            'react-dom': 'nervjs',
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
                            sourceMap: false,
                            hmr: false
                        }
                    }
                ]
            }
        ]
    }
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
