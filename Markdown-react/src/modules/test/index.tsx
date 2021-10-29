import React, { FC, useState } from 'react';
import { injectIntl } from 'react-intl';
// import { ARForm } from '@/components'
// import { Props, TBase } from '../../assets/interface/global'
// import { useTranslation } from 'react-i18next'
// import { RHButton, RHFilter, RHTable, RHForm, RHModal } from '../../components'
// import { Button, Input } from 'antd';

const Test1: FC = () => {

	return (<div>123</div>
		// <ARForm>

		// </ARForm>
	)
}

class Test22 extends React.Component {
	render() {
		return <div>Test2</div>
	}
}
const Test2 = () => {
	return <Test22 />
}

// const Test2: FC = (props: any) => {
// 	console.log(props)
// 	return <div>Test2</div>
// }
const Test3: FC = () => {
	return <div>Test3</div>
}
const Test4: FC = () => {
	return <div>Test4</div>
}

const Test5: FC = () => {
	return (<div>Tes5</div>)
}
const Test6: FC = () => {
	return (<div>Tes6</div>)
}
export {
	Test1,
	Test2,
	Test3,
	Test4,
	Test5,
	Test6,
}