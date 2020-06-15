import { gql, useMutation } from '@apollo/client';

const GET_USER_RECIPES = gql`
query RecipesOfUser($id: ID!) {
  user(id: $id) {
        id
        username
        ownedrecipes {
          id
          name
          banner {
            url
          },
          temps,
          difficulty,
          note
        }
      }
    }
`;

export default GET_USER_RECIPES;
