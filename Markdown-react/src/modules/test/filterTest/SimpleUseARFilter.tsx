import React from 'react';
import { Form, Input } from 'antd';
import { ARFilter } from '@/components';
import { iFilterProps } from '@/components/ARFilter/type';
import filterCode from './code/simpleUse';
import Code from '../codeCom/code';
const ARSearchItem: any = ARFilter.ARSearchItem

const SimpleUseARFitler = () => {
	const filterProps: iFilterProps = {
		onSearch: (params: any) => {
			console.log(params)
		}
	}
	return <div style={{marginTop: 30}}>
		<h4>ARFilter 基础使用</h4>
		<ARFilter {...filterProps}>
			<Form.Item
				name="name1"
				label="name1"
			>
				<Input />
			</Form.Item>
			<ARSearchItem
				name="name2"
				label="name2"
			>
				<Input />
			</ARSearchItem>
		</ARFilter>
		<Code>{filterCode}</Code>
	</div>
}


export default SimpleUseARFitler