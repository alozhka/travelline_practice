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
	oldValue?: unknown
	newValue?: unknown
	children?: Differences
}
type Differences = Record<string, Difference>


const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

function findJsonDifference(oldJson: Record<string, unknown>, newJson: Record<string, unknown>): Differences {
	const keys: string[] = [...Object.keys(oldJson), ...Object.keys(newJson)] 
	
	
	return keys.reduce<Differences>((differences: Differences, key: string) => {
		const oldValue = oldJson[key];
		const newValue = newJson[key]
		
		if (oldValue === undefined) 
			return {
				...differences,
				[key]: {
					type: 'new',
					newValue
				}
			}
		
		if (newValue === undefined) 
			return {
				...differences,
				[key]: {
					type: 'delete',
					oldValue
				}
			}
		
		if (isObject(oldValue) && isObject(newValue)) 
			return {
				...differences,
				[key]: {
					type: JSON.stringify(oldValue) === JSON.stringify(newValue) ? 'unchanged' : 'changed',
					children: findJsonDifference(oldValue, newValue)
				}
			}
		
		return {
			...differences,
			[key]: {
				type: oldValue === newValue ? 'unchanged' : 'changed',
				oldValue,
				newValue
			}
		}
	}, {})
}


export default findFilesJsonDifference
