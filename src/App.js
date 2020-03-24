import React from 'react';
import './App.css';
import Paragraph2sfx from './Paragraph2sfx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './Test'



function App() {


  var blankStory = { id: 1, textInput: "", sfx: [] }
  var exampleStories = [{ id: 2, textInput: "testing", sfx: [] }]




  //https://codepen.io/P1N2O/pen/pyBNzX
  return (
    <div className="App">
      <div className="container-sm">
        <div className="row justify-content-md-center">

          <h1 className="mainTitle">The sounds of imagination

          </h1>
        </div>
        <div className="row justify-content-md-center">
          <h3 className="col-5 mainTitle">
            Write a few lines, then click on the phonograph...
          </h3>
        </div>


        <p></p>
        <div className="row justify-content-md-center">
          {/* {...blankStory} */}
          <Paragraph2sfx />
        </div>





        {/* <div className="storyBlock">


          <div className="row justify-content-md-center"><Paragraph2sfx /></div>
        </div>

        <div className="storyBlock">

          <div className="row justify-content-md-center"><Paragraph2sfx /></div>

        </div> */}




      </div >

    </div >


  );
}

export default App;



