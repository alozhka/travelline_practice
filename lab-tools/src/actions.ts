import * as fs from 'node:fs'
import parse, { HTMLElement } from 'node-html-parser'

const handleHtmlParse = (fileName: string): void => {
	try {
		const document: string = fs.readFileSync(fileName, {encoding: 'utf8'})
		const nodes = parse(document).querySelectorAll("[href],[src]")
		const hrefsSet = new Set()
		
		for(const node of nodes) {
			hrefsSet.add(node.attributes.href)
			hrefsSet.add(node.attributes.src)
		}
		hrefsSet.delete(undefined)
		
		console.log(Array.from(hrefsSet))
	} catch (e) {
		if (typeof e === 'object' && e !== null && 'message' in e) {
			console.error(e.message)
		} else {
			console.error("An error happened")
		}
	}
}



export { handleHtmlParse }