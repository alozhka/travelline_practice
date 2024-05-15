import fs from 'node:fs'


type JsonParseData = Record<string, unknown>

const findFilesJsonDifference = (firstJsonFileName: string, secondJsonFileName: string): Differences => {
		const firstJson: JsonParseData = JSON.parse(fs.readFileSync(firstJsonFileName, { encoding: 'utf8' }))
		const secondJson: JsonParseData = JSON.parse(fs.readFileSync(secondJsonFileName, { encoding: 'utf8' }))
	
		return findJsonDifference(firstJson, secondJson)
}

type DifferenceType = 'new' | 'delete' | 'unchanged' | 'changed';
type Difference = {
	type: DifferenceType
	newValue?: unknown
	oldValue?: unknown
	children?: Differences
}
type ArrayDifference = {
	type: DifferenceType
	children: Differences
}
type Differences = Record<string, Difference>


const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

function findJsonDifference(oldJson: Record<string, unknown>, newJson: Record<string, unknown>): Record<string, Difference> {
	const differences: Record<string, Difference> = {}
	const keys = [...Object.keys(oldJson), ...Object.keys(newJson)] 
	
	for (const key of keys) {
		const oldValue = oldJson[key]
		const newValue = newJson[key]
		
		if (oldValue === undefined) {
			differences[key] = {
				type: 'new',
				newValue: newValue
			}
		} else if (newValue === undefined) {
			differences[key] = {
				type: 'delete',
				oldValue: oldValue
			}
		} else if (isObject(oldValue) && isObject(newValue)) {
			differences[key] = {
				type: JSON.stringify(oldValue) === JSON.stringify(newValue) ? 'unchanged' : 'changed',
				children: findJsonDifference(oldValue, newValue)
			}
		}
		else {
			differences[key] = {
				type: oldJson[key] === newJson[key] ? 'unchanged' : 'changed',
				oldValue: oldValue,
				newValue: newValue
			}
		}
	}
	
	return differences
}


export default findFilesJsonDifference
