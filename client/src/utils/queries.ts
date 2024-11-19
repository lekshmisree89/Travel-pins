import { gql } from '@apollo/client';

export const GET_ME = gql`
query Me {
  me {
    countries {
      _id
      countryName
    
      dishes {
        
        dishName
      }
    }
  }
}
`;

export const GET_COUNTRIES = gql`
  query countries {
    countries {
      _id
      countryName
      notes
      dishes {
        _id
        dishName
      }
    }
  }
`;

export const GET_COUNTRY_BY_NAME = gql`
  query GetCountryByName($countryName: String!) {
    countryByName(countryName: $countryName) {
      _id
      countryName
      notes
      dishes {
        _id
        dishName
      }
    }
  }
`;
    