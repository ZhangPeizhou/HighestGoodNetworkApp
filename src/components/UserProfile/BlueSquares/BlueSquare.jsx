/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './BlueSquare.css';
import { connect } from 'react-redux';
import { formatDate } from '../../../utils/formatDate';
import { formatDateFromDescriptionString } from '../../../utils/formatDateFromDescriptionString';
import hasPerm from '../../../utils/permissions';

function BlueSquare(props) {
  const { hasPermission } = props;
  const isInfringementAuthorizer = hasPermission('infringementAuthorizer');
  const canPutUserProfileImportantInfo = hasPermission('putUserProfileImportantInfo');
  const { blueSquares, handleBlueSquare } = props;

  return (
    <div className="blueSquareContainer">
      <div className="blueSquares">
        {blueSquares
          ? blueSquares
              .sort((a, b) => (a.date > b.date ? 1 : -1))
              .map((blueSquare, index) => (
                // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  role="button"
                  id="wrapper"
                  data-testid="blueSquare"
                  className="blueSquareButton"
                  onClick={() => {
                    if (!blueSquare._id) {
                      handleBlueSquare(isInfringementAuthorizer, 'message', 'none');
                    } else if (canPutUserProfileImportantInfo) {
                      handleBlueSquare(
                        canPutUserProfileImportantInfo,
                        'modBlueSquare',
                        blueSquare._id,
                      );
                    } else {
                      handleBlueSquare(
                        !canPutUserProfileImportantInfo,
                        'viewBlueSquare',
                        blueSquare._id,
                      );
                    }
                  }}
                >
                  <div className="report" data-testid="report">
                    <div className="title">{formatDate(blueSquare.date)}</div>
                    {blueSquare.description !== undefined && (
                      <div className="summary">
                        {formatDateFromDescriptionString(blueSquare.description)}
                      </div>
                    )}
                  </div>
                </div>
              ))
          : null}
      </div>

      {isInfringementAuthorizer && (
        <div
          onClick={() => {
            handleBlueSquare(true, 'addBlueSquare', '');
          }}
          className="blueSquareButton"
          color="primary"
          data-testid="addBlueSquare"
        >
          +
        </div>
      )}
      <br />
    </div>
  );
}

export default connect(null, { hasPerm })(BlueSquare);
