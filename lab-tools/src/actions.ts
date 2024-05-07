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
type Nodes = Record<string, NodeStatus>

const handleJsonDifference = (firstJsonFileName: string, secondJsonFileName: string): void => {
	try {
		let firstJson: JsonParseData = JSON.parse(fs.readFileSync(firstJsonFileName, { encoding: 'utf8' }))
		let secondJson: JsonParseData = JSON.parse(fs.readFileSync(secondJsonFileName, { encoding: 'utf8' }))

		const jsonDiff: Nodes = {}
		for (const key in firstJson) {
			if (firstJson[key] === secondJson[key])
				jsonDiff[key] = 'unchanged'

			if (firstJson[key] !== secondJson[key])
				jsonDiff[key] = 'changed'

			if (!(key in secondJson))
				jsonDiff[key] = 'deleted'
		}

		for (const key in secondJson) {
			if (!(key in jsonDiff))
				jsonDiff[key] = 'new'
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