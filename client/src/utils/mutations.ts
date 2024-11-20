
import { gql } from '@apollo/client';

// Login Mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Add User Mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;



// Delete Country Mutation
export const DELETE_COUNTRY = gql`
  mutation deleteCountry($countryId: ID!) {
    deleteCountry(countryId: $countryId) {
      _id
      countryName
    }
  }
`;


// Delete Dish Mutation
export const DELETE_DISHES = gql`
  mutation deleteDishes($countryId: ID!, $dishId: ID!) {
    deleteDishes(countryId: $countryId, dishId: $dishId) {
      _id
      name
      dishes {
        _id
        name
      }
    }
  }
`;

// Update Country Mutation
export const UPDATE_COUNTRY = gql`
  mutation updateCountry($countryId: ID!, $input: CountryInput!) {
    updateCountry(countryId: $countryId, input: $input) {
      _id
      name
      notes
    }
  }
`;

export const ADD_USER_COUNTRY = gql`
mutation AddCountry($userId: ID!, $countryId: ID!) {
  addUserCountry(userId: $userId, countryId: $countryId) {
    countries {
      countryName
      dishes {
        dishName
      }
    }
    username
  }
}
`;

export const DELETE_USER_COUNTRY = gql`
mutation DeleteUserCountry($userId: ID!, $countryId: ID!) {
  deleteUserCountry(userId: $userId, countryId: $countryId) {
    countries {
      countryName
      dishes {
        dishName
      }
    }
    username
  }
}
`;