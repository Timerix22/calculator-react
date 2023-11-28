import React from 'react'
import ColoredSpan from './ColoredSpan'

function TerminalInputView(props: { children: React.ReactNode }) {
    return (
        <div style={{
            whiteSpace: 'nowrap'
        }}>
            <label style={{userSelect: 'none', marginRight: '10px', display: 'inline-block', }}>
                <ColoredSpan color='#fff120'>user</ColoredSpan>
                @
                <ColoredSpan color='#20e6ff'>calculator-react</ColoredSpan>
                {':$'}
            </label>
            <pre className='terminal-input'>{props.children}</pre>
        </div>
    )
}

export default TerminalInputView
