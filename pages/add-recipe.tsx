/* eslint-disable object-curly-newline */
/* eslint-disable eqeqeq */
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  gql, useQuery, useLazyQuery, useMutation,
} from '@apollo/client';
import { getApolloClient } from '@lib/getApolloClient';
import { ReactComponent as MinusIcon } from '@public/svg/minus.svg';
import { ReactComponent as EditIcon } from '@public/svg/pencil.svg';
import { ReactComponent as PlusIcon } from '@public/svg/bottom-plus.svg';
import AuthService from '@services/auth';
import Router from 'next/router';

const BannerUpload = ({ handleBanner }) => (
  <button type="button" className="border-4 border-dashed rounded-lg h-40 w-full">
    <label htmlFor="banner" className="h-full w-full flex justify-center items-center">
      <p className="inline-block text-gray-500 font-light text-lg ">Ajouter une bannière</p>
      <input type="file" id="banner" className="hidden" onChange={handleBanner} accept="image/*" />
    </label>
  </button>
);

const BannerPreview = ({ banner, handleBanner }) => (
  <div className="relative">
    <button type="button" className="p-2 m-2 bg-white rounded-full shadow-lg absolute " style={{ top: -15, left: -15 }}>
      <label htmlFor="banner">
        <EditIcon
          width="15"
          height="15"
          fill="#fe7753"
          className="primary"
        />
        <input type="file" id="banner" className="hidden" onChange={handleBanner} accept="image/*" />
      </label>
    </button>
    <img alt="banner" className="h-40 w-full object-cover rounded-lg shadow-xl" src={banner} />
  </div>
);

const GaleryItemUpload = ({ idx, handleGalery }) => (
  <button key={idx} type="button" className="border-2 border-dashed rounded-lg h-20">
    <label htmlFor={`galery-${idx}`} className="h-full w-full flex justify-center items-center">
      <input type="file" id={`galery-${idx}`} className="hidden" onChange={(e) => handleGalery(e, idx)} accept="image/*" />
    </label>
  </button>
);

const GaleryItemPreview = ({ src }) => (
  <div className="relative">
    <div className="p-1 m-2 bg-white rounded-full shadow-lg absolute " style={{ top: -12, left: -12 }}>
      <MinusIcon
        width="7"
        height="7"
        fill="red"
      />
    </div>
    <img alt="banner" className="h-20 w-full object-cover rounded-lg shadow-xl" src={src} />
  </div>
);

const IngredientWrapperInput = ({ value, addIngredient, setIngredient }) => (
  <div className="relative mb-2">
    <button
      type="button"
      className="absolute py-1 px-2 h-full"
      style={{ right: 0 }}
      onClick={addIngredient}
    >
      <PlusIcon
        width="20"
        height="20"
        fill="#fe7753"
      />
    </button>
    <input
      className="w-full text-gray-600 font-light text-md py-1 px-2 border border-current rounded-lg"
      value={value}
      onChange={(e) => setIngredient(e.target.value)}
    />
  </div>
);

const IngredientWrapperStore = ({ idx, removeIngredient, value }) => (
  <div key={idx} className="flex  my-1 mx-2 border border-current rounded-lg bg-gray-100">
    <p
      className="text-gray-600 font-light text-md py-1 px-2"
    >
      {value}
    </p>
    <button
      type="button"
      className="py-1 pr-2"
      onClick={() => removeIngredient(idx)}
    >
      <MinusIcon
        width="10"
        height="20"
        fill="red"
      />
    </button>
  </div>
);

const StepWrapperInput = ({ idx, addStep }) => {
  const [input, setInput] = useState('');

  return (
    <div className="flex justify-between mb-2">
      <input
        placeholder="Étape"
        className="w-full text-gray-600 font-light text-md py-1 px-2 border border-current rounded-lg"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button
        type="button"
        className="py-1 px-2"
        style={{ right: 0 }}
        onClick={() => {
          setInput('');
          addStep(idx, input);
        }}
      >
        <PlusIcon
          width="20"
          height="20"
          fill="#fe7753"
        />
      </button>
    </div>
  );
};

const StepWrapperStore = ({ idx, removeStep, value, stepIdx }) => (
  <div key={idx} className="flex  my-1 mx-2 border border-current rounded-lg bg-gray-100">
    <p
      className="text-gray-600 font-light text-md py-1 px-2"
    >
      {value}
    </p>
    <button
      type="button"
      className="py-1 pr-2"
      onClick={() => removeStep(stepIdx, idx)}
    >
      <MinusIcon
        width="10"
        height="20"
        fill="red"
      />
    </button>
  </div>
);


