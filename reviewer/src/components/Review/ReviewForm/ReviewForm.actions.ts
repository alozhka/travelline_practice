import { RefObject } from 'react'
import { Review } from '../../../core/types.ts'

const submitData = (name: string | null, comment: string, grades: number[]): Promise<Review> => {
	if (!name || name.trim() === '')
		return Promise.reject(new Error('Укажите своё имя!'))
	
	const review: Review = {
		name: name,
		comment: comment,
		grade: {
			value: grades.reduce((average: number, current: number) => average + current, 0) / grades.length,
			max: grades.length
		}
	}
	
	return Promise.resolve(review)
	
}


const getValues = (data: RefObject<HTMLInputElement>[]): number[] => {
	const results = data.map(r => r.current?.valueAsNumber)
	if (results.map(r => typeof r).filter(r => r === 'undefined').length)
		return []
	
	return results as number[]
}

export { submitData, getValues }