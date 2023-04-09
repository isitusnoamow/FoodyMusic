import { useState, useRef } from 'react'
import { OpenAIApi, Configuration } from "openai"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const baseRef = useRef(null)
  const fancyRef = useRef(null)
  const romanticRef = useRef(null)
  const partyRef = useRef(null)
  const sadRef = useRef(null)

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration);
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    setLoading(true);
    console.log(fancyRef.current.value)
    let prompt = 'Please give me the name for a song to play at a dining experience based on the following description: You are eating ' + baseRef.current.value + '. The mood is ' + String(fancyRef.current.value) + '% Fancy, ' + String(romanticRef.current.value) + '% Romantic, ' + Stirng(partyRef.current.value) + '% Party, ' + String(sadRef.current.value) + '% Sad. Please only return the name of the song and nothing else.'
    try {
      console.log(import.meta.VITE_OPENAI_API_KEY)
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      //console.log("response", result.data.choices[0].text);
      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("hi")
  })


  return (
    <div className="App">
      <h1 className="title">FoodyMusic</h1>
      <h2>An app that will give you a song to play while dining</h2>
      <h3>Describe the Dish</h3>
      <textarea ref={baseRef}>
      </textarea>
      <br></br>

      <div className='flex-container'>
        <div className='flex-item'>
          <h3>Fancy Percentage%</h3>
        <input type="range" ref={fancyRef} min="0" max="100" />
        </div>

        <div className='flex-item'>
        <h3>Romantic Percentage</h3>
        <input type="range" ref={romanticRef} min="0" max="100" />
        </div>
        
        <div className='flex-item'>
        <h3>Party Percentage</h3>
        <input type="range" ref={partyRef} min="0" max="100" />
        </div>

        <div className='flex-item'>
        <h3>Sad Percentage</h3>
        <input type="range" ref={sadRef} min="0" max="100" />
        </div>
      </div>
      
      <button onClick={() => handleSubmit()}>{loading ? "Generating..." : "Generate"}</button>      
      <h1>{apiResponse}</h1>
    </div>
  )
}

export default App
