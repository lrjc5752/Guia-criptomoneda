import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './new-york.jpg';
import imagen1 from './bitcoin.jpg';
import imagen2 from './cripto.jpg';
import Formulario from './components/Formulario'
import axios from 'axios';
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media (min-width:992px){
      display: grid;
      grid-template-columns: repeat(2,1fr);
      column-gap: 2rem;
    }
`;

const Imagen = styled.img`
    max-width: 100%;
    margin-top: 2rem;
`;
const Imagen1 = styled.img`
    max-width: 100%;
    margin-top: 2rem;
`;
const Imagen2 = styled.img`
    max-width: 100%;
    margin-top: 2rem;
`;
const Heading = styled.h1`
font-family: 'Bebas Neue', cursive;
color: #FFF;
text-align: left;
font-weight: 700;
font-size: 50px;
margin-bottom: 50px;
margin-top: 80px;
&::after{ 
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
}
`;


function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda,guardarCriptomoneda] = useState('');
  const [resultado,guardarResultado] = useState({});
  const [cargando,guardarCargando] = useState(false);   // para el  Spinner

  useEffect (() =>{

    const cotizarCriptomoneda = async () => {

          // evitamos la ejecucion la primera vez
        if (moneda === '') return;

        // consultar la Api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url);

        // mostrar el Spinner
        guardarCargando(true);

        // ocultar el Spinner y mostrar el resultado
        setTimeout(() => {

          // cambiar el estado de cargando
          guardarCargando(false);

          // guardar cotizacion
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        },3000);

        
    };
    cotizarCriptomoneda();
  },[moneda,criptomoneda]);

  // mostrar Spinner o resultado
    const componente = (cargando) ? <Spinner/> :  <Cotizacion resultado = {resultado} />

  return (
    <Contenedor>
        <div>
          <Imagen
            src = {imagen}
            alt = 'imagen cripto'
          />
          <Imagen1
            src = {imagen1}
            alt = 'imagen cripto'
          />
          <Imagen2
            src = {imagen2}
            alt = 'imagen cripto'
          />
        </div>
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
            guardarMoneda = {guardarMoneda}
            guardarCriptomoneda = {guardarCriptomoneda}
        />
          {componente}
        </div>
    </Contenedor>
  );
}

export default App;
