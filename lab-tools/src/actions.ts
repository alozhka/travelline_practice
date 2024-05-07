import * as fs from 'node:fs'
import parse, { HTMLElement } from 'node-html-parser'

const handleHtmlParse = (fileName: string): void => {
	try {
		const rawDocument: string = fs.readFileSync(fileName, { encoding: 'utf8' })
		const nodes: HTMLElement[] = parse(rawDocument).querySelectorAll('[href],[src]')
		const hrefsSet = new Set()

		for (const node of nodes) {
			hrefsSet.add(node.attributes.href)
			hrefsSet.add(node.attributes.src)
		}
		hrefsSet.delete(undefined)

		console.log(Array.from(hrefsSet))
	} catch (e: unknown) {
		handleError(e)
	}
}

type JsonParseData = Record<string, string>
type NodeStatus = 'unchanged' | 'changed' | 'new' | 'deleted'
type NodeType = {
	type: NodeStatus,
	oldValue?: any,
	newValue?: any
}
type Nodes = Record<string, NodeType>

const handleJsonDifference = (firstJsonFileName: string, secondJsonFileName: string): void => {
	try {
		let firstJson: JsonParseData = JSON.parse(fs.readFileSync(firstJsonFileName, { encoding: 'utf8' }))
		let secondJson: JsonParseData = JSON.parse(fs.readFileSync(secondJsonFileName, { encoding: 'utf8' }))

		const jsonDiff: Nodes = {}
		for (const key in firstJson) {
			const firstValue = firstJson[key]
			const secondValue = secondJson[key]
			if (firstValue === secondValue)
				jsonDiff[key] = {
					type: 'unchanged',
					oldValue: firstValue,
					newValue: secondValue
				}

			if (firstJson[key] !== secondJson[key])
				jsonDiff[key] = {
					type: 'changed',
					oldValue: firstValue,
					newValue: secondValue
				}

			if (!(key in secondJson))
				jsonDiff[key] = {
					type: 'deleted',
					oldValue: firstValue
				}
		}

		for (const key in secondJson) {
			if (!(key in jsonDiff))
				jsonDiff[key] = {
					type: 'new',
					newValue: secondJson[key]
				}
		}

		console.log(jsonDiff)
	} catch (e: unknown) {
		handleError(e)
	}
}


const handleError = (e: unknown): void => {
	if (typeof e === 'object' && e !== null && 'message' in e) {
		console.error(e.message)
	} else {
		console.error('An error happened')
	}
}

export { handleHtmlParse, handleJsonDifference }