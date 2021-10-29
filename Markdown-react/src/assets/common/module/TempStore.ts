import { observable, computed, action, makeObservable } from 'mobx';
import { tLang } from '@/assets/type'

class TempStore {
	@observable public lang: tLang = localStorage.lang || 'en_US';
	constructor() {
		makeObservable(this)
	}
}

export default TempStore