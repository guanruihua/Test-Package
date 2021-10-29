import React, { FC, useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import { Form } from 'antd';
import { ARForm, ARFilter, ARTable, ARModal } from '@/components';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { injectIntl } from 'react-intl';
import { iModalProps } from '@/components/ARModal/type';
import { Common, Utils } from '@/assets';
import { ARFilterType, ARTableType } from '@/assets/type/ARComponent';
import { iLang, tLang } from '@/assets/type';
const FormItem: any = Form.Item;
const ARFormItem: any = ARForm.Item;
const ARModalFormItem: any = ARModal.Item;
const namespace: string = 'TestStore';

const columns: { [key: string]: any }[] = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: '操作',
		dataIndex: 'operation',
		key: 'operation',
		render: (text?: { [key: string]: any }, record?: { [key: string]: any }, index?: number): any => {
			return (
				<Button
					icon={<PlusOutlined />}
					onClick={(): any => {
						Utils.event.emit('test2-modal', { test: 'test data', record })
					}
					}>
					btn
				</Button>
			)
		}
	},
]



const TestModa: any = ({ intl }: { [key: string]: any }) => {
	const name: string = 'test2-modal';
	const { param, ...rest } = ARModal.connect(name);
	const { required } = Common.Validates(intl);

	// console.log(param)
	const modalProps: any = {
		name,
		title: 'test2-modal',
		isform: true,
		onOk: (values: any): boolean => {
			console.log('values', values);
			return true;
		},
		...rest,
	}

	return (
		<ARModal {...modalProps} >
			<ARForm>
				{JSON.stringify(param)}
				<ARModalFormItem
					label="name"
					name="name"
					rules={[required]}
				>
					<Input />
				</ARModalFormItem>
			</ARForm>
		</ARModal>
	)
}


@inject(namespace)
@observer
class Index extends React.Component<any, any> {

	componentDidMount() {
		this.props.TestStore.query({});
		this.props.TestStore.ttApi && this.props.TestStore.ttApi();
	}

	render() {
		const { intl } = this.props;
		const [tablePropsTemp, modalPropsTemp, filterProps]
			= Utils.splitTableProps(this.props[namespace]);
		const { required } = Common.Validates(intl);

		const testModal: any = {
			intl,
		}

		const modalProps: iModalProps = {
			name: 'test-modal',
			title: 'test-modal',
			onOk: (values: any): boolean => {
				console.log('values', values);
				return true;
			},
			onCancel: (): boolean => {
				return true;
				// return false;
			},
			...modalPropsTemp,
		}

		const tableProps: ARTableType.iTableProps = {
			rowKey: ((record: any): any => record.id),
			columns,
			...tablePropsTemp,
			// pagination: {}
		}

		return (<div>
			<ARFilter {...filterProps} >
				<FormItem
					label={"name"}
					name="name"
				>
					<Input />
				</FormItem>
			</ARFilter>

			<ARTable {...tableProps} >
				<Button
					icon={<PlusOutlined />}
					onClick={(): any => {
						modalProps.setIsModalVisible(true)
						Utils.event.emit('test-modal', { test: 'test data' })
					}
					}>
					btn
				</Button>
			</ARTable>

			<ARModal {...modalProps} >
				<ARForm>
					<ARModalFormItem
						label="name"
						name="name"
						rules={[required]}
					>
						<Input />
					</ARModalFormItem>
				</ARForm>
			</ARModal>

			<TestModa {...testModal} />
		</div>)
	}
}
export default injectIntl(Index)

// @inject('TestStore')
// @observer
// class Index extends React.Component<any, any> {

// 	componentDidMount() {
// 		this.props.TestStore.query({});
// 		this.props.TestStore.query2 && this.props.TestStore.query2();
// 		this.props.TestStore.ttApi && this.props.TestStore.ttApi();
// 	}

// 	render() {
// 		const { intl } = this.props;
// 		// const {
// 		// 	onSearch,
// 		// 	loading,
// 		// 	pagination, dataSource, visible, setIsModalVisible,
// 		// 	onChange, lang, languageEditCallBack } = this.props.TestStore;
// 		const [tablePropsTemp, modalPropsTemp, filterPropsTemp] = Utils.splitTableProps(this.props.TestStore);
// 		const { required } = Common.Validates(intl);

// 		const modalProps: iModalProps = {
// 			name: 'test-modal',
// 			title: 'test-modal',
// 			onOk: (values: any): boolean => {
// 				console.log('values', values);
// 				return true;
// 			},
// 			...modalPropsTemp,
// 			// visible,
// 			// setIsModalVisible,
// 			// isform: true,
// 			// onCancel: (): void => console.log('modal close'),
// 		}


// 		const filterProps: ARFilterType.iFilterProps = {
// 			initialValues: {
// 				name: 123,
// 			},
// 			...filterPropsTemp,
// 			// onSearch,
// 		}

