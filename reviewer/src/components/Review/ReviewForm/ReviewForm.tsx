import s from './ReviewForm.module.css'
import ReviewCategory from '../ReviewCategory/ReviewCategory.tsx'
import InputArea from '../../InputArea/InputArea.tsx'
import React, { createRef, RefObject, useEffect, useRef, useState } from 'react'
import { getValues, submitData } from './ReviewForm.actions.ts'
import { SAVED_REVIEWS_NAME } from '../../../core/constants.ts'
import { Reviews } from '../../../core/types.ts'
import ReviewArea from '../ReviewArea/ReviewArea.tsx'

const ReviewForm = () => {
	const rawReviews = localStorage.getItem(SAVED_REVIEWS_NAME)
	const [reviews, setReviews] = useState<Reviews>(rawReviews ?
		JSON.parse(rawReviews) as Reviews : [])
	const categories: string[] = ['Чистенько', 'Сервис', 'Скорость', 'Место ', 'Культура речи']
	const categoriesRef = useRef<RefObject<HTMLInputElement>[]>(
		Array.from({ length: categories.length }, () => createRef<HTMLInputElement>())
	)
	const commentRef = useRef<HTMLTextAreaElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const categoriesGrades = getValues(categoriesRef.current)
		submitData(nameRef.current ? nameRef.current.value : null, 
			commentRef.current ? commentRef.current.value : '', categoriesGrades
		)
			.then(r => setReviews([...reviews, r]))
			.catch(e => alert(e))
	}
	
	useEffect(() => localStorage.setItem(SAVED_REVIEWS_NAME, JSON.stringify(reviews)), [reviews])
	return (
	<>
		<form className={s.reviewForm}>
			<h2>Помогите нам сделать процесс бронирования лучше</h2>
			<div className={s.categories}>
				{categories.map((category, index) =>
					<ReviewCategory key={`category${index}`} ref={categoriesRef.current[index]} category={category}/>)}
			</div>
			<div className={s.dataInsertion}>
				<InputArea ref={nameRef} type="name" header="*Имя" placeholder="Как вас зовут?"/>
				<textarea ref={commentRef} placeholder="Напишите, что понравилось, что было непонятно"/>
			</div>
			<button className={s.submitButton} type="submit" onClick={handleClick}>Отправить</button>
		</form>
		{ reviews.map((review, index) => <ReviewArea key={`review${index}`} review={review} />) }
	</>
	)
}


export default ReviewForm