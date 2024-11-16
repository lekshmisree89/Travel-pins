//import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Country } from '../models/Country';

const UserProfile = () => {
  const { loading, error, data } = useQuery(GET_ME);

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {me.username}</p>
      <p>Email: {me.email}</p>

      <h2>Countries and Dishes</h2>
      {me.countries.length === 0 ? (
        <p>No countries saved.</p>
      ) : (
        me.countries.map((country: Country) => (
          <div key={country.name}>
            <h3>{country.name}</h3>
            {country.dishes.length === 0 ? (
              <p>No dishes saved for {country.name}.</p>
            ) : (
              <ul>
                {country.dishes.map((dish) => (
                  <li key={dish.name}>
                    <h4>{dish.name}</h4>
                    <p>{dish.description}</p>
                    {dish.image && <img src={dish.image} alt={dish.name} />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UserProfile;
