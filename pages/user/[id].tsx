import React from 'react';
import HeaderWrapper from "@components/user/HeaderWrapper";

const User = ({ user }) => (  
  <>
    {HeaderWrapper(user)}
    {/* {BodyWrapper(user)} */}
  </>
);

export async function getStaticPaths() {
  const res = await fetch('https://cookingapp-back.herokuapp.com/users');
  const user = await res.json();
  const paths = user.map((user) => ({
    params: {
      id: user.id
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://cookingapp-back.herokuapp.com/users/${params.id}`);
  const user = await res.json();

  return { props: { user } };
}

export default User;
