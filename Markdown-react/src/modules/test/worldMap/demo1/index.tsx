import React, { useState } from 'react';
import mapList from './mworld.json'
import './index.less'

class Index extends React.Component {
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



	render() {
		const originColor = "#fff";
		const hoverColor = "#57aaf8"
		const selectColor = "#57aaf8"
		const countryBorderColor = "#4c5749"
		const countryBorderWith = 0.5
		const { textList, hoverItem, selectList = [] }: { [k: string]: any[] } = this.state;
		const { setHoverItem, setTextList, addSelectList }: { [k: string]: any } = this;

		return <div
			style={{ /* border: '1px solid #000', */ position: 'relative', marginLeft: 100 }}
		>
			<svg
				// style={{ border: '1px solid #000' }}
				preserveAspectRatio="none"
				viewBox={"0 0 700 350"}
				width={'700px'}
				height={'350px'}
			>

				{mapList.data.map((item: any) => {
					const { d, id, name = '', mx, my }: any = item

					return <g key={id + 'g'} >
						<path
							onClick={(e: any) => {
								e.target.style.fill = selectColor
								if (!selectList.includes(id)) {
									let tempTextList = textList.concat([{ ...item, x: mx, y: my }])
									setTextList(tempTextList)
									addSelectList(id)
								}
							}}
							onMouseOver={(e: any) => {
								if (!selectList.includes(id) && hoverItem.length < 1) {
									let tempHoverItem: any[] = [{ ...item, x: mx, y: my }]
									setHoverItem(tempHoverItem)
								}
								e.target.style.fill = hoverColor
							}}
							onMouseLeave={(e: any) => {
								!selectList.includes(id) && (e.target.style.fill = originColor)
								setHoverItem([])
							}}
							key={id}
							d={d}
							style={{
								fill: originColor,
								stroke: countryBorderColor,
								strokeWidth: countryBorderWith
							}} />
					</g>
				})}
				<g>
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
				</g>
			</svg>
			{/* {hoverItem.map((item: any) => {
				const { name, id, x, y } = item;
				return <div
					key={id + "text"}
					style={{ position: "absolute", left: x, top: y }}
				>{name}</div>
			})} */}

			{/* {textList.map((item: any) => {
				const { name, id, x, y } = item;
				return <div
					key={id + "text"}
					style={{ position: "absolute", left: x, top: y }}
				>{name}</div>
			})} */}

		</div>
	}


}
export default Index;