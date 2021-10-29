import { observable, computed, action, makeObservable } from 'mobx';
import { Locales, Utils } from "@/assets";
import { tLang } from '@/assets/type'
import page from '@/assets/config/page';

class AppStore {
	@observable public lang: tLang = localStorage.lang || 'en_US';
	constructor() {
		makeObservable(this)
	}
	@action.bound
	updateLang = (lang: tLang): void => {
		this.lang = lang;

		document.getElementById("app_title_id").innerText = page.PAGETITLE[lang] ? page.PAGETITLE[lang] : page.PAGETITLE['en_US']

		localStorage.setItem('lang', lang)
		Utils.setMomentLocale(lang);
	}
}

export default AppStore