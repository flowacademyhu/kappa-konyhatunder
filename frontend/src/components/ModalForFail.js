import { Modal, Button } from 'react-bootstrap';

function ModalForFail(props) {
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Konyhatündér üzenet</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kérjük válasszon egy hozzávalót</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Bezárás</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForFail;
