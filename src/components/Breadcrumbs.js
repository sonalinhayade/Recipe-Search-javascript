import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  let currentLink = '';

  const crumbs = pathnames.map((name, index) => {
    currentLink += `/${name}`;
    const isLast = index === pathnames.length - 1;
    const readableName = name.replace(/-/g, ' ');

    if (name === "recipe") {
      // If on a recipe page, show "Recipe Details" instead of ID
      return (
        <div className="crumb" key={index}>
          <Link to="/recipes">Recipe List</Link>
        </div>
      );
    } else if (name === "details") {
      // If on recipe details page, show "Recipe Details"
      return (
        <div className="crumb" key={index}>
          <span>Recipe Details</span>
        </div>
      );
    } else {
      return (
        <div className="crumb" key={index}>
          {isLast ? (
            <span>{readableName}</span>
          ) : (
            <Link to={currentLink}>{readableName}</Link>
          )}
        </div>
      );
    }
  });

  return (
    <div className="breadcrumbs">
      <div className="crumb">
        <Link to="/">Home</Link>
      </div>
      {/* If on recipe list page, do not display last breadcrumb */}
      {pathnames[pathnames.length - 1] !== "recipe" && crumbs}
    </div>
  );
};

export default Breadcrumbs;
