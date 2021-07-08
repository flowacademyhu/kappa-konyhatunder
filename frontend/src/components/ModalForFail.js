import { Modal, Button } from 'react-bootstrap';

function ModalForFail(props) {
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Konyhatündér üzenet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Túl nagy a Kép . Kérjünk válasszon 1 MB-nál kisebbet
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Bezárás</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForFail;
