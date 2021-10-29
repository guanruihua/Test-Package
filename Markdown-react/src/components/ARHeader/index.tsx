import React from 'react';
import { observer, inject } from "mobx-react";
import ARLangSelect from '../ARLangSelect';
import en_US from '@/assets/resource/image/logo_en.png';
import zh_TW from '@/assets/resource/image/logo_tw.png';
import zh_CN from '@/assets/resource/image/logo-cn.png';
import { tLang } from '@/assets/type';
import './index.less';

const imgAdapter: { [key: string]: any } = {
	zh_CN, zh_TW, en_US
}

const ARHeader = (props: any) => {
	const { AppStore, ...rest } = props;
	const lang: tLang = AppStore.lang;

	return (
		<div
			className="ar-header"
			{...rest}>
			<img key={lang} src={imgAdapter[lang]} />
			<div className="ar-header-right">
				{props.children}
				<ARLangSelect />
			</div>
		</div>
	)
}

export default inject('AppStore')(observer(ARHeader))

