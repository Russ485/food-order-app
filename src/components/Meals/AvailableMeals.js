import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
//import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-project-f5031-default-rtdb.firebaseio.com/meals.json/'
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Request failed!');
      }
      const loadedMeals = [];

      for (const mealKey in data) {
        loadedMeals.push({
          id: mealKey,
          name: data[mealKey].name,
          description: data[mealKey].description,
          price: data[mealKey].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  let mealList = meals.map(meal => (
    <MealItem
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
      key={meal.id}
    />
  ));

  if (isLoading) {
    mealList = <p>Loading meals...</p>;
  }

  if (error) {
    mealList = <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
