const Mock = require('mockjs')

const proxy = {
	'POST /apiMock/testpost': (req, res) => {
		// console.log(req, '----------req----------');
		res.send(
			Mock.mock(
				{
					code: '0',
					result: {
						'list|10': [
							{
								'id|+1': 1,
								'service': '@name',
								'category|1': ['Product', 'Project'],
								'status|1': [1, 2, 3],
								'lastUpdateDate': '@datetime("yyyy-MM-dd HH:mm:ss")',
								'enabled|1': [1, 2],
							},
						],
						'pageNo': '3',
						'pageSize': '10',
						'total': '123',
					}
				}
			)
		)
	},
	'GET /apiMock/serviceInfo/query': (req, res) => {
		res.send(
			Mock.mock(
				{
					code: '0',
					result: {
						'list|10': [
							{
								'id|+1': 1,
								'service': '@name',
								'category|1': ['Product', 'Project'],
								'status|1': [1, 2, 3],
								'lastUpdateDate': '@datetime("yyyy-MM-dd HH:mm:ss")',
								'enabled|1': [1, 2],
							},
						],
						'pageNo': '3',
						'pageSize': '10',
						'total': '123',
					}
				}
			)
		)
	},
	'GET /apiMock/serviceInfo/queryById': (req, res) => {
		res.send(
			Mock.mock(
				{
					code: '0',
					result: {
						'id|+1': 1,
						'service': '@name',
						'category|1': ['Product', 'Project'],
						'function': '@name',
						'status|1': [1, 2, 3],
						'lastUpdateDate': '@datetime("yyyy-MM-dd HH:mm:ss")',
						'enabled|1': [1, 2],
					}
				}
			)
		)
	},
	'GET /apiMock/serviceInfo/func/query': (req, res) => {
		res.send(
			Mock.mock(
				{
					code: '0',
					result: {
						'list|10': [
							{
								'id|+1': 1,
								'function': '@name',
								'subFunction': '@name',
								'server': '@name',
								'excutionDuration': '@name',
								'type|1': ['HTTP Request', 'API', 'Request'],
								'dependsOn': '@name',
								'status|1': [1, 2, 3, 4],
								'lastUpdateDate': '@datetime("yyyy-MM-dd HH:mm:ss")',
								'enabled|1': [1, 2],
								'error|3': [{
									'id|+1': 99,
									'title': '@name',
									'msg': '@paragraph'
								}]
							},
						],
						'pageNo': '3',
						'pageSize': '10',
						'total': '123',
					}
				}
			)
		)
	},
}
module.exports = proxy;