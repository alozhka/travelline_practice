interface ReviewInputProps {
	category: string
}

const ReviewInput = (props: ReviewInputProps) => {
	return (
		<input type="range" min="1" max="5" step="1" name={props.category} />
	)
}


export default ReviewInput