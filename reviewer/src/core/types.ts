type Review = {
	name: string,
	comment: string | null,
	grade: Grade
}

type Grade = {
	value: number,
	max: number
}

type Reviews = Review[]

export type { Review, Reviews }