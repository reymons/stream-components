const plName = "ManifestWebpackPlugin";

class ManifestWebpackPlugin {
  constructor({ filename }) {
    this.filename = filename;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(plName, compilation => {
      compilation.hooks.afterProcessAssets.tap(plName, () => {
        const result = {
          js: [],
          css: []
        };
        Object.keys(compilation.assets).forEach(name => {
          if (name.endsWith(".js")) result.js.push(name);
          else if (name.endsWith(".css")) result.css.push(name);
        });
        const json = JSON.stringify(result, undefined, 2);
        compilation.assets[this.filename] = {
          source: () => json,
          size: () => json.length
        };
      });
    });
  }
}

module.exports = ManifestWebpackPlugin;
