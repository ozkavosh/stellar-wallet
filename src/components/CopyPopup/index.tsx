import { FC, useState } from "react";
import { Popup, PopupWrapper } from "./style";

interface Props extends React.PropsWithChildren<{}> {
  onClick: () => void;
}

const CopyPopup: FC<Props> = ({ children, onClick }: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const DELAY_IN_MILLISECONDS = 1000;

  const handlePopUp = () => {
    if (!showPopup) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, DELAY_IN_MILLISECONDS);
    }
  };

  const handleChildrenClick = () => {
    onClick();
    handlePopUp();
  };

  return (
    <PopupWrapper onClick={handleChildrenClick}>
      {showPopup && (
        <Popup>
          <p>Copied!</p>
        </Popup>
      )}
      {children}
    </PopupWrapper>
  );
};

export default CopyPopup;
