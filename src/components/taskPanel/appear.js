import React from 'react'

export default class Appear extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="relation-item" onClick={this.props.onClick}>
                <div className="relation-divider">Appear</div>
                <div className="appear-ctrl relation-rect-container">
                    <div className="left-dashed-circle"></div>
                    <div
                        className="right-solid-circle"
                        style={{
                            background: this.props.appearOptions.color,
                            borderStyle: this.props.appearOptions.visible
                        }}
                    ></div>
                </div>
            </div>
        )
    }
}
