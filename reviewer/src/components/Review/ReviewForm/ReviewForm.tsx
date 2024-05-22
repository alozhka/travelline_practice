import s from './ReviewForm.module.css'
import ReviewCategory from '../ReviewCategory/ReviewCategory.tsx'
import InputArea from '../../InputArea/InputArea.tsx'
import React, { useRef } from 'react'
import { onSubmit } from './ReviewForm.actions.ts'

const ReviewForm = () => {
	const categories: string[] = ['Чистенько', 'Сервис', 'Скорость', 'Место ', 'Культура речи']
	const ref = useRef<HTMLTextAreaElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (nameRef.current === null || nameRef.current.value.trim() === '') {
			alert('Обязательно введите имя')
			return
		}
		onSubmit(nameRef.current.value, ref.current ? ref.current.value : null)
	}
	
	return (
		<form className={s.reviewForm}>
			<h2>Помогите нам сделать процесс бронирования лучше</h2>
			<div className={s.categories}>
				{ categories.map((category, index) =>
					<ReviewCategory key={'category' + index} category={category}/>) }
			</div>
			<div className={s.dataInsertion}>
				<InputArea ref={nameRef} type='name' header='*Имя' placeholder='Как вас зовут?' />
				<textarea ref={ref} placeholder='Напишите, что понравилось, что было непонятно' />
			</div>
			<button className={s.submitButton} type='submit' onClick={handleClick}>Отправить</button>
		</form>
	)
}


export default ReviewForm