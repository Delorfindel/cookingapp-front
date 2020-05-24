import React from 'react';
import _ from 'lodash';

const Ingredients = (e) => (
  <>
    <div className="sticky w-full mt-6 bg-white" style={{ top: '59px' }}>
      <p className="text-3xl capitalize variant font-variant">
        Ingrédients
      </p>
    </div>
    <ul className="list-disc list-inside">
      {_.map(e.Ingredients.data, (e) => (
        <li>{e}</li>
      ))}
    </ul>

  </>
);

export default Ingredients;
