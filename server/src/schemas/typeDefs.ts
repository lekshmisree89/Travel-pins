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
    _id: ID
    countryName: String
    dishes: [Dishes]!
    notes: String
  }

  type Dish {
    _id: ID!
    name: String!
  }

  type Dishes {
    _id: ID
    dishName: String
  }
  
  input CountryInput {
    countryName: String!
    notes: String
  }

  type Query {
    # Get current logged-in user
    me: User

    # Get all countries
    countries: [Country]!

    # Get a specific country by ID
    country(countryId: ID!): Country

    # Get a country by name
    countryByName(countryName: String!): Country
  }

  type Mutation {
    # User authentication
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

 
    addCountry(input: CountryInput!): Country
    updateCountry(countryId: ID!, input: CountryInput!): Country
    deleteCountry(countryId: ID!): Country
    addDishes(countryId: ID!, dishName: String!): Country
    deleteDishes(countryId: ID!, dishId: ID!): Country
    addUserCountry(userId: ID!, countryId: ID!): User
    deleteUserCountry(userId: ID!, countryId: ID!): User
  }
`;

export default typeDefs;