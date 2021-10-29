import React from 'react';
import { Collapse } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as SynStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import './index.less'
const { Panel } = Collapse;

export default (props: any) => {
	return <Collapse defaultActiveKey={[]}>
		<Panel header="code" key="1">
			<SyntaxHighlighter showLineNumbers={true}
				startingLineNumber={0}
				language={'tsx'}
				style={ SynStyles['coy']}
				lineNumberStyle={{ color: '#ddd', fontSize: 14 }}
				wrapLines={true}
			>
				{props.children}
			</SyntaxHighlighter>
		</Panel>
	</Collapse>
}