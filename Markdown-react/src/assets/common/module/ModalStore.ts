import { observable, computed, action, makeObservable } from 'mobx'
import { tLang } from '@/assets/type'
import { iPagination, tDataSource } from '@/components/ARTable/type'

class ModalStore {
	@observable public lang: tLang = localStorage.lang || 'en_US';
	@observable public dataSource: tDataSource[] = [];
	@observable public pagination: iPagination = {
		total: 0,
		current: 1,
		pageSize: Number(localStorage.pageSize) || 10,
	};
	@observable public loading: boolean = false;

	constructor() {
		makeObservable(this)
	}

	@action.bound
	setPagination(tpagination: iPagination): void {
		this.pagination = tpagination;
	}
}

export default ModalStore