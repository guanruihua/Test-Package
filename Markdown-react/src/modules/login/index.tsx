import React, { FC } from 'react';
import { observer, inject } from "mobx-react";
import { Form, Input, Button, Tabs } from 'antd';
import { IdcardOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Common, Utils } from '@/assets';
import { ARHeader } from "@/components";
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { fieldLocales, namespace } from './common'
import './index.less';
const { TabPane } = Tabs;
const Validates = Common.Validates;

const wrapperCol: any = { offset: 2, span: 20 }

/* Personal User start */
const FinitLoginPersionalForm: FC<any> = (props: any) => {
	const { locales, intl } = props;

	const { required } = Validates(intl)
	const onFinish = (values: any) => {
		Utils.message({
			type: 'warning',
			msg: intl.formatMessage({ id: 'global.cannot.supported.sys_personalUser' })
		})
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		// console.log('Failed:', errorInfo);
	};

	return (
		<div>
			<Form
				name="basic"
				wrapperCol={wrapperCol}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					name="acount"
					rules={[required]}
				>
					<Input
						placeholder={locales.username}
						prefix={<UserOutlined />} />
				</Form.Item>

				<Form.Item
					name="password"
					rules={[required]}
				>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder={locales.pwd}
					/>
				</Form.Item>

				<Form.Item wrapperCol={wrapperCol}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
/* Personal User end */


/* Enterprise User start */

const FinitLoginEnterpriseForm: FC = (props: any) => {
	const { locales, enterpriseLogin, history, intl } = props;

	const { required } = Validates(intl)
	const onFinish = (values: any) => {

		// console.log('Success:', values);
		enterpriseLogin(values, history);
	};

	const onFinishFailed = (errorInfo: any) => {
		// console.log('Failed:', errorInfo);
	};

	return (
		<div className="login-tab-enterprise-form">
			<Form
				name="basic"
				wrapperCol={wrapperCol}
				initialValues={{
					companyCode: 'axbsec',
					loginName: 'SuperAdmin',
					pwd: '12345678'
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					name="companyCode"
					rules={[required]}
				>
					<Input
						placeholder={locales.companyCode}
						prefix={<IdcardOutlined />} />
				</Form.Item>

				<Form.Item
					name="loginName"
					rules={[required]}
				>
					<Input
						placeholder={locales.username}
						prefix={<UserOutlined />} />
				</Form.Item>

				<Form.Item
					name="pwd"
					rules={[required]}
				>
					<Input
						prefix={<LockOutlined />}
						type="password"
						placeholder={locales.pwd}
					/>
				</Form.Item>

				<Form.Item wrapperCol={wrapperCol}>
					<Button type="primary" htmlType="submit">
						{locales.LoginBtn}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

/* Enterprise User end */



const FinitLoginForm = injectIntl(inject(namespace)(observer((props: any) => {

	const { intl, history } = props
	const { enterpriseLogin } = props[namespace]
	const { locales } = fieldLocales(intl)

	function callback(key: any): void {
		// console.log(key);
	}

	const comConfig: any = {
		locales,
		intl,
		history,
	}

	const persionalConfig: any = {
		...comConfig,
	}

	const enterpriseConfig: any = {
		enterpriseLogin,
		...comConfig,
	}

	return (
		<div className='ar-login-form'>
			<Tabs
				defaultActiveKey="2"
				centered
				onChange={(key: any): void => callback(key)}>
				<TabPane tab={locales.tabOne} key="1">
					<FinitLoginPersionalForm {...persionalConfig} />
				</TabPane>
				<TabPane tab={locales.tabTwo} key="2">
					<FinitLoginEnterpriseForm {...enterpriseConfig} />
				</TabPane>
			</Tabs>
		</div >
	);
})))

const Index: FC = (props: any) => {
	const { history } = props;

	return <div className='ar-login'>
		<ARHeader />
		<FinitLoginForm history={history} />
	</div>
}

export default withRouter(Index)

