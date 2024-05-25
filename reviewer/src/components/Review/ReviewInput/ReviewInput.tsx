import React, { forwardRef, useEffect, useRef } from 'react'

import s from './ReviewInput.module.css'
import angryFace from './images/twemoji_angry-face.svg'
import slightlyFrowningFace from './images/twemoji_slightly-frowning-face.svg'
import neutralFace from './images/twemoji_neutral-face.svg'
import slightlySmilingFace from './images/twemoji_slightly-smiling-face.svg'
import grinningFace from './images/twemoji_grinning-face-with-big-eyes.svg'
import { Simulate } from 'react-dom/test-utils'
import compositionStart = Simulate.compositionStart

type RangeState = {
	color: string,
	emojiUrl: string
}

//TODO: переделать на хештеги из фигмы
const rangeStates: RangeState[] = [
	{ color: 'red', emojiUrl: angryFace },
	{ color: 'orangered', emojiUrl: slightlyFrowningFace },
	{ color: 'darkorange', emojiUrl: neutralFace },
	{ color: 'orange', emojiUrl: slightlySmilingFace },
	{ color: 'yellow', emojiUrl: grinningFace }
]


interface ReviewInputProps {
	category: string
}

const ReviewInput = forwardRef((props: ReviewInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
	const statusBarRef = useRef<HTMLDivElement>(null)
	const closingBarRef = useRef<HTMLDivElement>(null)
	
	const handleChange = () => {
		if (statusBarRef.current && closingBarRef.current) {
			const index = ref.current.valueAsNumber - 1
			statusBarRef.current.style.backgroundColor = rangeStates[index].color
			closingBarRef.current.style.width = `${100 - 25 * index}%`
			closingBarRef.current.style.marginLeft = `${100 - 25 * (4 - index)}%`
		}
	}
	useEffect(() => handleChange())
	return (
		<div className={s.wrapper}>
			<input ref={ref} type="range" min="1" max="5" step="1" 
				onChangeCapture={handleChange} name={props.category}/>
			<div ref={statusBarRef} className={s.statusBar}></div>
			<div ref={closingBarRef} className={`${s.statusBar} ${s.closingBar}`}></div>
			<div className={s.rangePoints}>
				{ rangeStates.map((range, index) => 
					<div key={`range${props.category}${index}`} className={s.rangePoint} style={{
						backgroundImage: range.emojiUrl
					}}></div>
				)}
			</div>
		</div>
	)
})


export default ReviewInput