import { Card, Container, Form } from 'react-bootstrap';
import { Crop, FileEarmark } from 'react-bootstrap-icons';
import { ImageWithCrop } from './ImageWithCrop';

export function BlockInputFile({ sourceImage, onFileChange, onCrop }) {
  return (
    <Container>
      <Card className="shadow-sm mt-4">
        <Card.Body>
          <h2 className="h4">
            <FileEarmark className="icon mr-2" />
            Choix du fichier source
          </h2>

          <Form.File
            id="custom-file"
            label="Custom file input"
            custom
            onChange={onFileChange}
          />

          <div className="text-center">
            <small className="text-muted">Il peut s'agir d'une image (.png, .jpg, .jpeg) ou bien d'un document PDF</small>
          </div>

          {sourceImage !== null && (
            <>
              {/*style={{ maxWidth: '100%', maxHeight: '75vh' }}*/}
              <div className="text-center mt-4">
                <ImageWithCrop src={sourceImage} onCrop={onCrop} />
              </div>
              <div className="text-center">
                <Crop className="icon mr-2" />
                Utiliser la souris pour encadrer la zone souhaitée
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
