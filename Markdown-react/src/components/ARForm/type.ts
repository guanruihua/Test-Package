/*
 * @Author: ruihuag
 * @Date: 2021-09-15 14:39:53
 * @LastEditTime: 2021-09-16 16:36:03
 * @LastEditors: ruihuag
 * @Description: ARForm type
 * @FilePath: \ServiceStatus\src\components\ARForm\type.ts
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
import { ReactNode } from 'react';

interface iValue {
	[key: string]: any;
}


export interface iFormProps {
	readonly layout?: 'horizontal' | 'vertical' | 'inline'; //defualt horizontal
	onSubmit?: (values: any) => void;
	readonly submitFlag?: boolean; // default true(是否显示 submit btn)
	readonly resetFlag?: boolean; // defautl true(是否显示 submit btn)
	readonly submitName?: string; // submit btn 名称
	readonly resetName?: string; // reset btn 名称
	readonly initialValues?: iValue; // 字段初始化
	getFormRef?: (ref: any) => void;
	children?: ReactNode;
	[name: string]: any;
}

export interface iFormItemProps {
	label: string;
	name: string;
	children?: ReactNode
	[name: string]: any;
}