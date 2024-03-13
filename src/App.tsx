import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const { editor, onReady } = useFabricJSEditor()
  const [ submitted, setSubmitted ] = useState(false);
  
  if (editor) {
    editor.canvas.isDrawingMode = true;
    editor.canvas.setHeight(600);
    editor.canvas.setWidth(600);
    editor.canvas.freeDrawingBrush.width = 30;
    editor.canvas.freeDrawingBrush.color = 'white';
  }

  const onSubmit = () => {
    if (!editor) {
      return;
    }
    editor.canvas.setBackgroundColor('black', () => {
      const canvas = editor.canvas;
      const data = canvas.toDataURL({format: 'png'})


      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = 28;
      tempCanvas.height = 28;

      // Create an image element from the data URL
      const img = new Image();
      img.onload = () => {
        if (!tempCtx) {
          return;
        }
        // Draw the image onto the temporary canvas, resizing it to 28x28 pixels
        tempCtx.drawImage(img, 0, 0, 28, 28);

        // Get the resized image data
        const resizedData = tempCanvas.toDataURL('image/png');
        axios.post('http://localhost:8000/recognize-digit/', {
          image_base64 : resizedData
        }).then(r=>{
          console.log(JSON.stringify(r))
        }).catch(e => {
          console.log(JSON.stringify(e))
        })
        console.log(resizedData);
        setSubmitted(true);
      };
      img.src = data;
    })
  }

  const onReset = () => {
    if (!editor) {
      return;
    }
    editor.canvas.clear();
    setSubmitted(false);
  }

  const canvasRef = useRef(null);

  return (
    <div className="App">
      <div className='header'><span>Handwritten digit recognition</span></div>
      <FabricJSCanvas className="drawwrapper" onReady={onReady} />
      <div className='buttonWrapper'>
        <button disabled={submitted} onClick={onSubmit} className={!submitted ? 'submitButton' : 'disabledSubmitButton'}>Submit</button>
        {submitted && <button onClick={onReset} className='resetButton'>Reset</button>}
      </div>
      
    </div>
  );
}

export default App;
