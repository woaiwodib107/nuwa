import React from 'react'
import AppearEncoding from './appearEncoding'
import StableEncoding from './stableEncoding'
import DisappearEncoding from './disappearEncoding'

var appearOptions = {
    visible: '',
    position: '',
    color: '#FFFFFF',
    animation: '',
    link: '',
    glyph: ''
}
var stableOptions = {
    visible: '',
    position: '',
    color: '#FFFFFF',
    animation: '',
    link: '',
    glyph: ''
}
var disappearOptions = {
    visible: '',
    position: '',
    color: '#FFFFFF',
    animation: '',
    link: '',
    glyph: ''
}

export default class Encoding extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmitAppearOptions = (options) => {
        if (!options) return
        appearOptions = options
        console.log('appear options', appearOptions)
        if (this.props.onSubmit) {
            this.props.onSubmit({ appearOptions, stableOptions, disappearOptions })
        }
    }
    handleSubmitStableOptions = (options) => {
        if (!options) return
        stableOptions = options
        console.log('stable options', stableOptions)
        if (this.props.onSubmit) {
            this.props.onSubmit({ appearOptions, stableOptions, disappearOptions })
        }
    }
    handleSubmitDisappearOptions = (options) => {
        if (!options) return
        disappearOptions = options
        console.log('appear options', disappearOptions)
        if (this.props.onSubmit) {
            this.props.onSubmit({ appearOptions, stableOptions, disappearOptions })
        }
    }
    render() {
        if (this.props.relationType === 'appear') {
            return (
                <AppearEncoding options={appearOptions} onSubmit={this.handleSubmitAppearOptions} />
            )
        }

        if (this.props.relationType === 'stable') {
            return (
                <StableEncoding options={stableOptions} onSubmit={this.handleSubmitStableOptions} />
            )
        }

        if (this.props.relationType === 'disappear') {
            return (
                <DisappearEncoding
                    options={disappearOptions}
                    onSubmit={this.handleSubmitDisappearOptions}
                />
            )
        }
    }
}
