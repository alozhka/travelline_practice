import s from './ReviewForm.module.css'
import ReviewCategory from '../ReviewCategory/ReviewCategory.tsx'
import InputArea from '../../InputArea/InputArea.tsx'
import React, { createRef, RefObject, useRef } from 'react'
import { submitData } from './ReviewForm.actions.ts'

const ReviewForm = () => {
	const categories: string[] = ['Чистенько', 'Сервис', 'Скорость', 'Место ', 'Культура речи']
	const categoriesRef = useRef<RefObject<HTMLInputElement>[]>(
		Array.from({length: categories.length}, 
			() => createRef<HTMLInputElement>())
	)
	const commentRef = useRef<HTMLTextAreaElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (nameRef.current === null || nameRef.current.value.trim() === '') {
			alert('Обязательно введите имя')
			return
		}
		const categoriesGrades = categoriesRef.current.map(ref => ref.current?.valueAsNumber)
		submitData(nameRef.current.value, commentRef.current ? commentRef.current.value : '', categoriesGrades)
	}
	
	return (
		<form className={s.reviewForm}>
			<h2>Помогите нам сделать процесс бронирования лучше</h2>
			<div className={s.categories}>
				{ categories.map((category, index) =>
					<ReviewCategory key={'category' + index} ref={categoriesRef.current[index]} category={category}/>) }
			</div>
			<div className={s.dataInsertion}>
				<InputArea ref={nameRef} type='name' header='*Имя' placeholder='Как вас зовут?' />
				<textarea ref={commentRef} placeholder='Напишите, что понравилось, что было непонятно' />
			</div>
			<button className={s.submitButton} type='submit' onClick={handleClick}>Отправить</button>
		</form>
	)
}


export default ReviewForm