import { ReactNode } from 'react';

interface iValue {
	[key: string]: any;
}

export interface iFilterProps {
	onSearch: (values: any) => void;  // submit和reset(空参)都会调用
	readonly submitName?: string; // submit 按钮名称
	readonly resetName?: string; // resset 按钮名称
	readonly initialValues?: iValue; // 字段初始化
	formItemList?: any[]; // 过滤控件使用js对象配置生成(可不用)
	children?: ReactNode;
	[name: string]: any;
}


// 方便通过配置方式添加Filter 的formitem
export interface iFormItem {
	orderBy: number; // 排序使用 default 100
	label: any;
	name: string;
	type: string; // select / input (目前只支持)
	placeholder: string;
	options?: string; // 如果是下拉框需要传该值
}


export interface iFilterItemProps {
	orderBy?: number; // default 100 (降序排序)
	label: string;
	name: string;
	key?: string;
	type: string; // select / input (目前只支持)
	options?: iFilterSelectItem[]; // 如果是下拉框需要传该值
	itemConfig?: any; // Form.item 的配置参数
	controlConfig?: any; // Form.item 的子组件配置参数
	// children: ReactNode<props>;
	[key: string]: any;
}


export interface iFilterSelectItem{
	value: any;
	msg: any;
}
