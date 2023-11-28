import React from 'react'
import { useState } from 'react'
import './App.css'
import { TerminalHistory } from './models/TerminalHistory'
import { TerminalCommand } from './models/TerminalCommand'
import TerminalHistoryDisplay from './components/TerminalHistoryDisplay'
import TerminalInputView from './components/TerminalInputDisplay'

const helloMessage: string = 
`   ______             __                      __              __
  /      \\           /  |                    /  |            /  |
 /&&&&&&  |  ______  && |  _______  __    __ && |  ______   _&& |_     ______    ______
 && |  &&/  /      \\ && | /       |/  |  /  |&& | /      \\ / &&   |   /      \\  /      \\
 && |       &&&&&&  |&& |/&&&&&&&/ && |  && |&& | &&&&&&  |&&&&&&/   /&&&&&&  |/&&&&&&  |
 && |   __  /    && |&& |&& |      && |  && |&& | /    && |  && | __ && |  && |&& |  &&/
 && \\__/  |/&&&&&&& |&& |&& \\_____ && \\__&& |&& |/&&&&&&& |  && |/  |&& \\__&& |&& |
 &&    &&/ &&    && |&& |&&       |&&    &&/ && |&&    && |  &&  &&/ &&    &&/ && |
  &&&&&&/   &&&&&&&/ &&/  &&&&&&&/  &&&&&&/  &&/  &&&&&&&/    &&&&/   &&&&&&/  &&/

`

function App() {
    const [history, historySet] = useState<TerminalHistory>(new TerminalHistory([]))
    const [inputId] = useState(crypto.randomUUID())
    const [commandReverseIndex, commandReverseIndexSet] = useState(-1)

    const commandHandlers = new Map<string, ((command: string) => TerminalCommand | undefined)>([
        [ 
            "clear", command=> {
                history.commands = []
                historySet({ ...history })
                return undefined
            } 
        ],
        [
            "info", command=> {
                return new TerminalCommand(command, [ helloMessage ])
            }
        ]
    ])

    function execCommand(command: string) : TerminalCommand | undefined {
        const handler = commandHandlers.get(command)
        if(handler === undefined){
            const rezult = trySolveMathExpr(command)
            return new TerminalCommand(command, [rezult])
        }
        return handler(command)
    }

    return (
        <div className='App'>
            <div className='terminal-container'
                onClick={(e)=> {
                    if(e.target instanceof HTMLElement && e.target.className.includes('terminal-container')){
                        document.getElementById(inputId)?.focus()
                    }
                }
            }>
                <TerminalHistoryDisplay history={history}/>
                <TerminalInputView>
                    <input autoFocus id={inputId} className='terminal-input'
                        style={{width: '80%', marginRight: '20px'}}
                        onKeyDown={(e => {
                            if(e.key === 'Enter'){
                                var commandData = execCommand(e.currentTarget.value)
                                e.currentTarget.value = ''
                                if(commandData !== undefined){
                                    history.commands.push(commandData)
                                    historySet({ ...history })
                                }
                                commandReverseIndexSet(-1)
                                e.preventDefault();
                            }
                            else if(e.key === 'ArrowUp'){
                                e.preventDefault();
                                console.log(commandReverseIndex)
                                const index = commandReverseIndex+1
                                if(index > history.commands.length-1 || index <0)  {
                                    commandReverseIndexSet(Math.max(index-1, 0))
                                    return
                                }
                                commandReverseIndexSet(index)
                                const prevCommand = history.commands[history.commands.length-1-index]
                                e.currentTarget.value = prevCommand.inputLine
                            }
                            else if(e.key === 'ArrowDown'){
                                e.preventDefault();
                                console.log(commandReverseIndex)
                                const index = commandReverseIndex-1
                                if(index > history.commands.length-1 || index <0)  {
                                    commandReverseIndexSet(Math.max(index+1, 0))
                                    return
                                }
                                commandReverseIndexSet(index)
                                const prevCommand = history.commands[history.commands.length-1-index]
                                e.currentTarget.value = prevCommand.inputLine
                            }
                        }
                    )}/>
                </TerminalInputView>
            </div>
        </div>
    )
}

export default App

function trySolveMathExpr(command: string): string {
    try {
        const n = eval(command)
        return n?.toString() ?? 'undefined'
    }
    catch(err){
        if(err instanceof Error)
            return `${err.name}: ${err.message}`
        else return JSON.stringify(err, Object.getOwnPropertyNames(err))
    }
}
