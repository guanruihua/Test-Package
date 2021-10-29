const Mock = require('mockjs')

const proxy = {
	'GET /apiMock/publicService': (req, res) => {
		res.send(
			Mock.mock(
				{
					code: '0',
					data: {
						'result|8': [
							{
								'id|+1': 1,
								'name': '@name',
								'status|1': [
									1, 2, 3,
								],
							},
						],
						'lastUpdateTime': '@datetime("yyyy-MM-dd HH:mm:ss")'
					}
				}
			)
		)
	}
}
module.exports = proxy;