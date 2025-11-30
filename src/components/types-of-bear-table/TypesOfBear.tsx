import React from 'react';

export const TypesOfBear: React.FC = () => {
  return (
    <>
      <h3>Types of bear</h3>
      <table>
        <caption>Comparison of Bear Types</caption>
        <thead>
          <tr>
            <th scope="col">Bear Type</th>
            <th scope="col">Coat</th>
            <th scope="col">Adult size</th>
            <th scope="col">Habitat</th>
            <th scope="col">Lifespan</th>
            <th scope="col">Diet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wild</td>
            <td>Brown or black</td>
            <td>1.4 to 2.8 meters</td>
            <td>Woods and forests</td>
            <td>25 to 28 years</td>
            <td>Fish, meat, plants</td>
          </tr>
          <tr>
            <td>Urban</td>
            <td>North Face</td>
            <td>18 to 22</td>
            <td>Condos and coffee shops</td>
            <td>20 to 32 years</td>
            <td>Starbucks, sushi</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
