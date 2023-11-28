import React from 'react'

function ColoredSpan(props: { color: string, children: React.ReactNode }){
    return <span style={{color: props.color}}>{props.children}</span>
}

export default ColoredSpan
