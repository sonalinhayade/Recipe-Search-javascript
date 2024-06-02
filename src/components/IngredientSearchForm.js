import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../redux/slices/IngredientsSlice";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import secondImage from "../Images/second-image.jpg";
import "../App.css";

const IngredientSearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const loading = useSelector((state) => state.ingredients.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1223px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigateToRecipes(searchTerm);
  };

  const navigateToRecipes = (term) => {
    const filteredIngredients = ingredients.filter((ingredient) =>
      ingredient.strIngredient.toLowerCase().includes(term.toLowerCase())
    );
    if (filteredIngredients.length === 0) {
      navigate(`/no-recipe`);
    } else {
      navigate(`/recipes?ingredient=${term}&page=1`);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setSearchTerm("");
  };

  const handleArrowClick = (direction) => {
    const currentIndex = selectedLetter.charCodeAt(0) - 65;
    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + 26) % 26
        : (currentIndex + 1) % 26;
    setSelectedLetter(String.fromCharCode(65 + newIndex));
    setSearchTerm("");
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i} className="highlight">
              {part}
            </b>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = current.offsetWidth;
      current.scrollBy({
        top: 0,
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };


  const filteredIngredients = ingredients.filter((ingredient) =>
    searchTerm
      ? ingredient.strIngredient
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : ingredient.strIngredient
          .toLowerCase()
          .startsWith(selectedLetter.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <div className="left">
          <h1 className="title">Recipix</h1>
        </div>
        <div>
          <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com/food.com/">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://x.com/Insharamin/status/1501807738808160263">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/foodie.database/">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>

      </header>
      <div className="card-container">
        <div className="card">
          <div className="card-half card-text">
            <h2 className="title-card">
              Find Your Best Cooking Recipes <span>Here!</span>
            </h2>

            <p className="info">
              Behind every great dish lies a recipe — crafted with{" "}
              <span className="passion">passion</span>, seasoned with{" "}
              <span className="love">love</span>, and sprinkled with a dash of{" "}
              <span className="inspiration">inspiration</span>, transforming
              meals into cherished moments.
            </p>
            <div className="icon-container">
              <div className="icon-item">
                <i className="fas fa-book"></i>
                <h3>Over 100+</h3>
                <p>Recipes from around the world</p>
              </div>
              <div className="icon-item">
                <i className="fas fa-utensils"></i>
                <h3>Cooking Tips</h3>
                <p>to help you improve your cooking skills </p>
              </div>
              <div className="icon-item">
                <i className="fas fa-users"></i>
                <h3>Community</h3>
                <p>to share and get closer with people </p>
              </div>
            </div>
            <div className="button-container">
              <button className="explore-button">Explore Recipes</button>
            </div>
          </div>
          <div className="card-half card-image">
            <img src={secondImage} alt="Placeholder" />
          </div>
        </div>
      </div>
      <div className="title-details">
      <h1 >INGREDIENTS</h1>
      </div>
      <div className="header-content">
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Form className="search-form" onSubmit={handleSearch}>
                <div className="search-container">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search ingredients here..."
                    className="search-input"
                  />
                  <button
                    variant="outline-light"
                    className="search-button"
                    type="submit"
                  >
                    <FaSearch className="search-ingredient-button" />
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <div className="scrollable-card-ingredients">
              <div
                className="scroll-arrow left-arrow"
                onClick={() => scroll("left")}
              >
                &#9664;
              </div>
              <div
                className="ingredient-container-list"
                ref={scrollContainerRef}
              >
                <div className="ingredient-list">
                  {loading && <p>Loading...</p>}
                  {!loading &&
                    filteredIngredients.map((ingredient) => (
                      <div
                        key={ingredient.idIngredient}
                        className="ingredient-item"
                        onClick={() =>
                          navigateToRecipes(ingredient.strIngredient)
                        }
                      >
                        <img
                          src={ingredient.imageUrl}
                          alt={ingredient.strIngredient}
                          className="ingredient-image"
                        />
                        <div className="ingredient-name">
                          {getHighlightedText(
                            ingredient.strIngredient,
                            searchTerm
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div
                className="scroll-arrow right-arrow"
                onClick={() => scroll("right")}
              >
                &#9654;
              </div>
            </div>
          </Col>
        </Row>
        <div className="pagination">
          {isDesktopOrLaptop && (
            <div className="alphabet-pagination">
              {Array.from({ length: 26 }, (_, i) =>
                String.fromCharCode(65 + i)
              ).map((letter) => (
                <button
                  key={letter}
                  className={`pagination-button ${
                    selectedLetter === letter ? "active" : ""
                  }`}
                  onClick={() => handleLetterClick(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
          {isTablet && (
            <div className="alphabet-pagination">
              {Array.from({ length: 26 }, (_, i) =>
                String.fromCharCode(65 + i)
              ).map((letter) => (
                <button
                  key={letter}
                  className={`pagination-button ${
                    selectedLetter === letter ? "active" : ""
                  }`}
                  onClick={() => handleLetterClick(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
          {isMobile && (
            <div className="arrow-pagination">
              <div className="pagination-buttons">
                <button
                  className="pagination-arrow"
                  onClick={() => handleArrowClick("left")}
                >
                  <FaArrowLeft />
                </button>
                <span className="selected-letter">{selectedLetter}</span>
                <button
                  className="pagination-arrow"
                  onClick={() => handleArrowClick("right")}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default IngredientSearchForm;
