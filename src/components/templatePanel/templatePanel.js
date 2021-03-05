import React, { useState, useEffect } from 'react'
import './templatePanel.css'
import PreviewItem from '../previewItem/previewItem.js'
import ReactJson from "react-json-view"
import FileSaver from "file-saver"
import { DNET_SAMPLE_WIDTH, DNET_SAMPLE_HEIGHT, REACT_JSON_OPTIONS } from '../../util/const'
import { getStorageKeyArr } from '../../util/template'
import deleteSvg from '../../assets/delete.svg'
import checkSvg from '../../assets/check.svg'
import { defaultTemplates } from '../../data/template.js'
import * as testData from '../../data/import/test1.json'

export default function TemplatePanel(props) {
    const [localStorage, setLocalStorage] = useState(window.localStorage)
    const [storageLength, setStorageLength] = useState(0)
    const [storageKeyArr, setStorageKeyArr] = useState(getStorageKeyArr(localStorage))
    
    useEffect(()=>{
        // 初始化，判断该电脑的localStorage是否加载过默认的模板，没有先加载
        if (localStorage.lastIndex === undefined) {
            // 没有加载过模板
            localStorage.lastIndex = 0
            for(let i =defaultTemplates.length-1;i>0;i--){
                const item = defaultTemplates[i]
                const lastIndex = localStorage.lastIndex
                const key = `DnetG-${lastIndex}`
                const content = JSON.stringify({
                    config: item.template,
                    name: item.name,
                    index: lastIndex
                })
                localStorage.setItem(key, content)
                localStorage.lastIndex = 1+ Number(lastIndex)
            }
            setStorageLength(localStorage.length)
        }
    }, [])

    useEffect(()=>{
        setStorageKeyArr(getStorageKeyArr(localStorage))
    }, [storageLength])
   
    function handleTemplateAdd() {
        if (localStorage.lastIndex === undefined) {
            // 初始化
            localStorage.lastIndex = 0
        }
        if (!localStorage) {
            alert('浏览器支持localstorage')
            return false
        } else {
            //写入当前config
            const lastIndex = localStorage.lastIndex
            const key = `DnetG-${lastIndex}`
            const content = JSON.stringify({
                config: props.config,
                name: `template-${lastIndex}`,
                index: lastIndex
            })
            localStorage.setItem(key, content)
            localStorage.lastIndex = 1+ Number(lastIndex)
            setStorageLength(localStorage.length)
        }
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
    
    function handleTemplateCheck(v){
        const vContent = JSON.parse(localStorage.getItem(v))
        if(vContent&&vContent.config){
            props.onSubmit(vContent.config)
        }
    }
   
    function handleTemplateRemove(storeKey){
      localStorage.removeItem(storeKey)
      setStorageLength(localStorage.length)
    }
    
    return (
        <div
            style={{
                width: `${props.width ? props.width : 1035}px`,
                height: `${props.height ? props.height : 480}px`
            }}
            className="template-panel-box"
        >
            <div className="sub-title">
                &nbsp;Template
                <svg className="icon" onClick={handleTemplateAdd} aria-hidden="true">
                    <use xlinkHref="#icon-add"></use>
                </svg>
                <svg className="icon" onClick={handleTemplateSave} aria-hidden="true">
                    <use xlinkHref="#icon-download"></use>
                </svg>
            </div>
            <div className="template-content-box">
                <div className="template-grammar-container">
                    <div className="template-grammar-title">grammar</div>
                    <div className="template-grammar-wrap simple_scrollbar">
                        <ReactJson
                            className="json-box"
                            {...REACT_JSON_OPTIONS}
                            src={props.config}
                        />
                    </div>
                </div>
                <div className="template-sample-container simple_scrollbar">
                    {/* <div>template-sample-container</div> */}
                    {storageKeyArr.map((v, i) => {
                        // const localStorage = window.localStorage
                        const vContent = JSON.parse(localStorage.getItem(v))
                        if(!vContent){
                            return null
                        }
                        return (
                            <div 
                              className="sample-item-wrap"
                              key={`sample-${v}`}
                            >
                                <div 
                                  className="sample-item-name"
                                >{vContent.name}</div>
                                <div
                                    className="sample-item-chart"
                                    style={{
                                        // width: DNET_SAMPLE_WIDTH,
                                        height: DNET_SAMPLE_HEIGHT
                                    }}
                                >
                                    <PreviewItem data={props.data ? props.data : testData.graphs} config={vContent.config} />
                                </div>
                                <div
                                    className="sample-item-icon"
                                >  
                                  <div className="item-image-wrap">
                                    <img 
                                        className="sample-item-svg" 
                                        src={checkSvg}
                                        onClick = {()=>handleTemplateCheck(v)}
                                    />
                                  </div>
                                  <div className="item-image-wrap">
                                    <img 
                                      className="sample-item-svg" 
                                      src={deleteSvg}
                                      onClick = {()=>handleTemplateRemove(v)}
                                    />
                                  </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
