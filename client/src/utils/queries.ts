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
        dishes {
          _id
          name
          description
          image
        }
      }


    }
  }
`;

