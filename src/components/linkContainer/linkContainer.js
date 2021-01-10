import React from 'react'
import LineLinkContainer from '../lineLinkContainer/lineLinkContainer.js'
import ArcLinkContainer from '../arcLinkContainer/arcLinkContainer.js'

export default function LinkContainer(props) {
    const status = Object.keys(props.style)
    if (props.style[status[0]].shape == 'curve') {
    return <ArcLinkContainer {...props} />
    } else {
    return <LineLinkContainer {...props} />
    }
}
