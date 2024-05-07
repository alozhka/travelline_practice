import {Command} from "commander";
import { handleHtmlParse, handleJsonDifference } from './actions'

const program = new Command();

program.command('html-resources')
    .argument('<fileName>', 'a file name to parse')
    .action(handleHtmlParse)

program.command('json-diff')
	.argument('<firstJsonFileName>', 'old json file')
	.argument('<secondJsonFileName>', 'new json file')
	.action(handleJsonDifference)


program.parse()