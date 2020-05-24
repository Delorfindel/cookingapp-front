import React from 'react';
import _ from 'lodash';


const SingleStep = (e, index) => {
  const lol = 0;
  console.log(e);

  return (
    <>
      <div className="sticky w-full mt-6 bg-white" style={{ top: '59px' }}>
        <p className="text-3xl capitalize variant font-variant">
          Étape
          {' '}
          {(index + 1).toString()}
          {e.title
         && (` : ${e.title}`)}
        </p>
      </div>
      <ul className="list-disc list-inside">
        {_.map(e.stepData, (e) => (
          <li className="">
            {e}
          </li>
        ))}
      </ul>

    </>
  );
};

const Etapes = (e) => (
  <>
    {
       _.map(e.Etapes.data, (e, index) => SingleStep(e, index))
    }
  </>
);

export default Etapes;
