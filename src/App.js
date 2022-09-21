
import React, { useState } from 'react';
import './App.css';
import Tesseract ,{createWorker} from 'tesseract.js';


const worker = createWorker({
  logger: m => console.log(m)
});
function App() {

  const [isFile, setIsFile] = useState('');

  const handleFileChange =  (e) => {
    if (!e.target.files)
      return;
    var file = e.target.files[0]
    setIsFile(file);
    if (!file) {
      return;
    }
  }

React.useEffect(() => {
const setimgtext = async () => {
  if(isFile){
    // Tesseract.recognize(
    //   URL.createObjectURL(isFile),
    //   'eng',
    //   { logger: m => console.log(m) }
    // ).then(({ data: { text } }) => {
    //   console.log(text);
    // })
    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(URL.createObjectURL(isFile));
      console.log(text);
      await worker.terminate();
    })
    ();
  
  }
}
setimgtext();
},[isFile])

  return (
    <div className="App">
      <input type="file" name="file" multiple={true} onChange={handleFileChange}/>

                  {
                    isFile && <div style={{alignItems:'center',justifyContent:'center',margin:'auto',padding:'auto'}}>
                    <img src={URL.createObjectURL(isFile)} style={{transform:'scale(0.4)'}}/>
                    </div>
                  }
    </div>
  );
}

export default App;
