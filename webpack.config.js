// const webpack = require('webpack')
const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

// const {parsed:dotenv} = require('dotenv').config({path: __dirname + '/.env'})

const {exec} = require('child_process')
exec('npm run build:unzip')

module.exports = (env, argv) => {

  const isProduction = argv.mode==='production'
  const mode = isProduction?'production':'development'

  // console.log('process.env', process.env, '\n')
  // console.log('dotenv', dotenv, '\n')
  // console.log('env', env, '\n')
  console.log('mode', mode, '\n')

  return {
    mode
    , entry: './src/index.tsx'
    , output: {
      path: path.resolve(__dirname, 'dist')
      , filename: 'bundle.js'
    }
    , devServer: {
      static: './public'
      , port: 1111
      // , historyApiFallback: true
      , hot: true
      // , proxy: {
      //   '/api': {
      //     target: 'http://localhost:0000'
      //     , secure: false
      //   }
      // }
    }
    , module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)?$/
          , use: 'babel-loader'
          , exclude: /node_modules/
        }
        // , {
        //   test: /\.scss$/
        //   , use: [
        //     'style-loader'
        //     , 'css-loader'
        //     , 'sass-loader'
        //   ]
        // }
        // , {
        //   test: /\.css$/
        //   , use: [
        //     'style-loader'
        //     , 'css-loader'
        //   ]
        // }
        // , {
        //   test: /\.(html|md)/
        //   , use: ['raw-loader']
        // }
        // , {
        //   test: /\.svg$/,
        //   use: ['@svgr/webpack']
        // }
        // , {
        //   test: /\.(png|jp(e*)g|gif)$/
        //   , use: [
        //     {
        //       loader: 'file-loader'
        //       , options: {
        //         name: 'images/[hash]-[name].[ext]'
        //       }
        //     }
        //   ]
        // }
      ]
    }
    , resolve: {
      extensions: [
        '.js'
        , '.jsx'
        , '.tsx'
        , '.ts'
        , '.json'
        , '.html'
      ]
    }
    , plugins: [
      // new webpack.DefinePlugin({
      //   'process.env.VERSION': JSON.stringify(require('./package.json').version)
      //   ,'process.env.API': JSON.stringify(dotenv&&dotenv.API||'/.netlify/functions/express/api')
      //   // ,'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
      // })
      // , new CopyWebpackPlugin({
      //   patterns: [
      //     { from: 'temp/icomoon/symbol-defs.svg', to: '../public/symbol-defs.svg'}
      //     , { from: 'public', to: './'}
      //   ]
      // })
    ]
    // , externals: {
    //   'saslprep': "require('saslprep')"
    // }
  }
}
