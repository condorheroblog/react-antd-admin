import { defineFlatConfig } from "eslint-define-config";
import js from "@eslint/js";
import globals from "globals";
import parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJSXA11y from "eslint-plugin-jsx-a11y";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import pluginVitest from "eslint-plugin-vitest";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import parserJSON from "jsonc-eslint-parser";
import pluginJsonc from "eslint-plugin-jsonc";
import * as pluginImport from "eslint-plugin-import";
import pluginUnicorn from "eslint-plugin-unicorn";

export default defineFlatConfig([
	{
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		...js.configs.recommended,
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			...configPrettier.rules,
			...pluginPrettier.configs.recommended.rules,
		},
	},
	{
		plugins: {
			import: pluginImport,
		},
		rules: {
			// https://github.com/import-js/eslint-plugin-import/issues/2556
			// ...pluginImport.configs.recommended.rules,
			"import/first": "error",
			"import/no-duplicates": "error",
			"import/no-mutable-exports": "error",
			"import/no-named-default": "error",
			"import/no-self-import": "error",
			"import/no-webpack-loader-syntax": "error",
			"import/order": ["error", { "newlines-between": "always" }],
			"import/newline-after-import": "error",
		},
	},
	{
		plugins: {
			unicorn: pluginUnicorn,
		},
		rules: {
			// ...pluginUnicorn.configs.recommended.rules,
			// Pass error message when throwing errors
			"unicorn/error-message": "error",
			// Uppercase regex escapes
			"unicorn/escape-case": "error",
			// Array.isArray instead of instanceof
			"unicorn/no-instanceof-array": "error",
			// Ban `new Array` as `Array` constructor's params are ambiguous
			"unicorn/no-new-array": "error",
			// Prevent deprecated `new Buffer()`
			"unicorn/no-new-buffer": "error",
			// Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
			"unicorn/number-literal-case": "error",
			// textContent instead of innerText
			"unicorn/prefer-dom-node-text-content": "error",
			// includes over indexOf when checking for existence
			"unicorn/prefer-includes": "error",
			// Prefer using the node: protocol
			"unicorn/prefer-node-protocol": "error",
			// Prefer using number properties like `Number.isNaN` rather than `isNaN`
			"unicorn/prefer-number-properties": "error",
			// String methods startsWith/endsWith instead of more complicated stuff
			"unicorn/prefer-string-starts-ends-with": "error",
			// Enforce throwing type error when throwing error while checking typeof
			"unicorn/prefer-type-error": "error",
			// Use new when throwing error
			"unicorn/throw-new-error": "error",
			// Enforce a case style for filenames
			// "unicorn/filename-case": "error",
		},
	},
	{
		files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
		languageOptions: {
			parser: parserTypeScript,
		},
		plugins: {
			"@typescript-eslint": pluginTypeScript,
		},
		rules: {
			...pluginTypeScript.configs.strict.rules,
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/no-non-null-assertion": "off",
		},
	},
	{
		plugins: {
			"jsx-a11y": pluginJSXA11y,
		},
		rules: {
			...pluginJSXA11y.configs.recommended.rules,
		},
	},
	{
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: {
			react: pluginReact,
			"react-hooks": pluginReactHooks,
		},
		rules: {
			...pluginReact.configs.recommended.rules,
			...pluginReactHooks.configs.recommended.rules,
			"react/react-in-jsx-scope": "off",
			"react-hooks/exhaustive-deps": "off",
		},
	},
	{
		files: ["*.test.ts?(x)", "*.test.js?(x)", "*.spec.ts?(x)", "*.spec.js?(x)"],
		plugins: {
			vitest: pluginVitest,
			"testing-library": pluginTestingLibrary,
		},
		rules: {
			...pluginVitest.configs.all.rules,
			...pluginTestingLibrary.configs.react.rules,
		},
	},
	{
		files: ["*.json", "*.json5", "*.jsonc"],
		languageOptions: {
			parser: parserJSON,
		},
		plugins: {
			jsonc: pluginJsonc,
		},
		rules: {
			...pluginJsonc.configs["recommended-with-json"].rules,
			"jsonc/array-bracket-spacing": ["error", "never"],
			"jsonc/comma-dangle": ["error", "never"],
			"jsonc/comma-style": ["error", "last"],
			"jsonc/indent": ["error", "tab"],
			"jsonc/no-octal-escape": "error",
			"jsonc/object-curly-newline": [
				"error",
				{
					multiline: true,
					consistent: true,
				},
			],
			"jsonc/object-curly-spacing": ["error", "always"],
			"jsonc/object-property-newline": [
				"error",
				{
					allowMultiplePropertiesPerLine: true,
				},
			],
		},
	},
	{
		ignores: [
			"*.min.*",
			"*.d.ts",
			"CHANGELOG.md",
			"dist",
			"build",
			"LICENSE*",
			"output",
			"out",
			"coverage",
			"public",
			"temp",
			"package-lock.json",
			"pnpm-lock.yaml",
			"yarn.lock",
			"__snapshots__",
			"*.css",
			"*.png",
			"*.ico",
			"*.toml",
			"*.patch",
			"*.txt",
			"*.crt",
			"*.key",
			"Dockerfile",
			"!.github",
			"!.vscode",
		],
	},
]);
