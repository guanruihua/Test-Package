import React from 'react';
import MapCom from './com'

const Index = () => {

	const mapProps: any = {
		default: {
			country: '#f7f7f7',
			border: '#cccccc',
			select: '',
			hover: '',
		},
		zoom: true, // 开启缩放
		
	}

	return <MapCom {...mapProps} a={123} />
}

export default Index