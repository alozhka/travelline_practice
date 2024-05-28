import React, { forwardRef, ReactNode, useRef, useState } from 'react'

import s from './ReviewInput.module.css'
import angryFace from './images/twemoji_angry-face.svg'
import slightlyFrowningFace from './images/twemoji_slightly-frowning-face.svg'
import neutralFace from './images/twemoji_neutral-face.svg'
import slightlySmilingFace from './images/twemoji_slightly-smiling-face.svg'
import grinningFace from './images/twemoji_grinning-face-with-big-eyes.svg'


type RangeState = {
	color: string,
	emojiUrl: string
}

const rangeStates: RangeState[] = [
	{ color: '#F24E1E', emojiUrl: angryFace },
	{ color: '#FF8311', emojiUrl: slightlyFrowningFace },
	{ color: '#FF8311', emojiUrl: neutralFace },
	{ color: '#FFC700', emojiUrl: slightlySmilingFace },
	{ color: '#FFC700', emojiUrl: grinningFace }
]


interface ReviewInputProps {
	category: string
}

const ReviewInput = forwardRef((props: ReviewInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
	const statusBarRef = useRef<HTMLDivElement>(null)
	const closingBarRef = useRef<HTMLDivElement>(null)
	const [rangePoints, setRangePoints] = useState<ReactNode[]>([])
	
	const adjustRenderComponents = () => {
		if (statusBarRef.current && closingBarRef.current && ref !== null && 'current' in ref && ref.current) {
			const currentIndex = ref.current.valueAsNumber - 1
			statusBarRef.current.style.backgroundColor = rangeStates[currentIndex].color
			closingBarRef.current.style.width = `${100 - 25 * currentIndex}%`
			closingBarRef.current.style.marginLeft = `${100 - 25 * (4 - currentIndex)}%`
			setRangePoints(rangeStates.map((range, i) => {
				if (currentIndex > i)
					return <div key={`range${props.category}${i}`} className={s.rangePoint} style={{
						backgroundColor: rangeStates[currentIndex].color
					}}></div>
				else if (currentIndex === i)
					return <img key={`range${props.category}${i}`} src={range.emojiUrl} className={s.rangePointImage} 
								alt="face emoji"/>
				return <div key={`range${props.category}${i}`} className={s.rangePoint}></div>
			}))
		}
	}

	
	return (
		<div className={s.wrapper}>
			<input ref={ref} type="range" min="1" max="5" step="1" 
				onChangeCapture={adjustRenderComponents} name={props.category}/>
			<div ref={statusBarRef} className={s.statusBar}></div>
			<div ref={closingBarRef} className={`${s.statusBar} ${s.closingBar}`}></div>
			<div className={s.rangePoints}>{rangePoints}</div>
		</div>
	)
})


export default ReviewInput