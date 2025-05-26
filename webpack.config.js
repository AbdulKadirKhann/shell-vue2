const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  output: {
    publicPath: 'https://AbdulKadirKhann.github.io/shell-vue2/shell-vue2/',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell_vue2',
      remotes: {
        users_app_vue3:
          'users_app_vue3@https://AbdulKadirKhann.github.io/users-app-vue3/users-app-vue3/remoteEntry.js',
        edit_user_app_vue3:
          'edit_user_app_vue3@https://AbdulKadirKhann.github.io/edit-user-app-vue3/edit-user-app-vue3/remoteEntry.js',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^2.7.0',
        },
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'vue', 'ts'],
      fix: true,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    port: 8080,
    static: path.join(__dirname, 'dist'),
    hot: true,
    historyApiFallback: true,
  },
}
