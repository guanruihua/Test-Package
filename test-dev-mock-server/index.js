import DevServer from 'rh-dev-mock-server'

const { apiServer, VirtualDao, loadApiByConfig, initTableApiConfig, Mock } = DevServer.default;


// apiServer()
// console.log(DevServer.default)

function apiServerCallback(app) {

	const config = {
		locale: {
			lang: 'localeStr',
			langs: ['zh_CN', 'en_US', 'zh_TW'],
			fields: ['desc']
		}
	}

	const vDao = new VirtualDao();
	vDao.init(
		'db',
		Mock.mock({
			'list|30-50': {
				id: "@id",
				// uid: "@uuid",
				type: '@name',
				'maxLength|1-30': 10,
				// 'desc': () => {
				// 	return JSON.stringify(Mock.mock({
				// 		zh_CN: '@name',
				// 		en_US: '@name',
				// 		zh_TW: '@name',
				// 	}))
				// },
				"desc&&zh_CN,en_US,zh_TW": "@name",
				"shortURL|1": ["1", "2"],
			}
		})['list'],
	);

	loadApiByConfig(initTableApiConfig(
		'db',
		vDao,
		(data) => {
			return { code: '0', result: data, message: 'Successful' }
		},
		config
	), app)

}

apiServer({
	callback: apiServerCallback
});