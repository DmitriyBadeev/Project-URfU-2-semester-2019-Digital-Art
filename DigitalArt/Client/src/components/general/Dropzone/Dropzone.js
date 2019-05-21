import React, { Component } from 'react'
import './dropzone.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = { hightlight: false };
        this.fileInputRef = React.createRef();

        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFilesAdded(evt) {
        if (this.props.disabled) return;
        const file = evt.target.files[0];
        if (this.props.onFileAdded) {
            this.props.onFileAdded(file);
        }
    }

    onDragOver(evt) {
        evt.preventDefault();

        if (this.props.disabled) return;

        this.setState({ hightlight: true })
    }

    onDragLeave() {
        this.setState({ hightlight: false })
    }

    onDrop(event) {
        event.preventDefault();

        if (this.props.disabled) return;

        const file = event.dataTransfer.files[0];
        if (this.props.onFileAdded) {
            this.props.onFileAdded(file)
        }
        this.setState({ hightlight: false })
    }

    render() {
        return (
            <div
                className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
            >
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    multiple
                    onChange={this.onFilesAdded}
                />

                <span className="Dropzone__span">
                    <FontAwesomeIcon icon="file-download" className="Dropzone__icon"/>
                    <br/> Нажмите, чтобы выбрать файл или перетащите его в эту область
                </span>
            </div>
        )
    }
}