import s from './ReviewCategory.module.css'
import ReviewInput from '../ReviewInput/ReviewInput.tsx'
import React, { forwardRef } from 'react'

interface ReviewCategoryProps {
	category: string
}

const ReviewCategory = forwardRef((props: ReviewCategoryProps, ref: React.ForwardedRef<HTMLInputElement>) => {
	return (
		<div className={s.category}>
			<div>
				<ReviewInput ref={ref} category={props.category}/>
			</div>
			<div>
				<label htmlFor={props.category}>{props.category}</label>
			</div>
		</div>
	)
})


export default ReviewCategory