import React from 'react'

import ReactAudioPlayer from 'react-audio-player';

export default function Test() {
    return (
        <div>
            <ReactAudioPlayer src={"https://txt2sfxbucket.s3.us-east-2.amazonaws.com/sound_effects/sounds/Africa_Nature/01_Cameroun_Insects_And_Frogs_early_morning.wav"} autoPlay />
            <ReactAudioPlayer src={"https://txt2sfxbucket.s3.us-east-2.amazonaws.com/sound_effects/sounds/Cats/cat_Meows_851.wav"} autoPlay />

        </div>
    )
}
