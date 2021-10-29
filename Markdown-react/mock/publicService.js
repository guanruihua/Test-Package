/*
 * @Author: ruihuag
 * @Date: 2021-09-18 10:18:33
 * @LastEditTime: 2021-09-18 10:37:03
 * @LastEditors: ruihuag
 * @Description:
 * @FilePath: \ServiceStatus\mock\publicService.js
 * Copyright (c) 2004-2021 i-Sprint Technologies, Inc.
 *  address:
 *  All rights reserved.
 *
 *  This software is the confidential and proprietary information of
 *  i-Sprint Technologies, Inc. ('Confidential Information').  You shall not
 *  disclose such Confidential Information and shall use it only in
 *  accordance with the terms of the license agreement you entered into
 *  with i-Sprint.
 */
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