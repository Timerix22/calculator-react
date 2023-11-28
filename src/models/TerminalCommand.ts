export class TerminalCommand {
    inputLine: string
    outputLines: string[]
    
    constructor(input: string, output: string[]){
        this.inputLine = input
        this.outputLines = output
    }
}
