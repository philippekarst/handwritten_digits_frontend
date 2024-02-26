import { useEffect, useRef } from 'react';
import './App.css';
import 'js-draw/bundledStyles';
import { Editor, Rect2 } from 'js-draw';
import { SimpleDrawingBoard, create } from "simple-drawing-board";
import { Canvas } from 'fabric/fabric-impl';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'

function App() {
  const { editor, onReady } = useFabricJSEditor()

  if (editor) {
    editor.canvas.isDrawingMode = true;
    editor.canvas.setHeight(600);
    editor.canvas.setWidth(600);
    editor.canvas.freeDrawingBrush.width = 10;
  }

  const canvasRef = useRef(null);

  // useEffect(() => {
  //   const editor = initializeDraw(canvasRef.current as any );
  //   return () => {
  //     destroyEditor(editor);
  //   };
  // }, []);

  return (
    <div className="App">
      <FabricJSCanvas className="drawwrapper" onReady={onReady} />
    </div>
  );
}

// function initializeDraw(htmlElement: HTMLElement) {
//   console.log('element', htmlElement);
//   const editor = new Editor(htmlElement);

//   // editor.loadFromSVG(`
//   //   <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"">
//   //     <rect width="600" height="600"/>
//   //   </svg>
//   // `);

//   return editor;
// }

// function destroyEditor(editor: Editor) {
//   if (editor){
//     editor.remove(); 
//   }
// }

export default App;
