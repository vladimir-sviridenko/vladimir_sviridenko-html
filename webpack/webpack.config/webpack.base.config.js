const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const environment = require("../environment");

const PATHS = {
  root: path.join(__dirname, "../"),
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist")
}

const ENV = process.env.NODE_ENV || environment.DEV;
const isLiveServer = (ENV === environment.SERVER);
const isDevelopment = (ENV === environment.DEV) || isLiveServer;

const baseStyleLoaders = [
  isLiveServer ? "style-loader" : MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: { sourceMap: isDevelopment }
  }, {
    loader: "postcss-loader",
    options: { sourceMap: isDevelopment ? "inline" : false, config: { path: PATHS.root } }
  }
];

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    index: path.join(PATHS.src, "index.ts")
  },
  output: {
    path: PATHS.dist,
    filename: isDevelopment ? "[name].js" : "[name].[contenthash:7].js",
    chunkFilename: isDevelopment ? "[name].js" : "[name].[contenthash:7].js",
    library: "[name]"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ["*", ".ts", ".js"]
  },
  resolveLoader: {
    modules: ["node_modules"],
    moduleExtensions: ["-loader"],
    extensions: ["*", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ["babel-loader", "tslint-loader"]
      }, {
        test: /\.html$/,
        loader: "html-loader"
      }, {
        test: /\.css$/,
        use: [...baseStyleLoaders]
      }, {
        test: /\.scss$/,
        use: [
          ...baseStyleLoaders,
          {
            loader: "sass-loader",
            options: { sourceMap: isDevelopment }
          }
        ]
      }, {
        test: /\.(woff2?$|ttf$|eot$|otf)$/,
        loader: "file-loader",
        options: { name: isDevelopment ? "[name].[ext]" : "[name].[contenthash:7].[ext]", outputPath: "assets/fonts" }
      }, {
        test: /\.(svg$|png|jpe?g|gif)$/,
        loader: "file-loader",
        options: { name: isDevelopment ? "[name].[ext]" : "[name].[contenthash:7].[ext]", outputPath: "assets/images" }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      filename: isDevelopment ? "./index.html" : "./index.[contenthash:7].html",
      template: path.join(PATHS.src, "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "styles.css" : "styles.[contenthash:7].css"
    })
  ],
  resolve: {
    alias: {
      interfaces: path.join(PATHS.src, "/components/interfaces"),
      enums: path.join(PATHS.src, "/components/enums"),
      classes: path.join(PATHS.src, "/components/classes"),
      decorators: path.join(PATHS.src, "/components/decorators"),
      fonts: path.join(PATHS.src, "/assets/fonts"),
      images: path.join(PATHS.src, "/assets/images"),
      styles: path.join(PATHS.src, "/styles")
    },
    extensions: ['.ts', '.scss', ".html", ".js"],
  },
}