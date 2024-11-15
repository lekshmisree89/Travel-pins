const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    country: [Country]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Country {
    _id: ID
    name: String
    dishes: [Dishes]!
    notes: String
    }

  type Dishes {
    _id: ID
    name: String
    }
  
  input CountryInput {
    name: String!
    notes: String
    }

  type Query {
    me: User
    countries: [Country]!
    country(countryId: ID!): Country
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    addCountry(input: CountryInput!): Country
    updateCountry(countryId: ID!, input: CountryInput!): Country
    deleteCountry(countryId: ID!): Country
    addDishes(countryId: ID!, name: String!): Country
    deleteDishes(dishId: ID!, countryID: ID!): Country
  }
`;

export default typeDefs;
