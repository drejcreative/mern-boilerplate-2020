import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPenSquare, faMinusSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

import Store from '../../store/store';
import { GET_LIST, REMOVE_FROM_LIST, UPDATE_LIST } from '../../store/actionTypes';

import { listService } from '../../services/listService';

import style from './List.module.scss';


const List = ({ editItem }) => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    getListData()
  }, []);

  const getListData = async () => {
    const listData = await listService.fetchList();
    dispatch({
      type: GET_LIST,
      payload: listData
    })
  }

  const deleteList = async (id) => {
    console.log(id);
    const listData = await listService.deleteFromList(id);
    dispatch({
      type: REMOVE_FROM_LIST,
      payload: listData
    })
  }

  const setStatus = async (item) => {
    const preparedData = {
      ...item,
      status: !item.status
    }
    const listData = await listService.updateList(preparedData);
    dispatch({
      type: UPDATE_LIST,
      payload: listData
    })
  }

  return (
    <div className={style.listWrap}>
      {
        state.list.map(item => (
          <div className={style.list} key={item._id}>
            <FontAwesomeIcon
              icon={faCheckSquare}
              className={`${style.icon} ${style.iconCheck} ${item.status ? style.active : ''}`}
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
        ))
      }
    </div>
  )
}

export default List;