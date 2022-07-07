import React from 'react';
import DrumPad from './DrumPad';
import ControlBlock from './ControlBlock';
import { firstAudioFile, secondAudioFile } from '../data/sounds-file';

import './drumMachine.css';

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayHandler: '',
            currentSoundFile: firstAudioFile,
            soundFileName: 'firstAudioFile',
            volumeValue: 30,
        };
        this.setDisplay = this.setDisplay.bind(this);
        this.changeSoundFile = this.changeSoundFile.bind(this);
        this.adjustVolume = this.adjustVolume.bind(this);
    }

    changeSoundFile(e) {
        if (e.currentTarget.value === 'firstAudioFile') {
            this.setState({
                soundFileName: e.currentTarget.value,
                currentSoundFile: firstAudioFile,
            });
        } else {
            this.setState({
                soundFileName: e.currentTarget.value,
                currentSoundFile: secondAudioFile,
            });
        }
    }

    setDisplay(display) {
        this.setState({
            displayHandler: display,
        });
    }

    adjustVolume(e) {
        this.setState({
            volumeValue: e.target.value,
        });
    }

    render() {
        return (
            <div
                id="drum-machine"
                className="wrapper-drum-machine style-wrapper"
            >
                <DrumPad
                    currentSoundFile={this.state.currentSoundFile}
                    setDisplay={this.setDisplay}
                    setVolume={this.setVolume}
                    volumeSound={this.state.volumeValue / 100}
                />
                <ControlBlock
                    display={this.state.displayHandler}
                    changeSoundFile={this.changeSoundFile}
                    adjustVolume={this.adjustVolume}
                    volumeValue={this.state.volumeValue}
                    soundFileName={this.state.soundFileName}
                />
            </div>
        );
    }
}
export default DrumMachine;
