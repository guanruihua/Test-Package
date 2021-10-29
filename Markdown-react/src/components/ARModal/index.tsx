import React, { FC, useEffect, useState } from 'react'
import { Modal, Form, Button } from 'antd'
import { FormattedMessage } from 'react-intl';
import { iModalProps } from './type'
import { iFormItemProps } from '../ARForm/type'
import { Utils } from '@/assets'

const ARItem: FC<iFormItemProps> = (props: iFormItemProps) => {
	const { label, name, children, ...config } = props;
	return <Form.Item
		name={name}
		label={label}
		labelCol={{ span: 24 }}
		wrapperCol={{ span: 24 }}
		{...config}
	>
		{children}
	</Form.Item>
}

interface StateProps {
	[key: string]: any;
}

// 要使用这个方法才可以使用 Uitls.event 观察者模式
const connect = (name: string) => {
	const [param, setParam]: [StateProps, any] = useState<StateProps>({});
	// const [param, setParam] = useState({});
	const [visible, setIsModalVisible] = useState(false);
	const setOnParam: any = (param: any) => {
		setIsModalVisible(true)

		setParam(param)
	}
	useEffect((): any => {
		Utils.event.on(name, setOnParam)
		return (): void => {
			Utils.event.off(name, setOnParam)
		}
	}, []);
	return { param, visible, setIsModalVisible }
}

const ARModal = (props: iModalProps) => {

	const [tempform] = Form.useForm();
	const {
		name, title, children, visible,
		footerObj = {
			onCancel: true,
			onCancelMsg: <FormattedMessage id="global.cancelBtn" />,
			onOk: true,
			onOkmsg: <FormattedMessage id="global.okBtn" />
		},
		setIsModalVisible, onOk, onCancel,
		isform = false, form = tempform,
		...config } = props;

	
    

	const handleOk = () => {
		isform && form.submit()
	}

	const handleCancel = () => {
		// onCancel 只要传了该方法, 一定要return true, 才可以关闭
		if (onCancel && onCancel()) {
			setIsModalVisible && setIsModalVisible(false)
			isform && form.resetFields()
		}

		if (!onCancel) {
			setIsModalVisible && setIsModalVisible(false)
			isform && form.resetFields()
		}
	}

	const onSubmit = (values: any) => {
		if (onOk && onOk(values)) {
			setIsModalVisible && setIsModalVisible(false)
			isform && form.resetFields()
		}
	}
	const onFinishFailed = (values: any) => {
		onOk && onOk(values)
	}

	return (
		<Modal
			forceRender
			title={title}
			visible={visible}
			maskClosable={false}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnClose={true}
			footer={[
				footerObj.onCancel && <Button key="back" onClick={handleCancel} >
					{footerObj.onCancelMsg}
				</Button>,
				footerObj.onOk && <Button key="submit" type="primary" onClick={handleOk}>
					{footerObj.onOkmsg}
				</Button>
			]}
			// footer= [{<Button key = "back" onClick = { this.handleCancel } >back</Button >}]

			{...config}
		>
			{!isform && children}
			{isform && <children.type
				form={form}
				onFinish={onSubmit}
				onFinishFailed={onFinishFailed}
				// submitFlag={false}
				// resetFlag={false}
				layout={'vertical'}
				{...children.props}
			>
				{children.props.children}
			</children.type>}
		</Modal>
	);
};

ARModal.Item = ARItem;
ARModal.connect = connect;

export default ARModal