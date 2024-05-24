import { defineConfig } from 'vite';
import {resolve} from "path";

export default defineConfig({
	resolve: {
		alias: [
			{
				find: /^\/@\//,
				replacement: `${resolve(__dirname, "./src")}/`,
			},
		],
	},
	plugins: [],
	server: { host: '0.0.0.0', port: 8700 },
	clearScreen: false,
	//全局引入
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "/@/style/common.scss";',
			}
		}
	},
})
