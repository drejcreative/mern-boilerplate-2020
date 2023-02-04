import React, { useContext, useEffect, useState } from "react";

import Store from "../../store/store";
import { ADD_TO_FORMS, UPDATE_FORMS } from "../../store/actionTypes";

import { formService } from "../../services/formService";

import style from "./Form.module.scss";

const INITIAL_LIST = {
  name: "",
  text: "",
};

const Form = ({ closeForm, edit, clearEdit }) => {
  const { dispatch } = useContext(Store);
  const [form, setForm] = useState(INITIAL_LIST);

  useEffect(() => {
    if (edit) {
      setForm(edit);
    }
  }, [edit]);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearForm = () => {
    setForm(INITIAL_LIST);
    closeForm();
  };

  const formSubmit = async () => {
    if (edit) {
      const newItem = await formService.updateList(form);
      dispatch({
        type: UPDATE_FORMS,
        payload: newItem,
      });
      clearForm();
      clearEdit();
      return;
    }

    const newItem = await formService.addToList(form);
    dispatch({
      type: ADD_TO_FORMS,
      payload: newItem,
    });
    clearForm();
  };

  return (
    <div className={style.form}>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={form.name}
        onChange={onFormChange}
      />
      <textarea
        type="text"
        name="text"
        rows="4"
        placeholder="text"
        value={form.text}
        onChange={onFormChange}
      />
      <button onClick={formSubmit}>Submit</button>
    </div>
  );
};

export default Form;
