function Modal({ status, id }) {
  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Konyhatündér üzenet</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div className="modal-body">{status}</div>

          <div className="modal-footer">
            {status === 'Sikeres hozzáadás!' ? (
              <a className="btn btn-success" href="./">
                Főoldal
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Bezárás
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
