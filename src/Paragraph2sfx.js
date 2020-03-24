import React, { useEffect, useState } from 'react'
import 'framer-motion';

import { Frame, motion, useMotionValue, useTransform } from "framer";

import ReactAudioPlayer from 'react-audio-player';
import { useRef } from "react";
import ReactLoading from 'react-loading';




//make smaller frames like in https://getbootstrap.com/docs/4.4/examples/album/
//everytime you add in a card, it automatically get in place. 
//volume control
//change button to phonographe

//Can play them in sequence?
//can choose your sound effects?

//WHAT ABOUT just a pile of stories. Each one is a card, that you can move and sift through. 
//When you hover over them, you can hear what it's about. Would need a title and be able to string together stories.

//after they write their texts, could have sound effects of writing and then the texts become Cedarville Cursive

//color schemes for cards   https://coolors.co/354c9e-3da5d9-73bfb8-fec601-b7400c
//#357C9E   #3DA5D9  #73BFB8  #FEC601  #B7400C


//maybe have it in forms of vynils, then when you place them in the middle, they become squares with the texts. Should have a title too.

//would need to have a few examples ready already. 

//maybe keep it simple at first. Let's just get a few stories in there. 


export default function Paragraph2sfx() {

  var [state, setState] = useState({
    // textInput: props.textInput,
    // prevSubmittedText: props.textInput,
    // sfx: props.sfx,
    textInput: "",
    prevSubmittedText: "",
    sfx: [],
    audiofiles: "",
    loading: false,
    reload: 0
  })


  const handleChange = (event) => {
    let { name, value } = event.target
    setState({
      ...state,
      [name]: value
    })
  }

  //once the audio updates, then play the sound
  useEffect(() => {
    console.log("detected sfx update")
    console.log(state.sfx[0])
    console.log(state.sfx[1])


    setState({
      ...state,
      audiofiles: state.sfx.map(sfxurl => <ReactAudioPlayer src={sfxurl} autoPlay />)
    })

  }, [state.sfx, state.reload])

  //update the loading icon
  useEffect(() => {
  }, [state.loading])

  const handleClick = event => {

    let { textInput, prevSubmittedText, sfx, reload } = state
    console.log("prevSubmittedText", prevSubmittedText)
    console.log("textInput", textInput)

    setState({
      ...state,
      loading: true
    })

    if (textInput != prevSubmittedText) {


      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: textInput,
      };

      fetch('https://jeaga2j094.execute-api.us-east-2.amazonaws.com/dev/txt2sfx', requestOptions)

        .then(response => response.json())

        //retrieving audio
        //https://txt2sfxbucket.s3.us-east-2.amazonaws.com/sound_effects/sounds/Africa_Nature/01_Cameroun_Insects_And_Frogs_early_morning.wav
        .then(sfxPaths => sfxPaths["sfx_to_play"].map(sfxPath => {
          return "https://txt2sfxbucket.s3.us-east-2.amazonaws.com/sound_effects/sounds/" + sfxPath.replace("\\", "/")

        }))
        .then(sfxPaths => setState({ ...state, sfx: sfxPaths, loading: false, prevSubmittedText: textInput }))

    }

    //If nothing changed, than just replay the sounds. We're setting the sfx to be what they were before, this will trigger useEffect, which will reload the audio 
    else {
      console.log("no change detected")
      console.log("sfx", sfx)
      setState({
        ...state, reload: reload + 1, audiofiles: ""
      })
    }


  }


  return (

    <div className="row justify-content-md-center">


      <Frame

        width={500}
        height={250}
        radius={10}
        background={"rgba(233, 239, 245, 0.65)"}

      >
        {state.audiofiles}

        <div>
          <textarea className="ui-input-text" name="textInput" value={state.textInput} placeholder="Jim opened the dungeon doors and started walking down the stone steps..." onChange={handleChange}></textarea>

        </div>
        {state.loading ? <ReactLoading type={"bars"} color={"#75B6F6"} height={"40px"} width={"60px"} /> :
          <button className="btn btn-lg btn-outline-primary" onClick={handleClick}> <img src={require('./phonographe2.png')} height="40px" /></button>
        }

      </Frame >


    </div>

  )


}