// 		const tableProps: ARTableType.iTableProps = {
// 			rowKey: ((record: any): any => record.id),
// 			columns: [
// 				{
// 					title: '姓名',
// 					dataIndex: 'name',
// 					key: 'name',
// 				},
// 				{
// 					title: '年龄',
// 					dataIndex: 'age',
// 					key: 'age',
// 				},
// 				{
// 					title: '操作',
// 					dataIndex: 'operation',
// 					key: 'operation',
// 					render: (): any => {
// 						return <div>123</div>
// 					}
// 				},
// 			],
// 			...tablePropsTemp,
// 			// dataSource,
// 			// pagination,
// 			// onChange,
// 			// lang,
// 			// languageEditCallBack,
// 			// loading,
// 		}

// 		return <div>
// 			<ARFilter {...filterProps} >
// 				<FormItem
// 					label={"name"}
// 					name="name"
// 				>
// 					<Input />
// 				</FormItem>
// 			</ARFilter>
// 			<ARTable {...tableProps} >
// 				<Button icon={<PlusOutlined />} onClick={(): any => modalProps.setIsModalVisible(true)}>123</Button>
// 			</ARTable>
// 			<ARModal {...modalProps} >
// 				<ARForm>
// 					<ARFormItem
// 						label="name"
// 						name="name"
// 						rules={[required]}
// 					>
// 						<Input />
// 					</ARFormItem>
// 				</ARForm>
// 			</ARModal>
// 		</div>
// 	}
// }
// export default injectIntl(Index)


// const Index: FC = injectIntl((props: any) => {
// 	const { intl } = props;
// 	const { add, query, loading, pagination, setPagination, getPagination } = props.TestStore;
// 	const { required } = Common.Validates(intl);
// 	const [visible, setIsModalVisible] = useState(false)
// 	// const [pagination, setPagination] = useState({
// 	// 	current: 1,
// 	// 	pageSize: 10,
// 	// 	total: 101,
// 	// });
// 	const [lang, setLang] = useState('zh_CN')

// 	// React.useEffect(() => {
// 	// 	query();
// 	// }, [1])


// 	const modalProps: iModalProps = {
// 		name: 'test-modal',
// 		title: 'test-modal',
// 		visible,
// 		setIsModalVisible,
// 		isform: true,
// 		onOk: (values: any): boolean => {
// 			console.log('values', values);
// 			return true;
// 		},
// 		onCancel: (): void => console.log('values', 'close'),
// 	}


// 	const filterProps: ARFilterType.iFilterProps = {
// 		initialValues: {
// 			name: 123,
// 		},
// 		onSearch: (values: any) => {
// 			// add();
// 			console.log(values)
// 			setPagination({
// 				current: 2,
// 				pageSize: 20,
// 				total: 102,
// 			})
// 		}
// 	}

// 	const tableProps: ARTableType.iTableProps = {
// 		dataSource: [
// 			{
// 				key: '1',
// 				name: '胡彦斌',
// 				age: 32,
// 			},
// 			{
// 				key: '2',
// 				name: '胡彦祖',
// 				age: 42,
// 			},
// 			{
// 				key: '3',
// 				name: '胡彦祖',
// 				age: 42,
// 			},
// 			{
// 				key: '4',
// 				name: '胡彦祖',
// 				age: 42,
// 			},
// 		],
// 		columns: [
// 			{
// 				title: '姓名',
// 				dataIndex: 'name',
// 				key: 'name',
// 			},
// 			{
// 				title: '年龄',
// 				dataIndex: 'age',
// 				key: 'age',
// 			},
// 			{
// 				title: '操作',
// 				dataIndex: 'operation',
// 				key: 'operation',
// 				render: (): any => {
// 					return <div>123</div>
// 				}
// 			},
// 		],
// 		// pagination: props.TestStore.pagination,
// 		// pagination,
// 		pagination: getPagination,
// 		lang,
// 		onChange: (page: number, pageSize: number): void => {
// 			console.log(page, pageSize);
// 		},
// 		languageEditCallBack: (value: tLang) => {
// 			console.log(value);
// 			setLang(value);
// 		},
// 		loading,
// 	}

// 	return <div>
// 		<ARFilter {...filterProps} >
// 			<FormItem
// 				label={"name"}
// 				name="name"
// 			>
// 				<Input />
// 			</FormItem>
// 		</ARFilter>
// 		<ARTable {...tableProps} >
// 			<Button icon={<PlusOutlined />} onClick={(): any => setIsModalVisible(true)}>123</Button>
// 		</ARTable>
// 		<ARModal {...modalProps} >
// 			<ARForm>
// 				<ARFormItem
// 					label="name"
// 					name="name"
// 					rules={[required]}
// 				>
// 					<Input />
// 				</ARFormItem>
// 			</ARForm>
// 		</ARModal>
// 	</div>
// })

// export default inject('TestStore')(observer(Index))
