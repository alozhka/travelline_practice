const submitData = (name: string, comment: string, grades: number[]): void => {
	alert(`${name} ${comment} ${grades.reduce((average, current) => average + current, 0) / grades.length} Grades`)
}


export { submitData }