import React from 'react';
import css from 'next/css';

import Matrix from './matrix';
import Radio from './radio';

import { isOn } from './utils/binary';
import { formatJS, formatCPP } from './utils/code_format';


const smile = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10100101,
    0b10011001,
    0b01000010,
    0b00111100
];


const animation = [
    smile
];

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            animation,
            currentIndex: 0,
            language: "js"
        };

    }
    newFrame() {
        const animation = this.state.animation;
        const lastFrame = animation[animation.length - 1];
        const newFrame = lastFrame.map(line => line);

        animation.push(newFrame);

        this.setState({
            animation,
            currentIndex: animation.length - 1
        });
    }
    deleteFrame() {
        if (animation.length > 1) {
            const animation = this.state.animation;
            const currentIndex = this.state.currentIndex;
            let newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = 0;
            }
            animation.splice(currentIndex, 1);
            this.setState({
                animation,
                currentIndex: newIndex
            });
        }
    }
    previousFrame() {
        const currentIndex = this.state.currentIndex;
        let newCurrentIndex = currentIndex - 1;
        if (currentIndex === 0) {
            newCurrentIndex = this.state.animation.length - 1;
        }
        this.setState({
            currentIndex: newCurrentIndex
        });
    }
    nextFrame() {
        const currentIndex = this.state.currentIndex;
        let newCurrentIndex = currentIndex + 1;
        if (newCurrentIndex === this.state.animation.length) {
            newCurrentIndex = 0;
        }
        this.setState({
            currentIndex: newCurrentIndex
        });
    }
    render() {
        return <div>
            <nav>
                <div>
                    <button onClick={this.previousFrame.bind(this)}>Prev</button>
                    <span>{this.state.currentIndex + 1}/{this.state.animation.length}</span>
                    <button onClick={this.nextFrame.bind(this)}>Next</button>
                </div>
            </nav>
            <Matrix bitmap={this.state.animation[this.state.currentIndex]} pixelClick={this.flip.bind(this)} />
            <div>
                <button onClick={this.newFrame.bind(this)}>New Frame</button>
                <button onClick={this.deleteFrame.bind(this)}>Delete Frame</button>
            </div>

            <Radio value="js" checkedValue={this.state.language} name="language" onChange={this.changeLanguage.bind(this)} />
            <Radio value="cpp" checkedValue={this.state.language} name="language" onChange={this.changeLanguage.bind(this)} />

            <pre className={codeStyle}>
                {this.formattedCode()}
            </pre>
        </div>;
    }
    formattedCode() {
        let codeOutput;
        switch (this.state.language) {
            case "js":
                codeOutput = formatJS(this.state.animation);
                break;
            default:
                codeOutput = formatCPP(this.state.animation)
                break;
        }
        return codeOutput;
    }
    flip(x, y) {
        const bitmap = this.state.animation[this.state.currentIndex];
        const rowValue = bitmap[y];
        const isPixelLit = isOn(x, rowValue);
        let newRowValue;
        if (isPixelLit) {
            newRowValue = rowValue & ~(1 << x);
        } else {
            newRowValue = rowValue | 1 << x;
        }
        bitmap[y] = newRowValue;
        this.setState({ animation });
    }
    changeLanguage(e) {
        const language = e.target.value;
        this.setState({ language });
    }
}

const codeStyle = css({
    clear: "both",
    fontFamily: "Consolas",
    fontSize: "1em"
});