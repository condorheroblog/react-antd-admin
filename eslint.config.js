import antfu from "@antfu/eslint-config";

export default antfu({
	react: true,
	rules: {
		"style/quotes": ["error", "double"],
		"style/semi": ["error", "always"],
		"style/indent": ["error", "tab"],
		"jsonc/indent": ["error", "tab"],
		"style/no-tabs": "off",
		"style/jsx-indent-props": ["error", "tab"],
		"react-hooks/exhaustive-deps": "off",
	},
});
