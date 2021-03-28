import React, { useState } from 'react'
import { Radio } from 'antd'
import SampleItem from '../sampleItem/sampleItem.js'
import { ROW_BUTTON_STYLE } from '../../util/const.js'


export default function NodeLinkSample(props) {
    const { nodeStyle, linkStyle,  chooseItem} = props
    const handleIconsClick = (value) => {
      props.onSubmit(value)
    }
    
    return (
        <div className="node-link-sample">
            <div onClick={() => handleIconsClick('Node')} className="second-line-left">
                <Radio.Group value={chooseItem}>
                    <Radio.Button style={ROW_BUTTON_STYLE} value="Node" type>
                        Node
                    </Radio.Button>
                </Radio.Group>
            </div>
            <div
                onClick={() => handleIconsClick('Node')}
                className={`bp-line-icon-container ${
                    chooseItem === 'Node' ? 'choose-icon' : ''
                }`}
            >
                <SampleItem config={nodeStyle} />
            </div>
            <div onClick={() => handleIconsClick('Link')} className="second-line-left">
                <Radio.Group value={chooseItem}>
                    <Radio.Button style={ROW_BUTTON_STYLE} value="Link">
                        Link
                    </Radio.Button>
                </Radio.Group>
            </div>
            <div
                onClick={() => handleIconsClick('Link')}
                className={`bp-line-icon-container ${
                    chooseItem === 'Link' ? 'choose-icon' : ''
                }`}
            >
                <SampleItem config={linkStyle} type={'link'} />
            </div>
        </div>
    )
}
