import s from './ReviewCategory.module.css';
import ReviewInput from '../ReviewInput/ReviewInput.tsx'

interface ReviewCategoryProps {
	category: string
}

const ReviewCategory = (props: ReviewCategoryProps) => {
	return (
		<div className={s.category}>
			<div>
				<ReviewInput category={props.category}/>
			</div>
			<div>
				<label htmlFor={props.category}>{props.category}</label>
			</div>
		</div>
	)
}


export default ReviewCategory