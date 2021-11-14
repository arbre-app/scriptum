import { useRef } from 'react';
import { Card, Container } from 'react-bootstrap';
import { FileEarmarkBreak } from 'react-bootstrap-icons';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

export function BlockOutputFile({ outputImageSvg, twRef }) {

  return (
    <Container>
      <Card className="shadow-sm mt-4 mb-4">
        <Card.Body>
          <h2 className="h4">
            <FileEarmarkBreak className="icon mr-2" />
            Restauration
          </h2>

          {outputImageSvg !== null && (
            <TransformWrapper ref={twRef}>
              <TransformComponent>
                <div
                  id="svg-container"
                  dangerouslySetInnerHTML={{ __html: outputImageSvg }}
                />
              </TransformComponent>
            </TransformWrapper>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
