import appLocaleData from "react-intl/locale-data/en"
import antd from 'antd/lib/locale/en_US'
import messages from './modules/message/en_US'
import system from './modules/system/en_US'
import test from './modules/test/en_US'

export default {
	title: {
		default: "AccessReal",
		smf: "SMF",
		hezhou: "HEZHOU CITY TRACK AND TRACE",
	},
	name: "English",
	locale: "en-US",
	data: appLocaleData,
	antd: antd,
	messages: {
		...messages,
		...system,
		...test
	},
};
