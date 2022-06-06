import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ImagenCriptos from './img/imagen-criptos.png';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	width: 90%;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		colum-gap: 2rem;
	}
`;

const Imagen = styled.img`
	max-width: 400px;
	width: 80%;
	margin: 100px auto 0 auto;
	display: block;
`;

const Heading = styled.h1`
	font-family: 'Lato', san-serif;
	color: #fff;
	text-align: center;
	font-weight: 700;
	margin-top: 80px;
	margin-bottom: 50px;
	font-size: 34px;

	&::after {
		content: '';
		width: 100px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
		margin: 10px auto 0 auto;
	}
`;

function App() {
	const [monedas, setMonedas] = useState({});
	const [resultado, setResultado] = useState({});
	const [cargando, setCargando] = useState(false);

	useEffect(() => {
		if (Object.keys(monedas).length > 0) {
			// Esto es para activar el spin de "Cargando"
			setCargando(true);

			setResultado({});

			// Como esto es una llamada a una API, se necesita de una función asíncrona.
			const cotizarCripto = async () => {
				const { moneda, criptomoneda } = monedas;

				const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

				const respuesta = await fetch(url);
				const resultado = await respuesta.json();

				setResultado(resultado.DISPLAY[criptomoneda][moneda]);

				// Esto es para desactivar el spin de "Cargando"
				setCargando(false);
			};

			cotizarCripto();

			return;
		}
	}, [monedas]);

	return (
		<div>
			<Contenedor>
				<Imagen src={ImagenCriptos} alt="ImagenCriptos" />

				<div>
					<Heading>Cotiza Criptomonedas Al Instante</Heading>

					<Formulario setMonedas={setMonedas} />

					{cargando && <Spinner />}

					{resultado.PRICE && <Resultado resultado={resultado} />}
				</div>
			</Contenedor>
		</div>
	);
}

export default App;
