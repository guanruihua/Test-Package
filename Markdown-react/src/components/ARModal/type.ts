import { ReactNode } from 'react'


export interface iModalProps {
	name: string
	title: string
	visible: boolean
	setIsModalVisible: (status: boolean) => void // 控制modal显隐
	onOk: (values: any) => boolean // 只有true 才会关闭modal
	onCancel?: () => boolean //如果有该方法, 返回值要为true才可以关闭modal
	isform?: boolean // default false, 标记是否modal的按钮是否绑定modal>form的onsubmit和reset事件
	children?: ReactNode | any;
	[key: string]: any
}