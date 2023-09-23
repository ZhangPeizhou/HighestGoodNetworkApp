import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { updateUserFinalDayStatus } from 'actions/userManagement';
import { toast } from 'react-toastify';
import { boxStyle } from 'styles';
import SetUpFinalDayPopUp from './SetUpFinalDayPopUp';
import { SET_FINAL_DAY, CANCEL } from '../../languages/en/ui';

/**
 * @param {*} props
 * @param {Boolean} props.isBigBtn
 * @param {*} props.userProfile.isSet
 * @returns
 */
function SetUpFinalDayButton(props) {
  const [isSet, setIsSet] = useState(false);
  const [finalDayDateOpen, setFinalDayDateOpen] = useState(false);
  const dispatch = useDispatch();
  const { userProfile, loadUserProfile, isBigBtn } = props;

  useEffect(() => {
    if (userProfile?.endDate !== undefined) setIsSet(true);
  }, []);

  const onFinalDayClick = async () => {
    if (isSet) {
      await updateUserFinalDayStatus(userProfile, 'Active', undefined)(dispatch);
      setIsSet(!isSet);
      setTimeout(async () => {
        await loadUserProfile();
        toast.success("This user's final day has been deleted.");
      }, 1000);
    } else {
      setFinalDayDateOpen(true);
    }
  };

  const setUpFinalDayPopupClose = () => {
    setFinalDayDateOpen(false);
  };

  const deactiveUser = async finalDayDate => {
    await updateUserFinalDayStatus(userProfile, 'Active', finalDayDate)(dispatch);
    setIsSet(true);
    setFinalDayDateOpen(false);
    setTimeout(async () => {
      await loadUserProfile();
      toast.success("This user's final day has been set.");
    }, 1000);
  };

  return (
    <>
      <SetUpFinalDayPopUp
        open={finalDayDateOpen}
        onClose={setUpFinalDayPopupClose}
        onSave={deactiveUser}
      />
      <Button
        outline
        color="primary"
        className={`btn btn-outline-${isSet ? 'warning' : 'success'} ${
          isBigBtn ? '' : 'btn-sm'
        }  mr-1`}
        onClick={() => {
          onFinalDayClick(userProfile, isSet);
        }}
        style={boxStyle}
      >
        {isSet ? CANCEL : SET_FINAL_DAY}
      </Button>
    </>
  );
}
export default SetUpFinalDayButton;
