import React, { FC } from 'react';
import FinitMenu from './FinitMenu';
import FinitContent from './FinitContent';
import './index.less';

const Index: FC = () => {
	return <div className="home-content">
		<FinitMenu />
		<FinitContent />
	</div>
}


export default Index;