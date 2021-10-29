import React from "react";
import { Select } from 'antd';
import { Locales } from "@/assets";
import { observer, inject } from "mobx-react";
import { tLang, iLang } from '@/assets/type';
const { Option } = Select;

const langAdapter = (lang: string): tLang => {
	switch (lang) {
		case 'zh_CN': return 'zh_CN';
		case 'en_US': return 'en_US';
		case 'zh_TW': return 'zh_TW';
		default: return 'en_US';
	}
}

const ARLangSelect = (props: any) => {
	const langs: iLang[] = [];
	for (const [key, val] of Object.entries(Locales.locales)) {
		langs.push({
			name: val.name,
			lang: langAdapter(key),
		})
	}
	const { lang, updateLang } = props.AppStore;
	return (<div className="ar-lang-select" >
		<Select
			defaultValue={lang}
			onChange={updateLang}>
			{langs.map((item: iLang): any => {
				const { name, lang } = item;
				return <Option key={lang} value={lang}>{name}</Option>
			})}
		</Select>
	</div>)
}

export default inject('AppStore')(observer(ARLangSelect))