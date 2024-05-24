import { defineConfig } from 'vite';
import {resolve} from "path";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	resolve: {
		alias: [
			{
				find: /^\/@\//,
				replacement: `${resolve(__dirname, "./src")}/`,
			},
		],
	},
	plugins: [vue()],
	server: { host: '0.0.0.0', port: 8700 },
	clearScreen: false,
})
