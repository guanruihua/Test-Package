import { observable, computed, action, makeObservable } from 'mobx';
import { Utils, Config } from '@/assets';
// import { login } from './service';

class Store {
	// @observable public lang: tLang = 'en_US';
	@observable public isLogin: boolean = false; // true 已登录， false 未登录
	@observable public userInfo: any = {};
	@observable public validateCode: boolean = false;
	@observable public title: string = "安甄";
	@observable public lang: string = localStorage.lang || "en_US";

	constructor() {
		makeObservable(this)
	}

	@action.bound
	enterpriseLogin = (values: any, history: any): void => {
				Utils.sessionStorageSet({
				openKeys: '[]',
				selectKeys: '[]',
				"__SID": 'virtual Login',
			})
			if (location.search && location.search.split('?from=').length>0) {
				history && history.push(location.search.split('?from=')[1])
			} else {
				history && history.push('/home')
			}
	}


}

export default Store