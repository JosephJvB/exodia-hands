const path = require('path')
const AwsSamPlugin = require('aws-sam-webpack-plugin')

const awsSamPlugin = new AwsSamPlugin({
  projects: {
    main: path.join(__dirname, '../template.yaml')
  }
})

module.exports = {
  target: 'node',
  devtool: 'inline-cheap-module-source-map',
  entry: () => awsSamPlugin.entry(),
  output: {
    filename: (chunkData) => awsSamPlugin.filename(chunkData),
    libraryTarget: 'commonjs2',
    path: path.resolve('.')
  },
  externals: process.env.NODE_ENV === 'development' ? [] : ['aws-sdk'],
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
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [awsSamPlugin]
}