import React from 'react';
import css from 'next/css';
import Head from 'next/head';

import Matrix from './matrix';
import Radio from './radio';

import { isOn } from './utils/binary';
import { formatJS, formatCPP } from './utils/code_format';

import FontAwesome from 'react-fontawesome';


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
            language: "js",
            mousedown: false,
            initialPixelState: true,
            currentPreviewFrame: animation[0],
            currentPreviewFrameIndex: 0
        };
    }
    componentDidMount() {
        this.previewAnimation = this.startAnimationAtInterval(200);
    }
    componentWillUnmount() {
        clearInterval(this.previewAnimation);
    }
    startAnimationAtInterval(interval) {
        return setInterval(() => {
            let index = this.state.currentPreviewFrameIndex;


            while (!this.state.animation[index]) {
                index--;
            }

            const animationFrame = this.state.animation[index];

            this.setState({
                currentPreviewFrame: animationFrame
            });

            let newIndex = index + 1;
            if (newIndex === this.state.animation.length) {
                newIndex = 0;
            }

            this.setState({
                currentPreviewFrameIndex: newIndex
            });

        }, interval);
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
        return <div className="container" onMouseUp={this.mouseEvent.bind(this)}>
            <Head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
            </Head>
            <section className="col-md-6">
                <h2><FontAwesome name="pencil-square-o" /> Editor</h2>
                <nav>
                    <div>
                        <button onClick={this.previousFrame.bind(this)} className="btn btn-default col-md-3"><FontAwesome name='step-backward' /> Prev</button>
                        <p className="col-md-6 text-center">{this.state.currentIndex + 1}/{this.state.animation.length}</p>
                        <button onClick={this.nextFrame.bind(this)} className="btn btn-default col-md-3">Next <FontAwesome name='step-forward' /> </button>
                    </div>
                </nav>
                <Matrix bitmap={this.state.animation[this.state.currentIndex]} mouseHandler={this.mouseEvent.bind(this)} />
                <div className={clearStyle}>
                    <button onClick={this.newFrame.bind(this)} className="btn btn-default col-md-4"><FontAwesome name="plus" /> New Frame</button>
                    <button onClick={this.deleteFrame.bind(this)} className="btn btn-default col-md-4  col-md-offset-4"><FontAwesome name="minus" /> Delete Frame</button>
                </div>
            </section>
            <section className="col-md-6">
                <h2><FontAwesome name="play" /> Preview</h2>
                <Matrix bitmap={this.state.currentPreviewFrame} />
            </section>
            <div className="col-md-12">
            <h2 className={clearStyle}><FontAwesome name="code" /> Code</h2>
            <p>Select a language for output:</p>
            <Radio value="js" checkedValue={this.state.language} name="language" onChange={this.changeLanguage.bind(this)} />
            <Radio value="cpp" checkedValue={this.state.language} name="language" onChange={this.changeLanguage.bind(this)} />

            <pre className={codeStyle}>
                {this.formattedCode()}
            </pre>
            </div>
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
        const bitmap = this.currentBitmap;
        const rowValue = bitmap[y];
        const isPixelLit = isOn(x, rowValue);
        this.draw(x, y, !isPixelLit);
    }
    changeLanguage(e) {
        const language = e.target.value;
        this.setState({ language });
    }
    mouseEvent(event, x, y) {
        event.stopPropagation();
        if (event.type === "mousedown") {
            const bitmap = this.currentBitmap;
            const rowValue = bitmap[y];
            const isPixelLit = isOn(x, rowValue);
            this.flip(x, y);
            this.setState({
                mousedown: true,
                initialPixelState: isPixelLit
            })
        } else if (event.type === "mouseup") {
            this.setState({
                mousedown: false
            })
        } else if (this.state.mousedown && event.type === "mousemove") {
            this.draw(x, y, !this.state.initialPixelState);
        }
    }
    draw(x, y, on) {
        const bitmap = this.currentBitmap;
        const rowValue = bitmap[y];
        let newRowValue;
        if (on) {
            newRowValue = rowValue | 1 << x;
        } else {
            newRowValue = rowValue & ~(1 << x);
        }
        bitmap[y] = newRowValue;
        this.setState({ animation });
    }

    get currentBitmap() {
        return this.state.animation[this.state.currentIndex];
    }
}

const codeStyle = css({
    clear: "both",
    fontFamily: "Consolas",
    fontSize: "1em"
});

const clearStyle = css({
    clear: "both"
});