import { gql, useMutation } from '@apollo/client';

const ADD_TO_FAVORITES = gql`
mutation addToFavorite($id: ID!, $recipeID: [ID!]) {
    updateUser(
      input: {
        where: { id: $id }
        data: { 
          favorites : $recipeID
        }
      }
    ) {
      user {
        favorites {
          id
        }
      }
    }
  }
  
`;

export default ADD_TO_FAVORITES;
