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