export default function addRecipe({ user }) {
  const [recipe, setRecipe] = useState({
    nom: null,
    description: null,
    ingredients: [],
    etapes: [{ title: '', steps: [] }],
  });
  const [banner, setBanner] = useState({ path: null, formData: null });
  const [galery, setGalery] = useState(_.times(3, _.constant({ path: null, formData: null })));
  const [ingredientInput, setIngredientInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(recipe);
  };

  const onChangeText = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleBanner = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('files', img);
    setBanner({ path: URL.createObjectURL(img), formData });
  };

  const addToGalery = (e, idx) => {
    const img = e.target.files[0];
    const formData = new FormData();
    const toAppend = { path: URL.createObjectURL(img), formData };
    const tmp = galery;

    tmp.splice(idx, 1, toAppend);
    setGalery([...tmp]);
  };

  const removeGaleryItem = (idx) => {
    _.remove(galery, (e, i) => i == idx);
    setGalery({ ...galery });
  };

  const addIngredient = () => {
    setIngredientInput('');
    if (ingredientInput !== '') setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredientInput] });
  };

  const removeIngredient = (idx) => {
    _.remove(recipe.ingredients, (e, i) => i == idx);
    setRecipe({ ...recipe });
  };

  const addStep = (idx, str) => {
    const tmpStep = recipe.etapes;

    if (str !== '') {
      tmpStep.splice(idx, 1, { title: recipe.etapes[idx].title, steps: [...recipe.etapes[idx].steps, str] });
      setRecipe({ ...recipe, etapes: tmpStep });
    }
  };

  const removeStep = (stepIdx, idx) => {
    _.remove(recipe.etapes[stepIdx].steps, (e, i) => i == idx);
    setRecipe({ ...recipe });
  };

  const addStepper = () => {
    setRecipe({ ...recipe, etapes: [...recipe.etapes, { title: '', steps: [] }] });
  };

  useEffect(e => {
    console.log(recipe.etapes);
  });

  return (
    <div className="w-full flex flex-col px-4 pb-10">
      <p className="text-xl mb-4 self-center">Votre nouvelle recette !</p>
      <form onSubmit={handleSubmit}>
        {
          banner.path === null ? <BannerUpload handleBanner={handleBanner} />
            : <BannerPreview banner={banner.path} handleBanner={handleBanner} />
        }
        <div className="py-4 flex flex-col">
          <p className="text-gray-700 text-lg mb-1">Galerie</p>
          <div className="grid grid-cols-3 gap-5 lg:grid-cols-3 xl:grid-cols-5 mb-3">
            {
              _.map(galery, (e, idx) => (
                !e.path ? <GaleryItemUpload idx={idx} handleGalery={addToGalery} />
                  : <GaleryItemPreview src={e.path} />
              ))
            }
          </div>
          <button type="button" className="self-center rounded-lg px-2" onClick={() => setGalery([...galery, { path: null, formData: null }])}>
            <p className="font-light text-xs text-gray-500">+ Ajouter plus d'images</p>
          </button>
        </div>
        <div className="">
          <div className="mb-3">
            <p className="text-gray-700 text-lg mb-1">Nom de la recette</p>
            <input
              className="w-full font-light text-gray-600 text-md py-1 px-2 border border-current rounded-lg"
              name="nom"
              onChange={onChangeText}
              required
              maxLength={30}
            />
          </div>
          <div className="mb-3">
            <p className="text-gray-700 text-lg mb-1">Description</p>
            <textarea
              className="w-full text-gray-600 font-light text-md py-1 px-2 border border-current rounded-lg"
              name="description"
              onChange={onChangeText}
              required
            />
          </div>
          <div className="mb-3 flex flex-col">
            <p className="text-gray-700 text-lg mb-1">Ingrédiants</p>
            <IngredientWrapperInput
              value={ingredientInput}
              setIngredient={setIngredientInput}
              addIngredient={addIngredient}
            />
            <div className="flex flex-wrap">
              {
                _.map(recipe.ingredients, (e, i) => (
                  <IngredientWrapperStore idx={i} removeIngredient={removeIngredient} value={e} />
                ))
              }
            </div>
          </div>
          <div className="mb-3 flex flex-col">
            <div className="shadow-lg p-3 rounded-lg flex flex-col mb-2">
              <p className="text-gray-700 text-lg mb-1">Étapes</p>
              {
                _.map(recipe.etapes, (e, i) => (
                  <div className="mb-4 flex flex-col">
                    <p className="self-center px-2  rounded-full border mb-2">{i + 1}</p>
                    <input
                      className="w-full text-gray-600 justify-left font-light text-md py-1 px-2 border border-current rounded-lg mb-2"
                      placeholder="Titre"
                      onChange={(e) => {
                        const r = recipe.etapes;
                        r.splice(i, 1, { title: e.target.value, steps: recipe.etapes[i].steps });
                        setRecipe({ ...recipe, etapes: r });
                      }}
                    />
                    <StepWrapperInput idx={i} addStep={addStep} />
                    <div className="flex flex-wrap">
                      {
                        _.map(e.steps, (s, idx) => (
                          <StepWrapperStore idx={idx} value={s} removeStep={removeStep} stepIdx={i} />
                        ))
                      }
                    </div>
                  </div>
                ))
              }
              <button type="button" className="self-end rounded-lg px-2" onClick={() => addStepper()}>
                <p className="font-light text-xs text-gray-500">+ Ajoutez une étape</p>
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-end mt-4">
            <button type="submit" className="px-3 py-1 rounded-xl text-white mr-2" style={{ backgroundColor: '#fe7753' }}>
              <p className="text-md">Terminez !</p>
            </button>
            <button type="button" className="primary" onClick={() => Router.push('/profile')}>Retour</button>
          </div>
        </div>
      </form>
    </div>
  );
}


export function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);

  return auth.me(token).then(async (user: any) => ({ props: { user: { ...user, token } } }))
    .catch(() => {
      ctx.res.writeHeader(307, { Location: '/login' });
      ctx.res.end();
    });
}
