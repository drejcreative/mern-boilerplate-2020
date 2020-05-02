import React, { useContext, useReducer, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Store from './store/store';
import reducer from './store/reducer';

import List from './components/List/List';
import Form from './components/Form/Form';
import Image from './components/Image/Image';

import style from './App.module.scss';

const App = () => {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formView, setFormView] = useState(false);
  const [edit, setEdit] = useState(false);

  const setView = () => setFormView(!formView);

  const closeForm = () => setFormView(false);

  const editItem = item => {
    setEdit(item);
    setFormView(true);
  };

  const clearEdit = () => {
    setEdit(false);
  }

  return (
    <Store.Provider value={{ state, dispatch }}>
      <div className={style.app}>
        <div className={style.todo}>
          <Image />
          <span className={style.button} onClick={setView}>
            <FontAwesomeIcon icon={faPlus} className={formView ? style.rotate : ''} />
          </span>
          <div className={style.body}>
            {
              formView
                ? <Form closeForm={closeForm} edit={edit} clearEdit={clearEdit} />
                : <List editItem={editItem} />
            }
          </div>
        </div>
        <a href="http://drejcreative.com">By Drej Creative</a>
      </div>
    </Store.Provider>
  );
}

export default App;
