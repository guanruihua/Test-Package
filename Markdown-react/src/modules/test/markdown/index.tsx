import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

const markdown = `A paragraph with *emphasis* and **strong importance**.`;

const Index = () => {
	return <div>
		<h3>ARFilter</h3>
		<ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
	</div>
}

export default Index