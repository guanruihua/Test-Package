import React, { FC } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { injectIntl } from 'react-intl';
import { iFilterItemProps, iFilterProps } from './type'
import './index.less'

const renderSelectOption: any =
	(placeholder: string, list: { value: string, msg: string }[], controlConfig?: any): any => {
		return <Select
			placeholder={placeholder}
			{...controlConfig}>
			{list.map((item: { value: string, msg: string }): any => {
				return <Select.Option key={item.value} value={item.value}>{item.msg}</Select.Option>
			})}
		</Select>
	}

const ARSearchItem: FC<iFilterItemProps> = (props: iFilterItemProps) => {
	const { label, name, children, orderBy, ...config } = props;
	return <Form.Item
		name={name}
		label={label}
		{...config}
	>
		{children}
	</Form.Item>
}

const Index = injectIntl((props: iFilterProps) => {
	const { intl } = props;
	const { onSearch, submitName, resetName, children, formItemList = [], ...rest } = props
	const onFinish = (value: any) => { onSearch && onSearch(value) }
	const onReset = () => { onSearch && onSearch({}) }

	// 合并children 和 formItemList 形成要渲染的数组
	let AllFormItemList: any[] = formItemList;
	if (children) {
		if (Array.isArray(children)) {
			AllFormItemList = AllFormItemList.concat(children)
		} else {
			AllFormItemList.push(children)
		}
	}

	return (
		<Form
			className="ar-filter-form"
			name="ar-filter-form"
			layout="inline"
			onFinish={(params:any):any=>onFinish(params)}
			onReset={():any => onReset()}
			{...rest}
		>
			{AllFormItemList && AllFormItemList
				// 由于orderBy 的赋值处不相同, 这里统一一下
				.map((item: any): any => {
					let orderBy: number = 100;
					if (item?.props?.children) {
						orderBy = item.props.orderBy || 100;
					}
					if (typeof item?.orderBy === 'number') {
						orderBy = item.orderBy;
					}
					return {
						orderBy,
						item,
					};
				})
				// 根据orderBy 排序(降序)
				.sort(
					function (
						a: { orderBy: number, [key: string]: any },
						b: { orderBy: number, [key: string]: any }): number {
						return b.orderBy - a.orderBy;
					})
				// 渲染
				.map((it: any): any => {
					const item: any = it.item;
					const { itemConfig, controlConfig, type } = item;
					if (item.type === 'select')
						return (
							<Form.Item
								key={item.name}
								label={item.label}
								name={item.name}
								{...itemConfig}
							>
								{renderSelectOption(item.placeholder, item.options, controlConfig)}
							</Form.Item>
						)
					if (item.type === 'input')
						return (
							<Form.Item
								key={item.name}
								label={item.label}
								name={item.name}
								{...itemConfig}
							>
								<Input placeholder={item.placeholder} {...controlConfig} />
							</Form.Item>
						)
					return item;
				})
			}

			<Form.Item>
				<Button type="primary" htmlType="submit">
					{submitName || intl.formatMessage({ id: 'global.searchBtn' })}
				</Button>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="reset">
					{resetName || intl.formatMessage({ id: 'global.resetBtn' })}
				</Button>
			</Form.Item>
		</Form>
	);
})

Index.ARSearchItem = ARSearchItem

export default Index