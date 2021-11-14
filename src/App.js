import './App.css';
import { Potrace } from 'potrace';
import { useEffect, useMemo, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-image-crop/dist/ReactCrop.css';
import { Container } from 'react-bootstrap';
import { Eyedropper } from 'react-bootstrap-icons';
import { BlockInputFile } from './BlockInputFile';
import { BlockOutputFile } from './BlockOutputFile';
import { getCroppedImgPercent } from './utils';

function App() {

  const tracer = new Potrace();

  const twRef = useRef();

  const [inputBuffer, setInputBuffer] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const inputUrl = useMemo(() => {
    return inputBuffer !== null ? URL.createObjectURL(new Blob([inputBuffer])) : null;
  }, [inputBuffer]);

  const [outputSvg, setOutputSvg] = useState(null);
  useEffect(() => {
    if(inputBuffer !== null) {
      traceBuffer(croppedImageUrl || inputBuffer);
    }
  }, [inputBuffer, croppedImageUrl]);

  tracer.setParameters({
    //threshold: 128,
    //color: '#000'
  });

  const traceBuffer = buffer => {
    tracer.loadImage(buffer, err => {
      if(err) throw err;

      const svg = tracer.getSVG();
      setOutputSvg(svg);

      const { current: tw } = twRef;
      if(tw) {
        tw.resetTransform(0);
      }
    });
  };

  const imageCropHandler = crop => {
    if(crop !== null) {
      const img = new Image();
      img.src = inputUrl;
      img.onload = () => {
        getCroppedImgPercent(img, crop, 'cropped').then(blob => {
          setCroppedImageUrl(URL.createObjectURL(blob));
        });
      }
    } else {
      setCroppedImageUrl(null);
    }
  };

  useEffect(() => {
    //fetch('2.jpg').then(data => data.arrayBuffer()).then(traceBuffer);
  }, []);

  const fileChangeHandler = e => {
    const files = e.target.files;
    if(files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        setInputBuffer(arrayBuffer);
      }
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <Container className="text-center mt-2">
        <div className="h1">
          <Eyedropper className="icon" />
        </div>
        <h1 className="h2">Scriptum</h1>
        Outil pour la restauration numérique de documents anciens
      </Container>

      <BlockInputFile
        sourceImage={inputUrl}
        onFileChange={fileChangeHandler}
        onCrop={imageCropHandler}
      />

      <BlockOutputFile
        outputImageSvg={outputSvg}
        twRef={twRef}
      />
    </>
  );
}

export default App;
