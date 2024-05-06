import {Command} from "commander";
import {handleHtmlParse} from "./actions";

const program = new Command();

program.command('html-resources')
    .argument('<fileName>', 'a file name to parse')
    .action(handleHtmlParse)


program.parse()