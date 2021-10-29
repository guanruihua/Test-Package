import { ReactNode } from 'react'
import { tLang, iLang } from '@/assets/type';

type tDataSource = {
	[key: string]: any;
}

interface iPagination {
	total: number;
	current: number;
	pageSize: number;
}

interface iTableCol {
	key: string;
	dataIndex: string | string[];
	title?: ReactNode | string;
	width?: number | string;
	align?: 'left' | 'right' | 'center';
	render?: (text?: any, record?: { [key: string]: any }, index?: number) => any;
	[key: string]: any;
}

interface iTableProps {
	dataSource: tDataSource[];
	columns: iTableCol[];
	showNum?: boolean; // default true (显示序号)
	pagination?: iPagination | false; // 分页(default false)
	onChange?: (page: number, pageSize: number) => void; // 分页回调
	pageSizeOptions?: number[];
	lang?: tLang | string; // edit lang (edit lang 标识)
	languageEditCallBack?: (lang: tLang | string) => void; // edit lang callback
	langs?: iLang[]; // edit lang select option(不传就是默认中英繁)
	children?: ReactNode;
	[key: string]: any;
}

export { iTableProps, tDataSource, iPagination, iTableCol }
