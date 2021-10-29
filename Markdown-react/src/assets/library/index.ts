/*
 * @Author: ruihuag
 * @Date: 2021-09-14 17:23:56
 * @LastEditTime: 2021-09-30 11:22:43
 * @LastEditors: ruihuag
 * @Description: 
 * - 特殊处理的逻辑提取出来到该处进行管理, 统一管理处理
 * @FilePath: \ServiceStatus2\src\assets\library\index.ts
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
import routeGuard from './routingGuard';

const Library: any = {
	routeGuard,
}

export default Library;