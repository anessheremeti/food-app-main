import React from "react";
import Card from "../UI/Card";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import foodImage from "../../Img/meals.jpg"; // import the image file
import MealsSummarry from "../Meals/MealsSummary";
import MealItem from "../Meals/MealItem";
import DUMMY_MEALS from "../Meals/dummy-meals";

const Header = (props) => {

  

  const mealItems = DUMMY_MEALS.map((meal) => {
    return (
        <MealItem
          key = {meal.id}
          id = {meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
    );
  });
  return (
    <Card>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton  onClick = {props.onShowCart}/>
      </header>
      <div className={styles['main-image']}>
        <img src={foodImage} className={styles.main_image} alt="Food" />
      </div>
      <MealsSummarry />
      <ul className={styles.meal_items}>{mealItems}</ul>
    </Card>
  );
};

export default Header;