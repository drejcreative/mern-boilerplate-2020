import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPenSquare,
  faMinusSquare,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

import Store from "../../store/store";
import {
  GET_FORMS,
  REMOVE_FROM_FORMS,
  UPDATE_FORMS,
} from "../../store/actionTypes";

import { formService } from "../../services/formService";

import style from "./List.module.scss";

const List = ({ editItem }) => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const listData = await formService.fetchList();
    dispatch({
      type: GET_FORMS,
      payload: listData,
    });
  };

  const deleteList = async (id) => {
    console.log(id);
    const listData = await formService.deleteFromList(id);
    dispatch({
      type: REMOVE_FROM_FORMS,
      payload: listData,
    });
  };

  const setStatus = async (item) => {
    const preparedData = {
      ...item,
      status: !item.status,
    };
    const listData = await formService.updateList(preparedData);
    dispatch({
      type: UPDATE_FORMS,
      payload: listData,
    });
  };

  return (
    <div className={style.listWrap}>
      {state.forms.map((item) => (
        <div className={style.list} key={item._id}>
          <FontAwesomeIcon
            icon={faCheckSquare}
            className={`${style.icon} ${style.iconCheck} ${
              item.status ? style.active : ""
            }`}
            onClick={() => setStatus(item)}
          />
          <div className={style.text}>
            <p>{item.name}</p>
            <span>{item.text}</span>
          </div>
          <FontAwesomeIcon
            icon={faPenSquare}
            style={{ marginLeft: "auto" }}
            className={`${style.icon} ${style.edit}`}
            onClick={() => editItem(item)}
          />
          <FontAwesomeIcon
            icon={faMinusSquare}
            style={{ marginLeft: "10px" }}
            onClick={() => deleteList(item._id)}
            className={`${style.icon} ${style.delete}`}
          />
        </div>
      ))}
    </div>
  );
};

export default List;
