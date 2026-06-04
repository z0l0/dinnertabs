import tseslint from "typescript-eslint";

export default [
	{
		ignores: [".next/**", ".open-next/**", "node_modules/**", "cloudflare-env.d.ts"],
	},
	...tseslint.configs.recommended,
	{
		files: ["src/**/*.{ts,tsx}"],
		rules: {
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/no-explicit-any": "error",
		},
	},
];
