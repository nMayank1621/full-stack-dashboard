import { useState } from 'react';
import './AITools.css';

function AITools(props) {
  const toggleSidebar = props.toggleSidebar;
  
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'ai', text: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  
  const [summarizerInput, setSummarizerInput] = useState('');
  const [summarizerOutput, setSummarizerOutput] = useState('');
  
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageOutput, setImageOutput] = useState('');
  
  const [codePrompt, setCodePrompt] = useState('');
  const [codeOutput, setCodeOutput] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages([...chatMessages, { from: 'user', text: chatInput }]);
    const userInput = chatInput;
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        from: 'ai', 
        text: `Thanks for your message: "${userInput}". I'm here to help with anything!` 
      }]);
    }, 1000);
  };

  const handleSummarize = (e) => {
    e.preventDefault();
    setSummarizerOutput('Summary: This is a simulated summary of your text. In a real implementation, this would use an AI summarization model to condense your content while preserving the key points!');
  };

  const handleGenerateImage = (e) => {
    e.preventDefault();
    setImageOutput('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80');
  };

  const handleGenerateCode = (e) => {
    e.preventDefault();
    setCodeOutput('```javascript\nfunction helloWorld() {\n  console.log("Hello from AI!");\n}\n\nhelloWorld();\n```');
  };

  return (
    <main className="content">
      <button
        className="sidebar-toggle-btn"
        onClick={(e) => {
          e.preventDefault();
          if (toggleSidebar) toggleSidebar();
        }}
      >
        ☰
      </button>
      <div className="aitools-container">
        <div className="page-header">
          <h1>AI Tools</h1>
          <p className="subtitle">Powerful AI tools at your fingertips</p>
        </div>

        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">💬</div>
            <div className="tool-info">
              <h3>AI Chat Assistant</h3>
              <p>Chat with your AI assistant</p>
            </div>
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.from}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <form className="chat-form" onSubmit={handleSendChat}>
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>

          <div className="tool-card">
            <div className="tool-icon">📝</div>
            <div className="tool-info">
              <h3>Text Summarizer</h3>
              <p>Summarize long texts quickly</p>
            </div>
            <form className="tool-form" onSubmit={handleSummarize}>
              <textarea 
                value={summarizerInput}
                onChange={(e) => setSummarizerInput(e.target.value)}
                placeholder="Paste the text you want to summarize..."
                rows={4}
              ></textarea>
              <button type="submit" className="tool-btn">Summarize</button>
            </form>
            {summarizerOutput && (
              <div className="tool-output">
                <h4>Summary:</h4>
                <p>{summarizerOutput}</p>
              </div>
            )}
          </div>

          <div className="tool-card">
            <div className="tool-icon">🎨</div>
            <div className="tool-info">
              <h3>Image Generator</h3>
              <p>Generate images with AI</p>
            </div>
            <form className="tool-form" onSubmit={handleGenerateImage}>
              <input 
                type="text" 
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Describe the image you want..."
              />
              <button type="submit" className="tool-btn">Generate</button>
            </form>
            {imageOutput && (
              <div className="tool-output image-output">
                <img src={imageOutput} alt="Generated" />
              </div>
            )}
          </div>

          <div className="tool-card">
            <div className="tool-icon">💻</div>
            <div className="tool-info">
              <h3>Code Generator</h3>
              <p>Generate code snippets</p>
            </div>
            <form className="tool-form" onSubmit={handleGenerateCode}>
              <textarea 
                value={codePrompt}
                onChange={(e) => setCodePrompt(e.target.value)}
                placeholder="Describe the code you want..."
                rows={4}
              ></textarea>
              <button type="submit" className="tool-btn">Generate Code</button>
            </form>
            {codeOutput && (
              <div className="tool-output code-output">
                <pre>{codeOutput}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AITools;
