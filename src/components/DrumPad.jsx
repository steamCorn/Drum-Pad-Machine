import React from 'react';

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeID: '',
            isButtonActive: true,
        };
        this.playAudio = this.playAudio.bind(this);
        this.makeSoundFunction = this.makeSoundFunction.bind(this);
        this.handlerPressButton = this.handlerPressButton.bind(this);
        this.handlerClickButton = this.handlerClickButton.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlerPressButton);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerPressButton);
    }

    playAudio(id) {
        let audio = document.getElementById(id);
        audio.currentTime = 0;
        audio.volume = this.props.volumeSound;
        audio.play();
    }

    makeSoundFunction(arr, id, trigger, url) {
        if (!arr) {
            return;
        }

        this.props.setDisplay(id);

        this.setState({
            activeButton: id,
        });

        this.playAudio(trigger);
        this.buttonIDsetState(id);
        setTimeout(() => this.buttonIDsetState(''), 100);
    }

    handlerPressButton(event) {
        let currentAudio = this.props.currentSoundFile.find(
            (currentButton) => currentButton.keyCode === event.keyCode,
        );

        this.makeSoundFunction(
            currentAudio,
            currentAudio.id,
            currentAudio.keyTrigger,
            currentAudio.url,
        );
    }

    handlerClickButton = (event) => {
        let currentAudio = this.props.currentSoundFile.find(
            (currentButton) => currentButton.id === event.currentTarget.id,
        );

        this.makeSoundFunction(
            currentAudio,
            currentAudio.id,
            currentAudio.keyTrigger,
            currentAudio.url,
        );
    };

    buttonIDsetState(buttonID) {
        this.setState({
            activeID: buttonID,
        });
    }

    render() {
        return (
            <div className="drum-pad-style" id="drumPad">
                {this.props.currentSoundFile.map((sound) =>
                    sound.id === this.state.activeID ? (
                        <div
                            key={sound.keyCode}
                            className={'drum-pad' + ' ' + 'drum_button_active'}
                            id={sound.id}
                            onClick={this.handlerClickButton}
                        >
                            <audio
                                className="clip"
                                src={sound.url}
                                id={sound.keyTrigger}
                            >
                                Sorry, but your browser doesn't support the
                                audio.
                            </audio>
                            <div className="letterOnPad">
                                {sound.keyTrigger}
                            </div>
                        </div>
                    ) : (
                        <div
                            key={sound.keyCode}
                            className={'drum-pad'}
                            id={sound.id}
                            onClick={this.handlerClickButton}
                        >
                            <audio
                                className="clip"
                                src={sound.url}
                                id={sound.keyTrigger}
                            >
                                Sorry, but your browser doesn't support the
                                audio.
                            </audio>
                            <div className="letterOnPad">
                                {sound.keyTrigger}
                            </div>
                        </div>
                    ),
                )}
            </div>
        );
    }
}

export default DrumPad;
