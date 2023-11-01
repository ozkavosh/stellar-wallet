import { FC, useState, useEffect } from "react";
import BaseModal from "../BaseModal";
import { ErrorText, TextInput } from "../style";
import { Button } from "../../Button";
import { Asset, StrKey } from "stellar-sdk";
import { SEND_ASSET_MODAL_INITIAL_STATE } from "../../../utils/constants/InitialStates";

const SendAssetModal: FC<ISendAssetModalProps> = ({
  showModal,
  setShowModal,
  balances,
  onSendClick,
}: ISendAssetModalProps) => {
  const [formState, setFormState] = useState<IFormState>(SEND_ASSET_MODAL_INITIAL_STATE);

  const resetForm = () => {
    setFormState(SEND_ASSET_MODAL_INITIAL_STATE);
  };

  const validateInputs = () => {
    let error = "";

    if (!StrKey.isValidEd25519PublicKey(formState.destinationPublicKey)) {
      setFormState({ ...formState, error: "Invalid destination public key" });
      error = "Invalid destination public key";
    }

    if (formState.assetType === "0") {
      error = "Must select an asset type";
    }

    const balance = parseFloat(
      balances.find((balance) => balance.asset_type === formState.assetType)
        ?.balance || "0"
    );

    if (
      isNaN(parseFloat(formState?.amount)) ||
      balance < parseFloat(formState?.amount) ||
      parseFloat(formState?.amount) < 0
    ) {
      error = "Invalid amount";
    }

    return error;
  };

  const handleButtonClick = async () => {
    if (validateInputs()) {
      try {
        await onSendClick(
          formState.destinationPublicKey,
          formState.amount,
          formState.assetType
        );
        setShowModal(false);
      } catch (error) {
        console.log(error);
        setFormState({ ...formState, error: "Error sending assets" });
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (showModal) {
      resetForm();
    }
  }, [showModal]);

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <h2>Send assets</h2>
      <TextInput
        placeholder="Destination Public key"
        name="destinationPublicKey"
        value={formState.destinationPublicKey}
        onChange={handleInputChange}
      />
      <TextInput
        placeholder="Amount"
        name="amount"
        value={formState.amount}
        onChange={handleInputChange}
      />
      {formState.error && <ErrorText>{formState.error}</ErrorText>}
      Disponible:{" "}
      {
        balances.find((balance) => balance.asset_type === formState.assetType)
          ?.balance
      }
      <select
        onChange={handleInputChange}
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
      </select>
      <Button onClick={handleButtonClick} className="continue" $dark>
        Send
      </Button>
    </BaseModal>
  );
};

export default SendAssetModal;
