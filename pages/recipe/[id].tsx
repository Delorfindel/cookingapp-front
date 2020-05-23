import React from 'react';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';

const CardWrapper = (e) => (
  <div className="flex flex-row items-center justify-between h-24 p-2 overflow-hidden bg-white shadow-lg rounded-xl">
    <div className="w-24 h-full">
      <img
        alt="recipes banner"
        className="object-cover w-full h-full rounded-xl"
        src={e.banner.url}
      />
    </div>
    <div className="flex flex-col items-start justify-start flex-1 w-full h-full pl-2">
      <p className="text-lg capitalize variant">
        {e.name}
      </p>

      <div className="flex flex-row items-center justify-start">
        <UserIcon
          width="12"
          height="12"
          className="mr-2"
        />
        <p className="capitalize primary">
          {e.user.username}
        </p>
      </div>
      <p className="text-sm grey">
        {`${e.difficulty} · ${e.temps}min`}
      </p>
    </div>
  </div>
);


const Recipe = ({ post }) => (
  <div>
    {CardWrapper(post)}
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
