import React from 'react';
import Head from 'next/head';

import Matrix from './matrix';
import TimelineMatrix from './timeline_matrix';

import Panel from './panel';
import Tab from './tab';

import { isOn } from './utils/binary';
import { formatJS, formatCPP } from './utils/code_format';

import FontAwesome from 'react-fontawesome';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/styles';

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

const languages = [
    {
        value: "javascript",
        title: "JavaScript"
    },
    {
        value: "cpp",
        title: "C++"
    }
];

export default class Editor extends React.Component {
    constructor() {
        super();
        this.state = {
            animation,
            currentIndex: 0,
            language: "javascript",
            mousedown: false,
            initialPixelState: true,
            currentPreviewFrame: animation[0],
            currentPreviewFrameIndex: 0,
            intervalTime: 400
        };
    }
    componentDidMount() {
       this.animate();
    }
    componentWillUnmount() {
        
    }
    animate() {
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

        setTimeout(() => this.animate(), this.state.intervalTime);
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
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <h1 className="col-md-12">Animation Tool for HT16K33</h1>
            <div className='col-md-4'>
                <Panel icon="pencil-square-o" title="Editor">
                    <Matrix bitmap={this.state.animation[this.state.currentIndex]} mouseHandler={this.mouseEvent.bind(this)} />
                </Panel>                
            </div>
            <div className='col-md-4'>
                <Panel icon="play" title="Preview">
                   <Matrix bitmap={this.state.currentPreviewFrame} />
                </Panel>
            </div>         
            
            <div className="col-md-4">
                <Panel icon="gear" title="Settings">
                <div className="input-group">
                    <span className="input-group-addon">Interval <FontAwesome name="clock-o" /></span>
                    <input type="text" className="form-control" value={this.state.intervalTime} onChange={event => this.changeInterval(event.target.value)}/>
                </div>
                </Panel>
            </div> 
            <div className="col-md-12">
                <Panel icon="film" title={`Timeline ${this.state.currentIndex + 1}/${this.state.animation.length}`}>
                    <div className="navbar navbar-default">
                        <p className="navbar-text">Frames:</p>
                    <div className="btn-group" role="group" >
                        
                        <button onClick={this.newFrame.bind(this)} className="btn btn-default navbar-btn" title="Add new frame"><FontAwesome name="plus" /> Add</button>
                        <button onClick={this.deleteFrame.bind(this)} className="btn btn-default navbar-btn" title="Delete frame"><FontAwesome name="minus" /> Remove</button>
                    </div>
                    <span> </span>
                    <div className="btn-group" role="group">
                        <button onClick={this.previousFrame.bind(this)} className="btn btn-default navbar-btn" title='Previous'><FontAwesome name='step-backward' /> Prev</button>
                        <button onClick={this.nextFrame.bind(this)} className="btn btn-default navbar-btn" title='Next'>Next <FontAwesome name='step-forward' /></button>
                    </div>
                    </div>                  
                    <div className='col-md-12'>
                    {this.state.animation.map((bitmap, index) => ({key:index, selectedIndex:this.state.currentIndex, bitmap, index})).map(props => <TimelineMatrix {...props} switchFrame={this.switchFrame.bind(this)} />)}       
                    </div>
                </Panel>
            </div>
            <div className="col-md-12">
            <Panel icon="code" title="Code">
            <ul className="nav nav-tabs">
                {languages.map(language => <Tab selectedLanguage={this.state.language} {...language} clickHandler={this.changeLanguage.bind(this)} />)}    
            </ul>
            <SyntaxHighlighter language={this.state.language} style={monokaiSublime}>               
                {this.formattedCode()} 
            </SyntaxHighlighter>
            </Panel>
            </div>
        </div>;
    }
    formattedCode() {
        let codeOutput;
        switch (this.state.language) {
            case "javascript":
                codeOutput = formatJS(this.state.animation, this.state.intervalTime);
                break;
            default:
                codeOutput = formatCPP(this.state.animation, this.state.intervalTime);
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
    changeLanguage(language) {
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
    switchFrame(newIndex) {
        this.setState({
            currentIndex: newIndex
        });
    }
    changeInterval(newInterval) {
        this.setState({
                intervalTime: newInterval
            } 
        );
    }

    get currentBitmap() {
        return this.state.animation[this.state.currentIndex];
    }
}