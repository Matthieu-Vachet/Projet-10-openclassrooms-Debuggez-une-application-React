import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      // Vérifie si le formulaire est valide
      if (evt.target.reportValidity()) {
        setSending(true);
        // Nous essayons d'appeler mockContactApi
        try {
          await mockContactApi();
          setSending(false);
          onSuccess();
        } catch (err) {
          setSending(false);
          onError(err);
        }
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="Nom" label="Nom" required />
          <Field placeholder="Prénom" label="Prénom" required />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            placeholder="Sélectionnez une option"
            titleEmpty
          />
          <Field placeholder="Email" 
          label="Email"
          required 
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          {/* Ajout de onClick={() => onSuccess()} pour rendre fonctionnel le click et afficher la modale de confirmation  */}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {/* Suppression du onClick={() => onSuccess()} */}
            {/* la modale ne s'ouvrira que si le formulaire est valide et a été soumis avec succès. */}
            {/* onClick={() => onSuccess()} */}
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="Message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
