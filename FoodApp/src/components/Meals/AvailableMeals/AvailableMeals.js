import { useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        'https://react-tutorial-aa15b-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong - Request failed');
      }

      const data = await response.json();

      const mealsData = [];
      for (let key in data) {
        mealsData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(mealsData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            meals.map((meal) => (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
