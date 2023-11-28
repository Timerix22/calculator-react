import { TerminalCommand } from "./TerminalCommand"

export class TerminalHistory {
    commands: TerminalCommand[]
    
    constructor(commands: TerminalCommand[]){
        this.commands = commands
    }
}
