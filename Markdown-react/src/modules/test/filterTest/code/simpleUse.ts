export default `
import React from 'react';
import { Form, Input } from 'antd';
import { ARFilter } from '@/components';
import { iFilterProps } from '@/components/ARFilter/type';
const ARSearchItem: any = ARFilter.ARSearchItem

const SimpleUseARFitler = () => {
	const filterProps: iFilterProps = {
		onSearch: (params: any) => {
			console.log(params)
		}
	}
	return <ARFilter {...filterProps}>
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
}

export default SimpleUseARFitler`