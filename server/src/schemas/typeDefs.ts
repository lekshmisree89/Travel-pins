const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    countries: [Country]!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Country {
    _id: ID!
    name: String!
    notes: String
    dishes: [Dish]!
  }

  type Dish {
    _id: ID!
    name: String!
  }

  input CountryInput {
    name: String!
    notes: String
  }

  type Query {
    # Get current logged-in user
    me: User

    # Get all countries
    countries: [Country]!

    # Get a specific country by ID
    country(countryId: ID!): Country
  }

  type Mutation {
    # User authentication
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

 
    addCountry(input: CountryInput!): Country
    updateCountry(countryId: ID!, input: CountryInput!): Country
    deleteCountry(countryId: ID!): Country


    addDishes(countryId: ID!, name: String!): Country
    deleteDishes(dishId: ID!, countryId: ID!): Country
  }
`;

export default typeDefs;
