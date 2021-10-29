const publicService = require('./publicService')
const moniSetting = require('./moniSetting')

const proxy = {
	'GET /apiMock/getHistoryList': (req, res) => {
		setTimeout(() => {
			res.send({
				code: '0',
				data: [{ id: '111', service: '2333333', status: 1, enabled: 1, cate: '2333333' }, { id: '1112', service: '23333333333', status: 1, enabled: 0, cate: '2333333' }]
			})
		}, 1000);

	},

	'GET /apiMock/queryWebList': (req, res) => {
		setTimeout(() => {

			res.send({

				code: '0',
				data: {
					orderBy: "",
					pageNo: 1,
					pageSize: 10,

					startRow: 0,

					result: [{ id: '111', name: '2333333', status: 1, code: '2333333' }, { id: '1112', name: '23333333333', status: 1, cate: '2333333' }]
				}
			})
		}, 2000);

	},
	...publicService,
	...moniSetting,
	...require('./serviceInfo')
}

module.exports = proxy;