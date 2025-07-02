import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault(); 
  
    const formData = new FormData(event.target);
    const videoUrl = formData.get('video-input');
  
    console.log(videoUrl);
    setLoading(true);
  
    try {
      const response = await axios.get(`http://13.49.238.235:3000/comments?videoUrl=${videoUrl}`);
      setSummary(response.data.aiSummary);
    } catch (err) {
      console.error(err);
      setSummary('Error fetching summary');
    }
  
    setLoading(false);
  };
  function clearSummary() {
    setSummary('');
  }
  return (
    <>
      <header className='main-header'>
        <h1>YouTube Comments</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="video-input">Enter YouTube Video ID</label>
          <input type="text" placeholder='Video ID' name='video-input' id='video-input' />
          <button type='submit'>Submit</button>
        </form>
        {loading && <p>Generating summary...</p>}
        <div>
          {summary}
        </div>
        <div>
          {summary && <button onClick={clearSummary}>Clear Summary</button>}
        </div>
      </main>
    </>
  )
}

export default App
