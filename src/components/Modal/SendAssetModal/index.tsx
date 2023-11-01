import { FC, useState, useEffect } from "react";
import BaseModal from "../BaseModal";
import { ErrorText, TextInput, CurrentBalance, Select } from "../style";
import { Button } from "../../Button";
import { Asset } from "stellar-sdk";
import { SEND_ASSET_MODAL_INITIAL_STATE } from "../../../utils/constants/InitialStates";
import handleNamedInputChange from "../../../utils/handleNamedInputChange";
import validateSendAssetInputs from "../../../utils/validateSendAssetInputs";

const SendAssetModal: FC<ISendAssetModalProps> = ({
  showModal,
  setShowModal,
  balances,
  onSendClick,
}: ISendAssetModalProps) => {
  const [formState, setFormState] = useState<IFormState>(
    SEND_ASSET_MODAL_INITIAL_STATE
  );

  const resetForm = () => {
    setFormState(SEND_ASSET_MODAL_INITIAL_STATE);
  };

  const getCurrentBalance = () => {
    const currentBalance = parseFloat(
      balances.find((balance) => balance.asset_type === formState.assetType)
        ?.balance || "0"
    );

    setFormState({ ...formState, currentBalance });
  };

  const handleButtonClick = async () => {
    const { destinationPublicKey, amount, assetType, currentBalance } =
      formState;

    const error = validateSendAssetInputs(
      destinationPublicKey,
      amount,
      currentBalance,
      assetType
    );
    if (!error) {
      try {
        await onSendClick(
          formState.destinationPublicKey,
          formState.amount,
          formState.assetType
        );
        setShowModal(false);
      } catch (error) {
        setFormState({ ...formState, error: "Error sending assets" });
      }
    } else {
      setFormState({ ...formState, error });
    }
  };

  useEffect(() => {
    if (formState.assetType && showModal) {
      getCurrentBalance();
    }

    if (!showModal) {
      resetForm();
    }
  }, [formState.assetType, showModal]);

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <h2>Send assets</h2>
      <TextInput
        placeholder="Destination Public key"
        name="destinationPublicKey"
        value={formState.destinationPublicKey}
        onChange={(e) => handleNamedInputChange(e, setFormState)}
      />
      <Select
        onChange={(e) => handleNamedInputChange(e, setFormState)}
        value={formState.assetType}
        name="assetType"
      >
        <option value="0" disabled>
          Select asset
        </option>
        {balances.map((balance) => (
          <option key={balance.asset_type} value={balance.asset_type}>
            {balance.asset_type === "native"
              ? Asset.native().code
              : balance.asset_type}
          </option>
        ))}
      </Select>
      <TextInput
        placeholder="Amount"
        name="amount"
        value={formState.amount}
        onChange={(e) => handleNamedInputChange(e, setFormState)}
      />
      <CurrentBalance>
        Available: {formState.currentBalance || "0"}
      </CurrentBalance>
      {formState.error && <ErrorText>{formState.error}</ErrorText>}
      <Button onClick={handleButtonClick} className="continue" $dark>
        Send
      </Button>
    </BaseModal>
  );
};

export default SendAssetModal;
