import React from 'react';
import HeaderWrapper from '@components/singleRecipe/HeaderWrapper';
import BodyWrapper from '@components/singleRecipe/BodyWrapper';


const Recipe = ({ post }) => (
  <div className="flex flex-col items-start justify-start">
    {HeaderWrapper(post)}
    {BodyWrapper(post)}
  </div>
);

export async function getStaticPaths() {
  const res = await fetch('https://cookingapp-back.herokuapp.com/recipes');
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://cookingapp-back.herokuapp.com/recipes/${params.id}`);
  const post = await res.json();
  return { props: { post } };
}

export default Recipe;
