import React from "react"
import ReactJson from "react-json-view"
import { Upload } from "antd"
import FileSaver from "file-saver"

export default class Grammar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: "",
            jsonData: {},
            jsonOptions: {
                displayDataTypes: false,
                name: null,
                indentWidth: 2,
                collapseStringsAfterLength: 20,
 //               iconStyle: "circle",
                enableClipboard: false,
                displayObjectSize: false
            },
        }
    }
    componentDidMount() {}

    Export = () => {
        let content = JSON.stringify(this.state.jsonData)
        let type = "data:application/json;charset=utf-8"
        let blob = new Blob([content], { type: type })

        let isFileSaverSupported = false
        try {
            isFileSaverSupported = !!new Blob()
        } catch (e) {
            console.log(e)
        }

        if (isFileSaverSupported) {
            FileSaver.saveAs(blob, this.state.filename)
        } else {
            FileSaver.open(encodeURI(type + "," + content))
        }
    }
    render() {
        const { fileList } = this.state
        const props = {
            name: "UploadFile", //name得看接口需求，name与接口需要的name一致
            showUploadList: false,
            data: {}, //接口需要的参数，无参数可以不写
            beforeUpload: (file) => {
                console.log(file)
                const reader = new FileReader()
                reader.readAsText(file)
                reader.onload = () => {
                    let myData = reader.result
                    let myJson = JSON.parse(myData)
                    
                    this.setState((state) => ({
                        fileList: [file],
                        jsonData: myJson,
                        filename: file.name,
                    }))
                    if (this.props.onSubmit) {
                        const { filename, jsonData } = this.state
                        this.props.onSubmit({ filename, jsonData })
                    }
                }
                console.log(file.data)
                return false
            },
        }
        return (
            <div 
                style={{
                    width:`${this.props.width ? this.props.width: 1010}px`,
                    height: `${this.props.height ? this.props.height: 400}px`
                }}
                className="grammar-box">
                <div className="sub-title">
                    &nbsp;Grammar
                    <Upload
                        className="upload-item"
                        {...props}
                        fileList={fileList}
                    >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-add"></use>
                        </svg>
                    </Upload>
                    <svg
                        className="icon"
                        aria-hidden="true"
                    >
                        <use onClick={this.Export} xlinkHref="#icon-download"></use>
                    </svg>
                </div>
                <div className="filename">{this.state.filename}</div>
                <div className="json-text">
                    <ReactJson
                        className="json-box"
                        {...this.state.jsonOptions}
                        src={this.props.options}
                    />
                </div>
            </div>
        )
    }
}
