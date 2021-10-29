const Mock = require('mockjs')
const proxy = {
	'POST /apiMock/moniSetting': (req, res) => {
		res.json(
			Mock.mock(
				{
					code: '0',
					data: {
						"frequency|1-100": 100,
						"unit|1": [
							'Minutes', 'Hours'
						],
						"executionStatusRecordLimit|1-365": 100,
						"errorRecordLimit|1-365": 100,
						"notificationEmails": '@name',
					}
				}
			)
		)
	}
}
module.exports = proxy;