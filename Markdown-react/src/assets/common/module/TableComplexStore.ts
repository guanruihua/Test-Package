import { observable, computed, action, makeObservable } from 'mobx'
import { tLang } from '@/assets/type'
import Utils from '../../utils'
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

const tempePromiseFn: any = (params: any): Promise<any> => {
	return new Promise((reslove: any): void => {
		reslove({ code: '1', msg: 'No definition' })
	}
	)
}

class Store {

	@observable public lang: tLang = localStorage.lang || 'en_US';
	@observable public dataSource: tDataSource[] = [];
	@observable public pagination: iPagination = {
		total: 0,
		current: 1,
		pageSize: Number(localStorage.pageSize) || 10,
	};
	@observable public loading: boolean = false;
	@observable public filterParams: { [key: string]: any } = {}; // filter 保存数据
	@observable public visible: boolean = false; // 用于处理modal的显隐

	/* 接口以及处理方法 start */

	// 修改接口
	@observable public saveService: any = tempePromiseFn;
	// 修改接口处理的数据的方法
	@observable public saveParamAnalysis: any = (values: any, _this: any, callback?: any): boolean => { return true };

	// 查询接口
	@observable public queryService: any = tempePromiseFn; // table显示数据调用的 url[ 使用request方法请求]
	// 用于接口数据的方法
	@observable public paramsAnalysis: any = (values: any, _this: any, callback?: any): boolean => { return true };

	/* 接口以及处理方法 end */

	/**
	 *  构造器, 子类继承后
	 * 1. 传接口: 在子类构造器传输super(这里传输父类的参数) [不推荐, 代码风格奇怪, 简单页面建议使用]
	 * 2. 不传接口: 进来(就是不用使用构造器传接口以及方法进来), 
	 *  方法一: 可以通过(@override) 来重写init方法, 或者调用init方法来初始化 (接口以及处理方法)
	 * 	方法二: 
	 * 			- 通过重写handleFindService方法( 该方法行相当于 查询接口, 以及查询接口的返回值数据处理 )
	 * 			- 通过重写handleSaveService方法( 该方法相当于于 修改接口, 以及修改接口的返回值数据处理)
	 * 3. 如果都不是自己需要的, 需要修改哪个方法就修改哪个方法
	 * 
	 * 补充:
	 * 	要么初始化接口, 要么重写handleFindService 和 handleSaveService 方法
	 *  */
	constructor(param: { queryService?: any, paramsAnalysis?: any, saveService?: any, saveParamAnalysis?: any }) {
		makeObservable(this)
		const { queryService, paramsAnalysis, saveService, saveParamAnalysis } = param;
		if (queryService) this.queryService = queryService;
		if (paramsAnalysis) this.paramsAnalysis = paramsAnalysis;
		if (saveService) this.saveService = saveService;
		if (saveParamAnalysis) this.saveParamAnalysis = saveParamAnalysis;
	}

	// 初始化find[查]与save[修改]的接口
	@action.bound
	init(param: {
		queryService?: any, paramsAnalysis?: any,
		saveService?: any, saveParamAnalysis?: any
	}): void {
		const { queryService, paramsAnalysis, saveService, saveParamAnalysis } = param;
		if (queryService) this.queryService = queryService
		if (paramsAnalysis) this.paramsAnalysis = paramsAnalysis
		if (saveService) this.saveService = saveService
		if (saveParamAnalysis) this.saveParamAnalysis = saveParamAnalysis
	}

	// 主要调用查询接口
	@action.bound
	handleFindService(params: any, callback?: any): void {
		if (params.toString() === '{}') {
			this.initParams()
		}
		if (this.queryService) {
			this.loading = true;
			this.queryService(params)
				.then((values: any): any => {
					this.checkCode(values)
						&& this.paramsAnalysis
						&& this.paramsAnalysis(values, this, callback)
						&& callback && callback(values)
					this.loading = false;
				})
				.then(() => {

				})
				.catch((err: any): any => {
					this.loading = false;
					console.error(err);
				})
		}
	}

	// 主要调用修改接口
	@action.bound
	handleSaveService(params: any, callback?: any): Promise<any> {

		return new Promise((resolve: any, reject: any) => {
			if (this.saveService) {
				this.saveService(params)
					.then((values: any): any => {
						this.checkCode(values)
							&& this.saveParamAnalysis
							&& this.saveParamAnalysis(values, this, callback)
							&& callback && callback(values)
						// this.handleFindService && this.handleFindService({})
						resolve(1)
					}).catch((err: any): any => {
						console.error(err);
					})
			} else {
				reject(2)
			}
		})

	}

	// 过滤查找
	@action.bound
	onSearch(params: any, callback?: any): void {
		this.filterParams = params;
		this.handleFindService(params, callback)
	}

	// 修改1 (这个方法调用后会重置掉filterParams, 记得重置好filter组件)
	@action.bound
	save(params: any, callback?: any): void {
		this.handleSaveService(params, callback).then((res: any) => {
			this.handleFindService({}, callback)
		})
	}

	// 修改2 
	// desc: 常使用在table的状态修改
	// 和[修改1] 差别就是无不会重置掉分页和 filterParams
	@action.bound
	saveParam(params: any, callback?: any): void {
		this.handleSaveService(params, callback).then((res: any) => {
			const { current, pageSize } = this.pagination || {}
			this.handleFindService({ pageNo: current, pageSize, ...this.filterParams })
		})
	}

	// 查询
	@action.bound
	query(params: any, callback?: any): void {
		this.handleFindService({ ...this.filterParams, ...params })
	}

	// 分页查找
	@action.bound
	onChange(pageNo: number, pageSize: number): void {
		this.handleFindService({ pageNo, pageSize, ...this.filterParams })
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

	@action.bound //
	initParams() {
		this.filterParams = {}
	}


	// 验证code 是否为0(正确请求)
	checkCode = (obj: any): boolean => {
		const { code = '1', msg = '', message = '' } = obj || {}
		if (code === '0') {
			return true;
		}
		if (code !== '0') {
			Utils.message({ type: 'error', msg: msg || message })
			return false;
		}
	}


}

export default Store