import React from 'react'
import { TerminalCommand } from '../models/TerminalCommand'
import TerminalInputView from './TerminalInputDisplay'

function TerminalCommandDisplay(props: { commandData: TerminalCommand }) {
    return (
        <div>
            <TerminalInputView>{props.commandData.inputLine}</TerminalInputView>
            {
                props.commandData.outputLines.map(line => (
                    <pre className='terminal-output'>{line}</pre>
                ))
            }
        </div>
    )
}

export default TerminalCommandDisplay
