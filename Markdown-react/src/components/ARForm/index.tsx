import React, { FC } from 'react'
import { Form, Button, Space } from 'antd'
import { injectIntl } from 'react-intl'
import { iFormItemProps, iFormProps } from './type'

const ARItem: FC<iFormItemProps> = (props: iFormItemProps) => {
	const { label, name, children, ...config } = props;
	return <Form.Item
		name={name}
		label={label}
		labelCol={{ span: 4 }}
		wrapperCol={{ span: 20 }}
		{...config}
	>
		{children}
	</Form.Item>
}
/**
 * 支持antd的组件
 * **/
const ARForm = injectIntl((props: iFormProps) => {
	const {
		intl,
		onSubmit,
		layout,
		submitFlag = true,
		resetFlag = true,
		submitName, resetName,
		children,
		...config } = props
	return (
		<Form
			className="ar-form"
			name="ar-form"
			layout={layout || "horizontal"}
			labelCol={{ span: 5 }}
			wrapperCol={{ span: 19 }}
			onFinish={onSubmit}
			{...config}
		>
			{children}

			{(submitFlag || resetFlag) && <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Space size={20}>
					{submitFlag && <Button type="primary" htmlType="submit">
						{submitName || intl.formatMessage({ id: 'global.searchBtn' })}
					</Button>}
					{resetFlag && <Button type="primary" htmlType="reset">
						{resetName || intl.formatMessage({ id: 'global.resetBtn' })}
					</Button>}
				</Space>
			</Form.Item>}

		</Form>
	);
})

ARForm.Item = ARItem

export default ARForm;