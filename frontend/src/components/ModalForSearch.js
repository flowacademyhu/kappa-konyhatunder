import { Modal, Button } from 'react-bootstrap';

function ModalForSearch(props) {
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Konyhatündér üzenet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Minimum egy kritérium megadása kötelező a képen felül
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Bezárás</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForSearch;
