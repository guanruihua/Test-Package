import React from 'react';

const PreviewCom = (props: any) => {
	const { text }: {text:string} = props;
// 将值替换为预览值
	let tempText = text.replace(/\$\{productRecall\.number\}/, '123457859137458');



	return <div>PreviewCom
		<div>
			<h2>html</h2>
			<div>{text.replace(/\$\{productRecall\.number\}/gi, '123457859137458')}</div>
			{/* <div>{tempText}</div> */}
		</div>
		<div>
			<h2>html preview</h2>
			{/* <div dangerouslySetInnerHTML={{ __html: tempText }}> */}
			<div dangerouslySetInnerHTML={{ __html: text.replace(/\$\{productRecall\.number\}/gi, '123457859137458') }}>

			</div>
		</div>
	</div>
}

const InpputCom = (props: any) => {
	const { text, setText } = props;
	return <div>
		importCOm
		<div>
			<textarea style={{ width: 1400, height: 100 }} defaultValue={text} onChange={e => {
				// console.log(e.target.value)
				setText(e.target.value)
			}}></textarea>
		</div>
	</div>
}


const Index = () => {

	const [text, SetText] = React.useState('<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title> </head> <body> text ${productRecall.number} ${productRecall.number} </body> </html>')



	return <div>
		<InpputCom text={text} setText={SetText} />
		<PreviewCom text={text} />
	</div>
}

export default Index;