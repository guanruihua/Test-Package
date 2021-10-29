import * as React from "react";
import { observer, inject } from "mobx-react";
import { ConfigProvider } from "antd";
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import Login from "../login";
import Home from '../Home';
import { Locales } from "@/assets";
import { tLang } from '@/assets/type';
import { appRouters } from '@/router';
import { iRouter } from "@/assets/type";
import icon from '@/assets/resource/image/favicon.ico';
const { locales } = Locales;

addLocaleData(locales["zh_CN"].data, locales["en_US"].data);
let iconDom:any = document.querySelector('link[rel="short icon"]')
iconDom.href = icon;

const Index = (props: any) => {
	const { AppStore } = props;
	const lang: tLang = AppStore.lang;
	React.useEffect(() => {
		AppStore.updateLang(localStorage.lang || 'en_US');
	}, [localStorage.lang])

	return (
		<IntlProvider locale={locales[lang].locale} messages={locales[lang].messages} >
			<ConfigProvider locale={locales[lang].antd} >
				<Router basename="/ServiceStatus" >
					<Switch>
						<Route exact path={'/login'} ><Login /></Route>
						{appRouters.map((item: iRouter): any => {
							const { module, ...rest } = item;
							return <Route component={module} {...rest} />
						})}
						<Route path={'/'} > <Home /></Route>
						<Redirect to={'/'} />
					</Switch>
				</Router>
			</ConfigProvider >
		</IntlProvider>
	)
}

export default inject('AppStore')(observer(Index));