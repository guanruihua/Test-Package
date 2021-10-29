import request from './request';
import { message } from 'antd';
import moment from "moment";
import { tLang } from '../type'

function f_getByKey<T extends object, K extends keyof T>(obj: T, key: K): any {
	return obj[key]
}

// 用于对继承了TableStore的store, 进行快速切割出对应组件需要的props
function f_splitTableProps(TableStore: { [key: string]: any }): any[] {
	const {
		onSearch,
		visible, setIsModalVisible,
		loading,
		pagination, dataSource,
		onChange, lang, languageEditCallBack } = TableStore;

	return [
		// tableProps
		{
			loading, pagination, dataSource,
			onChange, lang, languageEditCallBack
		},
		// modalProps
		{
			visible,
			setIsModalVisible,
			isform: true,
		},
		// filterProps
		{
			onSearch,
		},
		// 选择store里一些参, 函数和变量值等
		TableStore,

	]
}

// 将 {key:value, key2: value2 ... } 的类型保存到 sessionStorage 中
function f_sessionStorageSet(obj: { [name: string]: string; }): boolean {
	if (obj) {
		for (const [key, val] of Object.entries(obj)) {
			sessionStorage.setItem(key, val);
		}
		return true;
	}
	return false;
}

interface iMessage {
	type?: 'info' | 'warning' | 'error' | 'success';
	time?: number;
	msg: string;
}

const f_message = function (opt: iMessage): void {

	opt.type = opt.type || "info"; // 提示类型
	opt.time = opt.time || 2; // 提示时长
	opt.msg = opt.msg; // 提示信息

	switch (opt.type) {
		case "success":
			message.success(opt.msg, opt.time); // 成功提示
			break;
		case "warning":
			message.warning(opt.msg, opt.time); // 警告提示
			break;
		case "error":
			message.error(opt.msg, opt.time); // 错误提示
			break;
		default:
			message.info(opt.msg, opt.time); // 默认为 info提示
	}
};

function F_getSessionStorageByKey(key: string, parse?: boolean): any {
	let result: string = sessionStorage.getItem(key);
	try {
		if (parse) {
			return JSON.parse(result)
		}
	} catch (error: any) {
		console.log(error, error)
		return false;
	}
	return result;
}

function f_setMomentLocale(lang: tLang): void {
	switch (lang) {
		case 'zh_CN': moment.locale("zh-cn"); break;
		case 'zh_TW': moment.locale("zh-cn"); break;
		case 'en_US': moment.locale("en"); break;
		default: moment.locale("en"); break;
	}
}



// 发布订阅类  取消订阅有问题，先注释掉
// class EventEmitter {
// 	_event: { [key: string]: any } = {};

// 	// on 函数用于绑定
// 	// 注册事件监听; type 事件类型，handle 处理函数
// 	on(eventName: string, handle: any): void {
// 		let listeners: any = this._event[eventName];
// 		if (!listeners || !listeners.length) {
// 			this._event[eventName] = [handle];
// 			return;
// 		}
// 		listeners.push(handle);
// 	}
// 	// off 用于移除
// 	// 移除事件监听；type 事件类型，handle 处理函数
// 	off(eventName: string, handle: any): void {
// 		let listeners: any = this._event[eventName];
// 		this._event[eventName] = listeners.filter((l: any): boolean => l !== handle);
// 		// this._event[eventName]=[]
// 	}
// 	// emit 用于分发消息; // 触发一个事件
// 	emit(eventName: string, ...args: any[]): void {
// 		const listeners: any = this._event[eventName];
// 		if (listeners && listeners.length) {
// 			for (const l of listeners) {
// 				l(...args);
// 			}
// 		}
// 	}
// }
// const event: EventEmitter = new EventEmitter();


var Event = (function (): any {
	var clientList: any = {}, listen,
		trigger, remove;
	listen = function (key: any, fn: any): void {
		if (!clientList[key]) {
			clientList[key] = [];
		}
		clientList[key].push(fn);
	};
	trigger = function (): void {
		var key = Array.prototype.shift.call(arguments),
			fns = clientList[key];
		if (!fns || fns.length === 0) {
			return;
		}
		// fns[0].apply(this, arguments);
		for (var i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments);
		}
	}

	remove = function (key: any, fn: any): void {
		var fns = clientList[key];
		if (!fns || fns.length === 0) {
			return;
		}
		if (!fn) {
			fns && (fns.length = 0);
		} else {
			for (var l = fns.length - 1; l >= 0; l--) {
				var _fn = fns[l]; if (_fn === fn) {
					fns.splice(l, 1);
				}
			}
		}
	};
	return {
		on: listen,
		emit: trigger,
		off: remove
	}
})();


const Utils: any = {
	event: Event,
	request,
	getByKey: f_getByKey,
	getSessionStorageByKey: F_getSessionStorageByKey,
	message: f_message,
	sessionStorageSet: f_sessionStorageSet,
	setMomentLocale: f_setMomentLocale,
	splitTableProps: f_splitTableProps,
}

export default Utils