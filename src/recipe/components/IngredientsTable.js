import React from "react";

//import "./IngredientsTable.css";

const IngredientsTable = (props) => {
    return (
        <div className="ingredients-list">
            <table className="ingredients-table">
                <th className="ingredients-header" colSpan="2">
                    Ingredients
                </th>
                {props.ingredients.map((ingredient, indx) => {
                    return (
                        <tr key={indx}>
                            <td className="ingredient-name">
                                {ingredient.ingredientName}
                            </td>
                            <td className="ingredient-amount">
                                {ingredient.ingredientAmount}
                            </td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};

export default IngredientsTable;
