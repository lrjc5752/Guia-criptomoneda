import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';
//import PropTypes from 'prop-types';


const MensajeError = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.5rem;
    background-color:#b7322c;
    padding: 1rem;
    text-align: center;
   
`;

    const Error = ({mensaje}) => {
        return (
            <MensajeError>{mensaje}</MensajeError>
            );
              
    }
   
  

// Header.propTypes = {
//   titulo: PropTypes.string.isRequired
// };
export default Error;
