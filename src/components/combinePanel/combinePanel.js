import React, { useState, useEffect } from 'react'
import './combinePanel.css'
import TimePanel from '../timePanel/timePanel.js'
import TaskPanel from '../taskPanel/taskPanel.js'
import GraphPanel from '../graphPanel/graphPanel.js'
import PreviewItem from '../previewItem/previewItem.js'
import ReactJson from 'react-json-view'
import { DNET_SAMPLE_HEIGHT, REACT_JSON_OPTIONS } from '../../util/const'

import deleteSvg from '../../assets/delete.svg'
import checkSvg from '../../assets/check.svg'
import * as exampleData from '../../data/import/test2.json'
import { connect } from 'react-redux'
import { update } from '../../redux/config.redux.js'

export default function CombinePanel(props) {
    return (
        <div className="combine-panel-box">
            <div className="sub-title">
                &nbsp;CombinePanel
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-save"></use>
                </svg>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-set"></use>
                </svg>
            </div>
            <div
                className="cbpl-content-container simple_scrollbar"
            >
                <div>
                    <GraphPanel/>
                    <TaskPanel/>
                </div>
                <TimePanel/>
            </div>
        </div>
    )
}
