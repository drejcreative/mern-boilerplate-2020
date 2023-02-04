import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import List from "./List/List";
import Form from "./Form/Form";
import Image from "./Image/Image";

const ListWrapper = () => {
  const [formView, setFormView] = useState(false);
  const [edit, setEdit] = useState(false);

  const setView = () => setFormView(!formView);

  const closeForm = () => setFormView(false);

  const editItem = (item) => {
    setEdit(item);
    setFormView(true);
  };

  const clearEdit = () => {
    setEdit(false);
  };

  return (
    <div className={"app"}>
      <div className={"todo"}>
        <Image />
        <span className={"button"} onClick={setView}>
          <FontAwesomeIcon icon={faPlus} className={formView ? "rotate" : ""} />
        </span>
        <div className={"body"}>
          {formView ? (
            <Form closeForm={closeForm} edit={edit} clearEdit={clearEdit} />
          ) : (
            <List editItem={editItem} />
          )}
        </div>
      </div>
      <a href="http://drejcreative.com">By Drej Creative</a>
    </div>
  );
};

export default ListWrapper;
