import React, { FC, useState } from 'react'
import { injectIntl } from 'react-intl';
import { Table, Pagination, Select } from 'antd'
import { FormattedMessage } from 'react-intl';
import { iLang } from '@/assets/type';
import { iTableProps, tDataSource } from './type'
import './index.less';
const { Option } = Select;

type tAny = { [key: string]: any }


const defaultLangs: iLang[] = [
	{ lang: 'zh_CN', name: '简体中文' },
	{ lang: 'zh_TW', name: '繁體中文' },
	{ lang: 'en_US', name: 'English' },
];

const defaultPagination: { [key: string]: any } = {
	size: "small",
	showTotal: (total: any, range: any): any => <span>
		<FormattedMessage id="global.app.info.talbe.total" /> :{total}
	</span>,
	showSizeChanger: true,
	showQuickJumper: true,
}

const getPaginationConfig =
	({ pagination, pageSizeOptions, onChange, dataSource }: tAny): tAny | false => {
		// console.log(dataSource.length)
		/* 分页 start */

		if (pagination && pagination !== {}) {
			return {
				onChange: (page: number, pageSize: number): void => {
					localStorage.setItem('pageSize', String(pageSize));
					onChange && onChange(page, pageSize)
				},
				pageSizeOptions,
				...defaultPagination,
				...pagination,
			}
		}

		return false;
		/* 分页 end */
	}



const Index: FC<iTableProps> = injectIntl((props: iTableProps) => {

	const {
		dataSource = [], columns = [], children,
		pagination = false, onChange, pageSizeOptions = [10, 20, 50],
		showNum = true,
		lang, languageEditCallBack, langs = defaultLangs,
		intl, ...config } = props;
	let shouwDataSourrce: tDataSource[] = [];


	let tpagination: { [key: string]: any } | false =
		getPaginationConfig({ pagination, pageSizeOptions, onChange, dataSource: props.dataSource });

	/* 序号 start */
	if (showNum) {
		columns.filter((item: any): any => item.dataIndex === 'AR-Table-Index').length < 1
			&& columns.unshift({
				title: intl.formatMessage({ id: 'global.tableNo' }),
				dataIndex: 'AR-Table-Index',
				width: 75,
				key: 'AR-Table-Index',
				align: 'center',
			})
		shouwDataSourrce = dataSource.map((item: any, index: number): any => {
			item['AR-Table-Index'] = index + 1;
			return item;
		})
	} else {
		shouwDataSourrce = dataSource;
	}
	/* 序号 end */

	return (
		<div className="ar-table-content">
			<div className="ar-table-head">
				<div className={`ar-table-head-btn${children ? '' : '-none'}`}>
					{children}
				</div>
				<div className={`ar-table-head-btn${lang ? '' : '-none'}`}>
					{lang && <div className="ar-table-lang-switch">
						<Select
							defaultValue={lang}
							onChange={languageEditCallBack}>
							{langs.map((item: iLang): any => {
								const { name, lang } = item;
								return <Option key={lang} value={lang}>{name}</Option>
							})}
						</Select>
					</div>}
				</div>
			</div>
			{tpagination !== false && <Pagination
				className="ar-table-head-pagination"
				{...tpagination} />}
			<Table
				bordered
				className="ar-main-table"
				dataSource={shouwDataSourrce}
				columns={columns}
				pagination={tpagination}
				{...config}
			/>
		</div>

	)

})

export default Index