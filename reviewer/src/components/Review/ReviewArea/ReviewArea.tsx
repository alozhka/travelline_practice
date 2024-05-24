import { Review } from '../../../core/types.ts'
import Avatar from '../../Avatar/Avatar.tsx'
import s from './ReviewArea.module.css'


interface ReviewProps {
	review: Review,
	avatarUrl?: string
}

const ReviewArea = (props: ReviewProps) => {
	return (
		<div className={s.wrapper}>
			<div>
				<Avatar />
			</div>
			<div>
				<h2>{props.review.name}</h2>
				<p>{props.review.comment}</p>
			</div>
			<span>{props.review.grade.value} / {props.review.grade.max}</span>
		</div>
	)
}


export default ReviewArea