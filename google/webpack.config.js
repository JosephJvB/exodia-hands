const path = require('path')

module.exports = {
  target: 'node',
  devtool: 'inline-cheap-module-source-map',
  entry: path.join(__dirname, 'src/function.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'function.js',
    libraryTarget: 'commonjs2',
  },
  externals: [], //process.env.NODE_ENV === 'development' ? [] : ['aws-sdk'],
  mode: process.env.NODE_ENV || 'production',
  node: false,
  devtool: '',
  optimization: {
    minimize: false, // minimize has little performance improvement, and makes stack traces harder to read
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: { node: '12' }, useBuiltIns: 'usage', corejs: 3 }
                ]
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        ]
      },
    ]
  },
}