import fs from 'node:fs'
import parse, { HTMLElement } from 'node-html-parser'

const parseHtml = (fileName: string): string[] => {
		const rawDocument: string = fs.readFileSync(fileName, { encoding: 'utf8' })
		const nodes: HTMLElement[] = parse(rawDocument).querySelectorAll('[href],[src]')
		const hrefsSet: Set<string> = new Set()

		for (const node of nodes) {
			hrefsSet.add(node.attributes.href)
			hrefsSet.add(node.attributes.src)
		}

		return Array.from(hrefsSet)
}
export default parseHtml