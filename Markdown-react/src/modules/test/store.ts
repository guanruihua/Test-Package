import { observable, computed, action, makeObservable, runInAction, configure } from 'mobx';
import Common from '@/assets/common'
import { tLang } from '@/assets/type'
import { iPagination, tDataSource } from '@/components/ARTable/type'
import { test, testApi } from './service';

configure({ enforceActions: 'never' })

class TestStore extends Common.TableStore {

	constructor(queryService: any, paramsAnalysis: any) {
		super();
		makeObservable(this);
		this.queryService = queryService;
		this.paramsAnalysis = paramsAnalysis;
	}

	@action.bound
	ttApi(): void {
		testApi({}).then((res: any): any => {
			console.log('test', res)
		})
	}

}

export default new TestStore(
	test,
	(values: any, _this: any) => {
		console.log('values', values);
		const { result, ...rest } = values;
		_this.dataSource = result;
		_this.pagination = rest;
		// _this.pagination = {};
		// _this.pagination = false;
	})