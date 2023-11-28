import React from 'react'
import { TerminalHistory } from '../models/TerminalHistory'
import TerminalCommandDisplay from './TerminalCommandDisplay'

type TerminalHistoryProps = {
    history: TerminalHistory
}

function TerminalHistoryDisplay(props: TerminalHistoryProps) {
    return (
        <div>
            {
                props.history.commands.map(c=> (
                    <TerminalCommandDisplay commandData={c}/>
                ))
            }
        </div>
    )
}

export default TerminalHistoryDisplay
