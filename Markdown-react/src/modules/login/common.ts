const fieldLocales = (intl: any) => {

	return {
		locales: {
			tabOne: intl.formatMessage({ id: "forgotPassword.index.tab.one" }),
			tabTwo: intl.formatMessage({ id: "forgotPassword.index.tab.two" }),
			loginPwd: intl.formatMessage({ id: "forgotPassword.index.login" }),
			LoginBtn: intl.formatMessage({ id: "login.index.login" }),
			companyCode: intl.formatMessage({ id: "login.index.companyCode" }),
			username: intl.formatMessage({ id: "login.index.username" }),
			pwd: intl.formatMessage({ id: "login.index.password" }),
			validityCode: intl.formatMessage({ id: "login.index.validateCode" }),
		}
	}
}

const namespace: string = 'LoginStore';

export {
	fieldLocales,
	namespace,
}