import React from 'react';
import * as Icons from '@ant-design/icons';
import { Utils } from './assets';
import { iMenu, iRouter } from './assets/type';
import { FormattedMessage } from 'react-intl';
import Home from './modules/Home';
import NullCom from './modules/common/nullCom';
// 测试使用组件
import TestCom from './modules/test/testCom'
import FilterPage from './modules/test/filterTest/index'
import TablePage from './modules/test/table'
import WorldMapPage from './modules/test/worldMap/demo1'
import WorldMapPage2 from './modules/test/worldMap/demo2'
import PreviewComPage from './modules/test/previewCom'
import MarkdownPage from './modules/test/markdown'
// import { Test1, Test2, Test3, Test4, Test5, Test6, } from './modules/test'

// 用于home页外的(只支持一层级)
const appRouters: iRouter[] = [
	{
		key: 'markdowna',
		id: 'markdowna',
		path: '/',
		title: 'authority.menu.edit.title',
		module: MarkdownPage,
		canNoLogin: true,
		exact: true,
	},
	{
		key: 'markdown',
		id: 'markdown',
		path: '/markdown',
		title: 'authority.menu.edit.title',
		module: MarkdownPage,
		canNoLogin: true,
		exact: true,
	},
]

const localesKeys = {
	developerName: "global.menu.name.develop",
	webName: "global.menu.name.web",
	aipsName: "global.menu.name.apis",
	serverName: "global.menu.name.server",
	serviceName: "global.menu.name.service",
	edit: "global.app.opt.edit",
	add: "global.app.opt.add",
	view: 'global.app.opt.view',
	connectFn: 'develop.service.connectFn'
}

// console.log('env',process.env.PROJECT_ENV ? false : true)

const routers: iRouter[] = [
		{
		key: 'home',
		id: 'home',
		path: '/home',
		title: 'menu.name._menu_home',
		module: NullCom,
		menuShow: false,
		exact: true,
	},
	{
		key: 'test1',
		id: 'test1',
		path: '/test1',
		title: 'menu.name._menu_sys_test',
		icon: 'VideoCameraOutlined',
		module: TestCom,
	},
	{
		key: 'test_filter',
		id: 'test_filter',
		path: '/filter',
		title: 'test.menu.filter',
		icon: 'VideoCameraOutlined',
		module: FilterPage,
	},
	{
		key: 'test_table',
		id: 'test_table',
		path: '/table',
		title: 'test.menu.table',
		icon: 'VideoCameraOutlined',
		module: TablePage,
	},
	{
		key: 'test_world_map',
		id: 'test_world_map',
		path: '/worldMap',
		title: 'test.menu.map',
		icon: 'VideoCameraOutlined',
		children: [
			{
				key: 'test_world_map_2',
				id: 'test_world_map_2',
				path: '/worldMap/demo2',
				title: 'test.menu.map',
				// icon: 'VideoCameraOutlined',
				module: WorldMapPage2,
			},
			{
				key: 'test_world_map_1',
				id: 'test_world_map_1',
				path: '/worldMap/demo1',
				title: 'test.menu.map',
				// icon: 'VideoCameraOutlined',
				module: WorldMapPage,
			},

		]
	},
	{
		key: 'test_html_preview',
		id: 'test_html_preview',
		path: '/preview',
		title: 'test.menu.preview',
		icon: 'VideoCameraOutlined',
		module: PreviewComPage,
	},
	// 	{
	// 	key: 'serviceInfo',
	// 	id: 'serviceInfo',
	// 	path: '/serviceInfo',
	// 	title: 'global.menu.name.serviceInfo',
	// 	module: serviceInfo,
	// 	icon: 'PicRightOutlined',
	// 	exact: true,
	// 	children: [
	// 		{
	// 			key: 'servFunction',
	// 			id: 'servFunction',
	// 			path: '/serviceInfo/function/:id',
	// 			title: 'serviceinfo.label.function',
	// 			module: serviceInfoFunction,
	// 			menuShow: false,
	// 			exact: true,
	// 			children: [
	// 				{
	// 					key: 'servSubFunction',
	// 					id: 'servSubFunction',
	// 					path: '/serviceInfo/function/:id/subFunction/:cid',
	// 					title: 'serviceinfo.label.sub.function',
	// 					module: serviceInfoSubFunction,
	// 					menuShow: false,
	// 					exact: true,
	// 				}
	// 			]
	// 		}
	// 	]
	// },
];

const canNoLoginList: string[] = [];

function buildMenuList(lists: iRouter[]): any {
	return lists.map((item: iRouter): iMenu => {
		const { module, exact, children = [], loadRoute = true, canNoLogin, ...rest } = item;
		// if (!loadRoute) return;
		if (canNoLogin)
			canNoLoginList.push(rest.path);

		if (Object.keys(Icons).includes(rest.icon))
			rest.iconCom = Utils.getByKey(Icons, rest.icon);

		if (children.filter((item: any): any => {
			const { menuShow = true } = item;
			return menuShow;
		})?.length > 0)
			rest.children = buildMenuList(children);
		return rest;
	})
}

const menuList: iMenu[] = buildMenuList(routers)

buildMenuList(appRouters);

export {
	routers,
	appRouters,
	menuList,
	canNoLoginList,
}