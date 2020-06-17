import React, { useState, useEffect } from 'react';
import {
  gql, useQuery, useLazyQuery, useMutation,
} from '@apollo/client';
import { getApolloClient } from '@lib/getApolloClient';
import { ReactComponent as UserIcon } from '@public/svg/bottom-user.svg';
import AuthService from '@services/auth';
import { useAuthContext } from '@contexts/AuthContext';
import Router from 'next/router';
import Axios from 'axios';


const UPDATE_USER = gql`
mutation updateUser($userId: ID!, $inputData: editUserInput!) {
  updateUser(
    input: {
      where: { id: $userId }
      data: $inputData
    }
  ) {
    user {
      username,
      description
      avatar {
        name
        url
        ext
      }
    }
  }
}
`;

// const UPLOAD_AVATAR = gql`
// mutation ($file: Upload!, $refId: ID) {
//   upload(
//     file: $file
//     refId: $refId
//     ref: "user"
//     field: "avatar"
//   ) {
//     name
//     url
//     mime
//     provider
//   }
// }
// `;

export default function EditProfile({ user }) {
  // const [uploadAvatar, { uploadAvatardata }] = useMutation(UPLOAD_AVATAR);
  const [updateUser, updateUserData] = useMutation(UPDATE_USER);
  const [image, setImage] = useState({ path: '', formData: null });
  const [input, setInput] = useState({
    username: user?.username,
    description: user?.description,
    avatar: user?.avatar?.url,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image.formData) {
      Axios.post('http://localhost:1337/upload', image.formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then((res) => {
        updateUser({
          variables: {
            userId: user.id,
            inputData: {
              username: input.username,
              description: input.description,
              avatar: res.data[0].id,
            },
          },
        }).then((update) => Router.push('/profile'));
      });
    } else {
      updateUser({
        variables: {
          userId: user.id,
          inputData: {
            username: input.username,
            description: input.description,
          },
        },
      }).then((update) => Router.push('/profile'));
    }
  };

  const handleImage = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('files', img);
    setImage({ path: URL.createObjectURL(img), formData });
  };

  return (
    <div className="w-full flex flex-col px-4">
      <p className="text-lg mb-4 self-center">Éditer le profile</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row mb-4">
          {!user?.avatar?.url ? (
            <div className="flex flex-col items-center justify-center w-16 h-16 border-2 rounded-full shadow-lg cursor-pointer border-primary">
              <UserIcon
                width="30"
                height="30"
                fill="#fe7753"
              />
            </div>
          )
            : (
              <img
                alt="avatar"
                className="w-16 h-16 rounded-full shadow-xl"
                src={image.path || input.avatar}
              />
            )}
          <div className="ml-4 flex flex-col">
            <p className="capitalize primary text-xl">
              {user?.username}
            </p>
            <button type="button" className="px-3 py-1 border border-current rounded-lg">
              <label htmlFor="file">
                Changer la photo de profile
                <input type="file" id="file" className="hidden" onChange={handleImage} accept="image/*" />
              </label>
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label className="text-gray-700 text-lg block mb-1" htmlFor="username">
            Username
            <input
              className="w-full font-light text-gray-600 text-md py-1 px-2 border border-current rounded-lg"
              value={input.username}
              id="username"
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="text-gray-700 text-lg block mb-1" htmlFor="bio">
            Bio
            <textarea
              id="bio"
              className="w-full text-gray-600 font-light text-md py-1 px-2 border border-current rounded-lg"
              value={input.description}
              onChange={(e) => setInput({ ...input, description: e.target.value })}
            />
          </label>
        </div>
        <div className="flex flex-row justify-end">
          <button type="submit" className="px-3 py-1 rounded-xl text-white mr-2" style={{ backgroundColor: '#fe7753' }}>
            <p className="text-md">Enregistrer</p>
          </button>
          <button type="button" className="primary" onClick={(e) => Router.push('/login')}>Retour</button>
        </div>
      </form>
    </div>
  );
}


export function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);

  return auth.me(token).then(async (user: any) => ({ props: { user: { ...user, token } } }))
    .catch((err) => {
      ctx.res.writeHeader(307, { Location: '/login' });
      ctx.res.end();
    });
}
