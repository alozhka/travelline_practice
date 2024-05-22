import React, { forwardRef } from 'react'

interface ReviewInputProps {
	category: string
}

const ReviewInput = forwardRef((props: ReviewInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
	return (
		<input ref={ref} type="range" min="1" max="5" step="1" name={props.category} />
	)
})


export default ReviewInput