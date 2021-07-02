import { addRecipe } from './apiCalls';

const NoImageSelectedModal = ({
  status,
  id,
  formValuesForModal,
  selectedFile,
  newIngredientsList,
}) => {
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
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
            >
              Vissza
            </button>

            <button
              className="btn btn-warning"
              type="button"
              data-dismiss="modal"
              onClick={() => {
                addRecipe(
                  formValuesForModal,
                  selectedFile,
                  newIngredientsList.filter((e) => e.ingredient !== undefined)
                );
              }}
            >
              Folytatás kép nélkül
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoImageSelectedModal;
