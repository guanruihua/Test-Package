import appLocaleData from "react-intl/locale-data/zh"
import antd from 'antd/lib/locale/zh_CN'
import messages from './modules/message/zh_CN'
import system from './modules/system/zh_CN'
import test from './modules/test/zh_CN'

export default {
	title: {
		default: "安甄品",
		smf: "SMF",
		hezhou: "贺州防伪溯源",
	},
	name: "简体中文",
	locale: "zh-CN",
	data: appLocaleData,
	antd,
	messages: {
		...messages,
		...system,
		...test
	},
};
