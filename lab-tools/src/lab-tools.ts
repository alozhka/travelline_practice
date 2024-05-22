import { Command } from 'commander'

import parseHtml from './actions/html-parser'
import findFilesJsonDifference from './actions/json-diff'

const program = new Command()

program.command('html-resources')
	.argument('<fileName>', 'a file name to parse')
	.action((fileName: string) => {
		const result: Set<string> = parseHtml(fileName)
		console.log(Array.from(result))
	})

program.command('json-diff')
	.argument('<firstJsonFileName>', 'old json file')
	.argument('<secondJsonFileName>', 'new json file')
	.action((firstJsonFileName: string, secondJsonFileName: string)=> {
		const result: Record<string, object> = findFilesJsonDifference(firstJsonFileName, secondJsonFileName)
		console.log(JSON.stringify(result, null, 2));
	})


try {
	program.parse()
} catch (e) {
	console.error(e)
}
