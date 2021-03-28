import React, { useState, useEffect } from 'react'
import ReactJson from 'react-json-view'
import FileSaver from 'file-saver'
import { REACT_JSON_OPTIONS } from '../../util/const'
import { connect } from 'react-redux'
import { update } from '../../redux/config.redux.js'
import * as _ from 'lodash'
import './grammarPanel.css'
import { getSimpleGrammar } from '../../util/dnetChart.js'

function GrammarPanel(props) {
    const [grammarType, setGrammarType] = useState('simple')
    function handleTemplateAdd() {
        console.log('未实现grammar的加载')
    }

    function handleTemplateSave() {
        let content = JSON.stringify(props.config)
        let type = 'data:application/json;charset=utf-8'
        let blob = new Blob([content], { type: type })

        let isFileSaverSupported = false
        try {
            isFileSaverSupported = !!new Blob()
        } catch (e) {
            console.log(e)
        }

        if (isFileSaverSupported) {
            FileSaver.saveAs(blob, 'template.json')
        } else {
            FileSaver.open(encodeURI(type + ',' + content))
        }
    }

    return (
        <div className="grammar-panel-box">
            <div className="sub-title">
                &nbsp;Grammar
                <svg className="icon" onClick={handleTemplateAdd} aria-hidden="true">
                    <use xlinkHref="#icon-add"></use>
                </svg>
                <svg className="icon" onClick={handleTemplateSave} aria-hidden="true">
                    <use xlinkHref="#icon-download"></use>
                </svg>
            </div>
            <div className="gp-header-text">
                <div
                    className={`gp-sub-title ${grammarType === 'simple' ? 'gp-sub-choose' : ''}`}
                    onClick={() => setGrammarType('simple')}
                >
                    Simple
                </div>
                <div className="gp-sub-divide"></div>
                <div
                    className={`gp-sub-title ${grammarType === 'all' ? 'gp-sub-choose' : ''}`}
                    onClick={() => setGrammarType('all')}
                >
                    All
                </div>
            </div>
            <div className="json-text simple_scrollbar">
                <ReactJson
                    theme="summerfruit:inverted"
                    className="json-box"
                    {...REACT_JSON_OPTIONS}
                    src={grammarType === 'simple' ? getSimpleGrammar(props.config) : props.config}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    config: state.config
})

const mapDispatchToProps = {
    update
}

export default connect(mapStateToProps, mapDispatchToProps)(GrammarPanel)
