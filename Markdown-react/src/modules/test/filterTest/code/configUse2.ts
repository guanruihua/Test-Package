export default `
import React from 'react';
import { Form, Input } from 'antd';
import { ARFilter } from '@/components';
import { iFilterProps, iFilterItemProps } from '@/components/ARFilter/type';
const ARSearchItem: any = ARFilter.ARSearchItem

const formItemList: iFilterItemProps[] = [
	{
		orderBy: 123,
		key: 'name321',
		label: 'name3',
		name: 'name3',
		type: 'input',
		controlConfig: {
			placeholder: 'orderBy 123'
		}
	}, {
		orderBy: 56,
		key: 'name4321',
		label: 'name4',
		name: 'name4',
		type: 'select',
		controlConfig: {
			placeholder: 'orderBy 56'
		},
		options: [
			{
				value: 'option1',
				msg: 'option1'
			},
			{
				value: 'option2',
				msg: 'option2'
			}
		]
	}
]

const ConfigToUseARFitler = () => {

	const filterProps: iFilterProps = {
		onSearch: (params: any) => {
			console.log(params)
		},
		// 直接使用formItemList
		// formItemList,
		formItemList: formItemList.map((item: iFilterItemProps): iFilterItemProps => {
			const { key = '' }: { [key: string]: string } = item;
			key === 'name4321' && (
				item.options = [
					{
						value: 'option1',
						msg: 'option1'
					},
					{
						value: 'option2',
						msg: 'option2'
					}, {
						value: 'option3',
						msg: 'option3'
					}
				]
			)
			return item;
		})
	}
	return <ARFilter {...filterProps}>
			<ARSearchItem
				name="name1"
				label="name1"
			>
				<Input placeholder={'orderBy 100'} />
			</ARSearchItem>
			<ARSearchItem
				orderBy={999}
				name="name2"
				label="name2"
			>
				<Input placeholder={'orderBy 999'} />
			</ARSearchItem>
		</ARFilter>
}

export default ConfigToUseARFitler `