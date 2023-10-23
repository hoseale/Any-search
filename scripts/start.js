const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ENV = process.env.NODE_ENV;
const dir = process.cwd();
const isProd = ENV === "production";

const compiler = webpack({
  entry: {
    option: path.resolve(dir, "./src/option/index.js"),
    popup: path.resolve(dir, "./src/popup/index.js"),
    background: path.resolve(dir, "./src/background/index.js"),
  },
  output: {
    path: path.resolve(dir, "./dist"),
    filename: "[name]/index.js",
  },
  mode: ENV || "development",
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    alias: {
      "@utils": path.resolve(dir, "./src/utils"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
      {
        test: "/.less$/",
        use: ["css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "option/index.html",
      chunks: ["option"],
      base: "./",
      template: path.resolve(dir, "./src/option/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "popup/index.html",
      chunks: ["popup"],
      template: path.resolve(dir, "./src/popup/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(dir, "src/images"),
          to: path.resolve(dir, "dist/images"),
        },
        {
          from: path.resolve(dir, "src/manifest.json"),
          to: path.resolve(dir, "dist/manifest.json"),
        },
      ],
    }),
    isProd && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  cache: false,
  devtool: isProd ? false : "cheap-source-map",
});

function showMsg(err, stats) {
  const str = stats.toString({
    // 增加控制台颜色开关
    colors: true,
  });
  console.log(str);
}

if (isProd) {
  compiler.run((err, stats) => {
    showMsg(err, stats);
    compiler.close((closeErr) => {
      process.exit();
    });
  });
} else {
  compiler.watch({}, (err, stats) => {
    showMsg(err, stats);
  });
}
