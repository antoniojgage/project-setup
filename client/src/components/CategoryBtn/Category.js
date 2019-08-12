import React from 'react';
import './Category.css';
import Button from 'react-bootstrap/Button';



function Category() {
  return (
    <div>
      <Button as="input" type="button" value="Park" />
      <Button as="input" type="submit" value="Water" />
      <Button as="input" type="reset" value="Reset" />

    </div>
  );
} 

export default Category;