import React, { FC, useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import logoUrl from '../../assets/resource/image/i-Sprint-Logo.png';
import { menuList } from '@/router';
import { UserOutlined } from '@ant-design/icons';
import { iMenu } from '@/assets/type';
import { Utils } from '@/assets';

const { SubMenu } = Menu;

/**
 * 构建菜单树
 *  */
const FinitMenu: FC = (props: any) => {

	const { intl } = props;

	/* 设置默认和修改( selectkey, openKeys) 值 start */
	let defaultSelectedKeys: any = Utils.getSessionStorageByKey('selectKeys', true) || [];
	let defaultOpenKeys: any = Utils.getSessionStorageByKey('openKeys', true) || [];

	const [selectKeys, updateSelectKeys]: [string[], (arr: any[]) => void] = useState(defaultSelectedKeys || []);
	const [openKeys, updateOpenKeys] = useState(defaultOpenKeys || []);

	const handleMenu: any = (key: string, persionKey: string): void => {
		if (openKeys instanceof Array) {
			if (!openKeys.includes(persionKey)) {
				updateOpenKeys([persionKey])
				sessionStorage.setItem('openKeys', JSON.stringify([persionKey]))
			}
		}
		if (selectKeys instanceof Array) {
			if (!selectKeys.includes(key)) {
				updateSelectKeys([key])
				sessionStorage.setItem('selectKeys', JSON.stringify([key]))
			}
		}

	}
	/* 设置默认和修改( selectkey, openKeys) 值 end */

	// console.log(menuList, '---menuList---')
	/* 构建 菜单 tree start */
	const buildMenuTree = (list: iMenu[], persionKey?: string): any => {
		return list.map((item: iMenu) => {
			const { key = "", path, title, icon, menuShow = true, iconCom, children = [] } = item;
			if (menuShow === false) return;
			if (children.filter((item: any): any => {
				const { menuShow = true } = item;
				return menuShow;
			})?.length > 0) {
				// if (children?.length > 0) {
				return (
					<SubMenu
						key={key}
						icon={iconCom && React.createElement(iconCom)}
						title={title && <FormattedMessage id={title} />}>
						{buildMenuTree(children, key)}
					</SubMenu>
				)
			}
			return (
				<Menu.Item
					key={key}
					// onClick={(): void => persionKey && handleMenu(key, persionKey)}
					onClick={(): void => handleMenu(key, persionKey)}
					icon={iconCom && React.createElement(iconCom)}>
					<Link to={path}>{title && <FormattedMessage id={title} />}</Link>
				</Menu.Item>
			)
		})
	}
	/* 构建 菜单 tree end */


	/* 用户下拉框 start */
	const menu: any = (
		<Menu className="userDropDown">
			<Menu.Item key={"logout"} onClick={() => { window.sessionStorage.removeItem('__SID') }} >
				<Link to='/login'> {intl.formatMessage({ id: 'global.userDropDown.logout' })} </Link>
			</Menu.Item>
		</Menu>
	)
	/* 用户下拉框 end */


	return (
		<div className="home-content-aside-menu">
			<div className="logo" >
				<img src={logoUrl} alt="i-Sprint-Logo" />
			</div>


			<Scrollbars className="main-menu" >
				<Menu
					mode="inline"
					style={{ paddingBottom: 120 }}
					defaultSelectedKeys={selectKeys}
					defaultOpenKeys={defaultOpenKeys}
				>
					{buildMenuTree(menuList)}
				</Menu>
				<div className="hiddenBox" />
			</Scrollbars>

			<Dropdown overlay={menu} className="user">
				<Menu mode="inline">
					<Menu.Item key="1" icon={<UserOutlined className="user-logo" />}>
						{sessionStorage.loginName || 'SuperAdmin'}
					</Menu.Item>
				</Menu>

			</Dropdown>
		</div>
	)

}

export default injectIntl(FinitMenu);