import { gql } from '@apollo/client';

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

export const ADD_COUNTRY = gql`
mutation addCountry($name: String!, $dishes: [String]!, $notes: String) {
  addCountry(name: $name, dishes: $dishes, notes: $notes) {
    name
    dishes
    notes
  }
}
`;

export const ADD_DISHES = gql`
mutation addDish($countryId: ID!, $name: String!, $notes: String) {
  addDish(countryId: $countryId, name: $name, notes: $notes) {
    name
    notes
  }
}
`;

export const DELETE_COUNTRY = gql`
mutation removeCountry($countryId: ID!) {
  removeCountry(countryId: $countryId) {
    name
  }
}
`;

export const DELETE_DISHES = gql`
mutation removeDish($countryId: ID!, $dishId: ID!) {
  removeDish(countryId: $countryId, dishId: $dishId) {
    name
  }
}
`;


export const UPDATE_COUNTRY = gql`
mutation updateCountry($countryId: ID!, $name: String!) {
  updateCountry(countryId: $countryId, name: $name) {
    name
  }
}
`;
