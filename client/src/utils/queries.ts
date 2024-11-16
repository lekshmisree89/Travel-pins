import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      countries {
        _id
        name
        notes
        dishes {
          _id
          name
        }
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query countries {
    countries {
      _id
      name
      notes
      dishes {
        _id
        name
      }
    }
  }
`;