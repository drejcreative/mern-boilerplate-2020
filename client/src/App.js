import React, { useContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Store from "./store/store";
import reducer from "./store/reducer";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ListWrapper from "./components/ListWrapper";

const App = () => {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      <Layout>
        <Routes>
          <Route path={"/list"} element={<ListWrapper />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Store.Provider>
  );
};

export default App;
