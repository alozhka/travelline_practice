import fs from 'node:fs'
import parse, { HTMLElement } from 'node-html-parser'

const parseHtml = (fileName: string): Set<string> => {
	const rawDocument: string = fs.readFileSync(fileName, { encoding: 'utf8' })
	const nodes: HTMLElement[] = parse(rawDocument).querySelectorAll('[href],[src]')
	return new Set(nodes.map(node => node.attributes.href || node.attributes.src))
}


export default parseHtml
