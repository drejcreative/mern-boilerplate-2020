import React, { useContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Store from "./store/store";
import reducer from "./store/reducer";
import Layout from "./components/Layout";
import Home from "./components/Home";
import { Form, FormList } from "./components/Form";
import Receipt from "./components/Receipt/Receipt";
import Header from "./components/Header";
import { Page404 } from "./constants";

const App = () => {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/newform"} element={<Form />} />
          <Route path={"/editform/:formNo"} element={<Form isEdit />} />
          <Route path={"/formlist"} element={<FormList />} />
          <Route path={"/newreceipt"} element={<Receipt />} />
          <Route
            path={"*"}
            element={
              <>
                <Header header={Page404} />
              </>
            }
          />
        </Routes>
      </Layout>
    </Store.Provider>
  );
};

export default App;
