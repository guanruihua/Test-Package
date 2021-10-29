/**
 * 1. 开始按照统计分析的样式开始制作
 * 2. 封装成组件使用
 * 3. 为兼容react<16, 不使用钩子等方法
 */

import React, { useState } from 'react';
import mapList from './mworld.json'
import './index.less';
function mapObjectProps(...params: any[]): { [k: string]: any } {
	let result: { [k: string]: any } = {}
	params.forEach((item: any) => {
		Object.assign(result, item)
	})
	return result
}


class Index extends React.Component {
	constructor(props: any) {
		super(props);
	}
	state: { [k: string]: any[] } = {
		textList: [],
		hoverItem: [],
		selectList: [],
	}
	setTextList = (val: any[]) => {
		this.setState({ textList: val })
	}

	setHoverItem = (val: any[]) => {
		this.setState({ hoverItem: val })
	}

	addSelectList = (val: any) => {
		let temp: any[] = this.state.selectList.concat([val])
		this.setState({ selectList: temp })
	}

	handleDbClick = (e: any) => {
		console.log('dbClick',)
	}



	render() {
		const originColor = "#fff";
		const hoverColor = "#57aaf8"
		const selectColor = "#57aaf8"
		const countryBorderColor = "#4c5749"
		const countryBorderWith = 0.5

		const {
			textList, hoverItem, selectList = [],
			setHoverItem, setTextList, addSelectList, handleDbClick,
			zoom = false,
		}: { [k: string]: any } = mapObjectProps(this.state, this, this.props);

		return <div className="world-map-svg-content" >
			{zoom && (<div className="world-map-svg-zoom-btn" >
				<button>+</button>
				<button>-</button>
			</div>)}
			<svg
				className="world-map-svg-map"
				preserveAspectRatio="none"
				viewBox={"0 0 700 350"}
				width={'700px'}
				height={'350px'}
				onDoubleClick={(e: any) => {
					handleDbClick(e);
					// console.log(e)
				}}
			>

				{mapList.data.map((item: any) => {
					const { d, id, name = '', mx, my }: any = item

					return <g key={id + 'g'} >
						<path
							onDoubleClick={(e: any) => {
								// console.log(e)
								handleDbClick(e);
							}}
							// onClick={(e: any) => {
							// 	e.target.style.fill = selectColor
							// 	if (!selectList.includes(id)) {
							// 		let tempTextList = textList.concat([{ ...item, x: mx, y: my }])
							// 		setTextList(tempTextList)
							// 		addSelectList(id)
							// 	}
							// }}
							// onMouseOver={(e: any) => {
							// 	if (!selectList.includes(id) && hoverItem.length < 1) {
							// 		let tempHoverItem: any[] = [{ ...item, x: mx, y: my }]
							// 		setHoverItem(tempHoverItem)
							// 	}
							// 	e.target.style.fill = hoverColor
							// }}
							// onMouseLeave={(e: any) => {
							// 	!selectList.includes(id) && (e.target.style.fill = originColor)
							// 	setHoverItem([])
							// }}
							key={id}
							d={d}
							style={{
								fill: originColor,
								stroke: countryBorderColor,
								strokeWidth: countryBorderWith
							}} />
					</g>
				})}
				{/* <g>
					{hoverItem.map((item: any) => {
						const { name, id, x, y } = item;
						return <text
							key={id + "text"}
							x={x}
							y={y}
						>{name}</text>
					})}
				</g>
				<g>
					{textList.map((item: any) => {
						const { name, id, x, y } = item;
						return <text
							key={id + "text"}
							x={x}
							y={y}
						>{name}</text>
					})}
				</g> */}
			</svg>

		</div>
	}
}

export default Index;