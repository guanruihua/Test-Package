/*
 * @Author: ruihuag
 * @Date: 2021-09-14 17:26:49
 * @LastEditTime: 2021-10-14 09:34:07
 * @LastEditors: ruihuag
 * @Description: 路由守卫
 * @FilePath: \react-webpack-template\src\assets\library\routingGuard.ts
 * Copyright (c) 2004-2021 i-Sprint Technologies, Inc.
 *  address:
 *  All rights reserved.
 *
 *  This software is the confidential and proprietary information of
 *  i-Sprint Technologies, Inc. ('Confidential Information').  You shall not
 *  disclose such Confidential Information and shall use it only in
 *  accordance with the terms of the license agreement you entered into
 *  with i-Sprint.
 */
import { canNoLoginList } from '@/router';



// 判断是否登录
const isLogin: () => boolean =
	(): boolean => {
		const SID: string | undefined = sessionStorage.getItem('__SID')
		if (SID) return true;
		return false;
	}

/**
 * 
 * @param pathname 需要判断的路径
 * 	@argument canNoLoginList 白名单列表
 * @returns boolean
 * @description : 判断是否为白名单
 */
const isNoLogin: (pathname: string) => boolean =
	(pathname: string): boolean => {
		if (canNoLoginList.includes(pathname)) return true;
		return false;
	}

// 路由守卫
const routeGuard: (history: AnalyserNode, callback?: any) => any =
	(history: any, callback?: any): any => {

		// 特殊处理
		if (location.pathname === '/ServiceStatus/' || location.pathname === '/ServiceStatus') {
			history.push('/')
			return;
		}

		if (isNoLogin(location.pathname)) return;
		if (!isLogin() && location.pathname !== '/login') {
			// history.push('/login')
			history.push(`/login?from=${location.pathname.replace('/ServiceStatus', '')}`)
		}
	}

export default routeGuard;