import s from './ReviewForm.module.css'
import ReviewCategory from '../ReviewCategory/ReviewCategory.tsx'
import InputArea from '../../InputArea/InputArea.tsx'

const ReviewForm = () => {
	const categories: string[] = ['Чистенько', 'Сервис', 'Скорость', 'Место ', 'Культура речи']

	return (
		<form className={s.reviewForm}>
			<h2>Помогите нам сделать процесс бронирования лучше</h2>
			<div className={s.categories}>
				{ categories.map((category, index) =>
					<ReviewCategory key={'category' + index} category={category}/>) }
			</div>
			<div className={s.dataInsertion}>
				<InputArea type='name' header='*Имя' placeholder='Как вас зовут?' />
				<textarea placeholder='Напишите, что понравилось, что было непонятно' />
			</div>
		</form>
	)
}


export default ReviewForm