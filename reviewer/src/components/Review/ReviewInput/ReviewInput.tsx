import React, { forwardRef, useRef } from 'react'

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
	{ color: 'red', emojiUrl: angryFace },
	{ color: 'orange', emojiUrl: slightlyFrowningFace },
	{ color: 'lightorange', emojiUrl: neutralFace },
	{ color: 'yellow', emojiUrl: slightlySmilingFace },
	{ color: 'lightyellow', emojiUrl: grinningFace }
]


interface ReviewInputProps {
	category: string
}

const ReviewInput = forwardRef((props: ReviewInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
	const statusBarRef = useRef<HTMLDivElement>(null)
	const handleChange = () => {
		if (statusBarRef.current && ref.current !== null)
		statusBarRef.current.style.backgroundColor = rangeStates[ref.current.value].color
	}
	return (
		<div className={s.wrapper}>
			<input ref={ref} type="range" min="1" max="5" step="1" 
				onChangeCapture={handleChange} name={props.category}/>
			<div ref={statusBarRef} className={s.statusBar}></div>
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