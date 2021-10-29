import { observable, computed, action, makeObservable } from 'mobx'
import { tLang } from '@/assets/type'
import { iPagination, tDataSource } from '@/components/ARTable/type'
import Locale from '../../locales'

const langAdapter: (lang: string) => tLang = (lang: string): tLang => {
	switch (lang) {
		case 'zh_CN': return 'zh_CN';
		case 'en_US': return 'en_US';
		case 'zh_TW': return 'zh_TW';
		default: return 'en_US';
	}
}

/**
 * 计划修改为前端分页的做法
 */

class TableStore {

	@observable public lang: tLang = localStorage.lang || 'en_US';
	@observable public dataSource: tDataSource[] = [];
	@observable public pagination: iPagination = {
		total: 0,
		current: 1,
		pageSize: Number(localStorage.pageSize) || 10,
	};
	@observable public loading: boolean = false;
	@observable public queryService: any; // table显示数据调用的 url[ 使用request方法请求]
	@observable public paramsAnalysis: any; // 用于处理数据
	@observable public filterParams: { [key: string]: any } = {}; // filter 保存数据
	@observable public visible: boolean = false; // 用于处理数据

	constructor() {
		makeObservable(this)
	}

	@action.bound
	onSearch(params: any): void {
		this.filterParams = params;
		if (this.queryService) {
			this.loading = true;
			this.queryService(params)
				.then((values: any): any => {
					this.paramsAnalysis && this.paramsAnalysis(values, this);
					this.loading = false;
				}).catch((err: any): any => {
					this.loading = false;
					console.error(err);
				})
		}
	}

	@action.bound
	query(params: any): void {
		if (this.queryService) {
			this.loading = true;
			this.queryService({ ...this.filterParams, ...params })
				.then((values: any): any => {
					this.paramsAnalysis && this.paramsAnalysis(values, this);
					this.loading = false;
				}).catch((err: any): any => {
					this.loading = false;
					console.error(err);
				})
		}
	}


	@action.bound
	onChange(page: number, pageSize: number): void {
		console.log(page, pageSize);
		if (this.queryService) {
			this.loading = true;
			this.queryService({ pageNo: page, pageSize, ...this.filterParams })
				.then((values: any): any => {
					this.paramsAnalysis && this.paramsAnalysis(values, this);
					this.loading = false;
				}).catch((err: any): any => {
					this.loading = false;
					console.error(err);
				})
		}
	}

	@action.bound
	setPagination(tpagination: iPagination): void {
		this.pagination = tpagination;
	}

	@action.bound
	setIsModalVisible(flag: boolean): void {
		this.visible = flag;
	}

	@action.bound
	languageEditCallBack(val: string): void {
		this.lang = langAdapter(val);
	}

}

export default TableStore