import React from 'react';
import { Form, Input } from 'antd';
import { ARFilter } from '@/components';
import { iFilterProps, iFilterItemProps } from '@/components/ARFilter/type';
import configUse1 from './code/configUse1';
import configUse2 from './code/configUse2';
import Code from '../codeCom/code';
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
	return <div>
		<h4 style={{ marginTop: 30 }}>ARFilter 通过config使用</h4>
		<ARFilter {...filterProps}>
			<Form.Item
				name="name1"
				label="name1"
			>
				<Input placeholder={'orderBy 100'} />
			</Form.Item>
			<ARSearchItem
				name="name2"
				label="name2"
			>
				<Input placeholder={'orderBy 100'} />
			</ARSearchItem>
		</ARFilter>
		<Code>{configUse1}</Code>
		<h4 style={{ marginTop: 30 }}> 使用 orderBy 属性 ARFIiter 子组件不可以使用Form.Item, 要换用ARSearchItem 才可以添加orderBy属性</h4>
		<ARFilter {...filterProps}>
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
		<Code>{configUse2}</Code>
	</div>
}

export default ConfigToUseARFitler