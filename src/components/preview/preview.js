import React, { useState } from 'react'
import { connect } from "react-redux"
import PreviewItem from '../previewItem/previewItem.js'

function Preview(props) {
    // 要计算
    return (
        <div
            style={{
                width: `${props.width ? props.width : 1030}px`,
                height: `${props.height ? props.height : 538}px`,
            }}
            className="preview-box"
        >
            <div className="sub-title">
                &nbsp;Preview
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-play"></use>
                </svg>
            </div>
            <div
                className = "simple_scrollbar"
                style={{
                    width: '100%',
                    height: '508px',
                    overflowX: 'auto',
                    overflowY:'auto'
                }}
            >
                <PreviewItem
                    data= {props.data}
                    config = {props.config}
                />
            </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
	data: state.graphData,
    config: state.config
})

const mapDispatchToProps = {
} 
export default connect(mapStateToProps,mapDispatchToProps)(Preview)
