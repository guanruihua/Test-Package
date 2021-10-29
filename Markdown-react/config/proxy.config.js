const proxyConfig = {
	"/test/": {
		"target": "http://172.16.30.44",
		"changeOrigin": true
		//"pathRewrite": { "^/apiSys/" : "/AR-system/ar/sys/" }
	},
	"/apiSys/": {
		"target": "http://172.16.10.95",
		"changeOrigin": true
		//"pathRewrite": { "^/apiSys/" : "/AR-system/ar/sys/" }
	},

	// '*': {
	//   target: 'http://localhost:8090'
	// }
}

module.exports = proxyConfig;