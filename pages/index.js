import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';



const Home = () => {

//hooks
const [userInput, setUserInput] = useState(); //get the text from text area
const [apiOutput, setApiOutput] = useState('') //get the output of the api
const [isGenerating, setIsGenerating] = useState(false) //states on and off of the api to load

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  console.log("Calling OpenAI...")
  const formattedUserInput = `Give me a list with more accurate and context-aware words and phrases for the following text:\n\n ${userInput}\n\n list:\n\n`
  console.log(formattedUserInput)
  const response = await fetch('api/generate',{
    method:'POST',
    headers : {
      'Content-Type': 'application/json',
    },                   //changed it from userInput
    body: JSON.stringify({userInput:formattedUserInput}), 
  });
  const data = await response.json(); //sacas la data del response json 
  const { output } = data; //destructuring variable data instead of doing output = data.output
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  // setApiOutput(output.text);
  setIsGenerating(false)
}

const onUserChangedText = (event) => {
  // console.log(event.target.value);
  setUserInput(event.target.value);
}


  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>PromptCrafter A Text-to-Image Model Helper</h1>
          </div>
          <div className="header-subtitle">
            <h2>Don't know where to start with a prompt? Input below what you would like and let the rest to us</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
          placeholder='Start typing here' 
          className="prompt-box" 
          value={userInput}
          //when something changes in textarea, onUserChangedText executes
          onChange={onUserChangedText} 
          />;
          <div className="prompt-butons">
            <a 
              className = {isGenerating ? 'generate-button loading':'generate-button'} 
              onClick={callGenerateEndpoint}
            >
              <div className='generate'>
              {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Ou`tput</h3>
                </div>  
              </div>
              <div className="output-content">
              <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
