import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../Hooks/useMoneda';
import useCriptomoneda from '../Hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

//import PropTypes from 'prop-types';

 const Boton = styled.input`
        margin-top: 20px;
        background-color: #66a2fe;
        padding: 10PX;
        font-weigth: bold;
        color: #FFF;
        font-size: 20px;
        border: none;
        width: 100%;
        border-radius: 10px;
        transition: background-color .3s ease;
        &:hover {
            background-color: #326AC0;
            cursor: pointer;
        }
 `;
// const TextoHeader = styled.h1`
//        font-size: 2rem;
//        margin: 0;
//        font-family: 'Slabo 27px', serif;
//        text-align: center;
// `;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) =>  { 

// state del listado de criptomonedas
const [listacripto, guardarCriptomonedas] = useState([]);
const [error,guardarError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre:'Dolar de Estados Unidos' },
        {codigo: 'MXN', nombre:'Peso Mexicano' },
        {codigo: 'EUR', nombre:'Euro' },
        {codigo: 'GBP', nombre:'Libra Esterlina' },
        {codigo: 'ARS', nombre:'Peso Argentino' },
        {codigo: 'BRL', nombre:'Real Brasileño' },
        {codigo: 'VES', nombre:'Bolivar Venezolano' }
    ];

    // utilizar useMoneda, importa es la posicion del state,no los nombres
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda','',MONEDAS);
    

    // utilizar useCriptomoneda

    const [criptomoneda,SelectCripto] = useCriptomoneda('Elige tu Criptomoneda','',listacripto);

    // ejecutar llamado a la Api
    useEffect(() =>{
        const consultarApi = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    },[]);

// cuando el usuario hace submit
        const cotizarMoneda = evento  => {
            evento.preventDefault();

            // validar si ambos campos estan llenos
            if (moneda === '' || criptomoneda === '') {
                guardarError(true);
                return
            };
            // pasar los datos al componente principal
            guardarError(false);
            guardarMoneda(moneda);
            guardarCriptomoneda(criptomoneda);
            
        };
    return (
        <form
            onSubmit = {cotizarMoneda}
        >
            {error ? <Error mensaje = 'Todos los campos son obligatorios'/> : null}
            <SelectMonedas/>
            <SelectCripto/>
            <Boton
            type = 'submit'
            value = 'Calcular'
            />
        </form>
    );
}
      
  

// Header.propTypes = {
//   titulo: PropTypes.string.isRequired
// };
export default Formulario;
