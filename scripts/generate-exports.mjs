import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pkgPath = path.join(root, "package.json");
const tsupPath = path.join(root, "tsup.config.ts");

const componentDir = path.join(root, "src/components");
const entries = {
  utils: "src/lib/utils.ts",
  "lib/utils/date": "src/lib/utils/date.ts",
  "lib/utils/currency": "src/lib/utils/currency.ts",
  "lib/utils/url": "src/lib/utils/url.ts",
  "lib/filters/constants": "src/lib/filters/constants.ts",
  "hooks/use-mobile": "src/hooks/use-mobile.ts",
  form: "src/components/form/index.ts",
  "data-table": "src/components/data-table/index.ts",
};

for (const file of fs.readdirSync(componentDir)) {
  if (!file.endsWith(".tsx")) continue;
  if (file.includes(".test.") || file.includes(".spec.")) continue;
  const name = file.replace(/\.tsx$/, "");
  entries[name] = `src/components/${name}.tsx`;
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const exportsMap = {
  "./theme.css": "./dist/theme.css",
  "./package.json": "./package.json",
};

for (const key of Object.keys(entries).sort()) {
  exportsMap[`./${key}`] = {
    types: `./dist/${key}.d.ts`,
    import: `./dist/${key}.js`,
  };
}

pkg.exports = exportsMap;
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

const entryList = Object.entries(entries)
  .map(([k, v]) => `  "${k}": "${v}"`)
  .join(",\n");

const tsup = `import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
${entryList}
  },
  format: ["esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  treeshake: true,
});
`;

fs.writeFileSync(tsupPath, tsup);
console.log(`Generated ${Object.keys(entries).length} entry points`);
