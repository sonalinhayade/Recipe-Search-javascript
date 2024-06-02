import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import IngredientSearchForm from "./components/IngredientSearchForm.js";
import RecipeList from "./components/RecipeList.js";
import RecipeDetails from "./components/RecipeDetails.js";
import Breadcrumbs from "./components/Breadcrumbs.js";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
      <Breadcrumbs />
        <Routes>
          <Route path="/" element={<IngredientSearchForm />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
