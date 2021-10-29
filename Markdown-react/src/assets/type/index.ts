import * as ARComponent from './ARComponent'

export { ARComponent }

interface iMenuTemp {
	key: string;
	id: string; // unique
	path: string; // unique
	title?: string;
	icon?: string;
	menuShow?: boolean; // defautl true
	canNoLogin?: boolean; // default false
	[key: string]: any;
}


// 菜单项 类型
export interface iMenu extends iMenuTemp {
	iconCom?: any;
	children?: iMenu[];
}

// 路由项 类型
export interface iRouter extends iMenuTemp {
	loadRoute?: boolean; // default true(false: 面包屑, 路由, menu都不会注册)
	module?: any;
	exact?: boolean;
	children?: iRouter[];
}

export type tLang = 'zh_CN' | 'en_US' | 'zh_TW';
export interface iLang {
	name: string;
	lang: tLang;
}

