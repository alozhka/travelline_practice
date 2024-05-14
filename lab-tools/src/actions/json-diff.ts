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

//TODO: переписать с any на unknown
function findJsonDifference(oldJson: any, newJson: any): Record<string, Difference> {
	const differences: Record<string, Difference> = {}

	if (typeof oldJson !== 'object' || typeof newJson !== 'object') {
		throw new Error('Invalid JSON')
	}

	for (const key in oldJson) {
		if (oldJson.hasOwnProperty(key)) {
			if (!newJson.hasOwnProperty(key)) {
				differences[key] = {
					type: 'delete',
					oldValue: oldJson[key]
				}
			} else if (areObjects(oldJson[key], newJson[key])) {
				differences[key] = findObjectDifference(oldJson[key], newJson[key])
				// единый тип, либо разный
			} else if (oldJson[key] !== newJson[key]) {
				differences[key] = {
					type: 'changed',
					oldValue: oldJson[key],
					newValue: newJson[key]
				}
				// единый тип 
			} else {
				differences[key] = {
					type: 'unchanged',
					oldValue: oldJson[key],
					newValue: newJson[key]
				}
			}
		}
	}

	for (const key in newJson) {
		if (newJson.hasOwnProperty(key) && !oldJson.hasOwnProperty(key)) {
			differences[key] = {
				type: 'new',
				newValue: newJson[key]
			}
		}
	}
	return differences
}

const everyHasArray = (...objects: object[]): boolean => {
	for (const object of objects) {
		if (!Array.isArray(Object.values(object)[0])) {
			return false
		}
	}
	
	return true
}

const areObjects = (...list: any[]): boolean => {
	for (const el of list) {
		if (typeof el !== 'object') {
			return false
		}
	}
	
	return true;
}

const areSimpleObjects = (...objects: object[]): boolean => {
	for (const obj of objects) {
		if (Object.keys(obj).length !== 1) return false
	}
	return true
}


//TODO: дописать
const findObjectDifference = (oldObj: Record<string, unknown>,  newObj: Record<string, unknown>): Difference => {
	let diff: Difference;
	
	// если простые объекты или простые массивы
	if (areSimpleObjects(oldObj, newObj)) {
		// если оба - массивы
		if (everyHasArray(oldObj, newObj)) {
			diff = findArrayDifference(oldObj as Record<string, unknown[]>,  newObj as Record<string, unknown[]>)
		} else {
			// либо оба - простые объекты, либо один из них - массив
			diff = {
				type: oldObj === newObj ? 'unchanged' : 'changed',
				oldValue: oldObj,
				newValue: newObj
			}
		}
	}
	// если сложный объект
	else {
		diff = {
			type: JSON.stringify(oldObj) === JSON.stringify(newObj) ? 'unchanged' : 'changed',
			children: findJsonDifference(oldObj, newObj)
		}
	}
	
	return diff
}


const findArrayDifference = (firstObj: Record<string, unknown[]>, secondObj: Record<string, unknown[]>): Difference => {
	const diff: ArrayDifference = {
		type: 'unchanged',
		children: {}
	}
	const first: unknown[] = Object.values(firstObj)[0]
	const second: unknown[] = Object.values(secondObj)[0]
	
	
	const maxLength = Math.max(first.length, second.length)
	for (let i = 0; i < maxLength; i++) {
		const oldVal = first[i]
		const newVal = second[i]
		
		let type: DifferenceType;
		if (oldVal === undefined) {
			diff.children[i.toString()] = {
				type: 'new',
				newValue: newVal
			}
		}
		else if (newVal === undefined) {
			diff.children[i.toString()] = {
				type: 'delete',
				oldValue: oldVal
			}
		}
		else 
			diff.children[i.toString()] = {
				type: oldVal === newVal ? 'unchanged' : 'changed',
				oldValue: oldVal,
				newValue: newVal
			}

		
	}
	
	return diff
}


export default findFilesJsonDifference
