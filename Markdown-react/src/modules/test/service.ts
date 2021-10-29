import Utils from '@/assets/utils';
// const request: any = Utils.request;

import Mock from 'mockjs';
// export async function login(params: any): Promise<any> {
// 	return request('/apiSys/userLogin', { method: 'post', data: params })
// }

export async function testApi(params: any): Promise<any> {
	return Utils.request('/apiMock/getHistoryList', { method: 'get', data: params })
}

const data: any = Mock.mock({
	'result|1-10': [{
		'id|+1': 1,
		'name': '@name',
		'age': 123,
	}]
})

export async function test(params: any): Promise<any> {
	console.log('request params: ', params);
	return new Promise((resolve: (v: any) => void, reject: (v: any) => void): void => {
		setTimeout(() => {
			resolve({
				...data,
				current: 2,
				pageSize: 20,
				total: 102,
			})
		}, 2000)
	})
}