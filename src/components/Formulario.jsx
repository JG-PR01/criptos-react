import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas.jsx';
import { monedas } from '../data/monedas.jsx';
import Error from './Error.jsx';

const ImputSubmit = styled.input`
	background-color: #9497ff;
	border: none;
	width: 100%;
	padding: 10px;
	margin-top: 30px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #7a7dfe;
		cursor: pointer;
	}
`;

const Formulario = ({ setMonedas }) => {
	const [criptos, setCriptos] = useState([]);

	const [error, setError] = useState(false);

	const [moneda, SelectMonedas] = useSelectMonedas('Elige Tu Moneda', monedas);
	const [criptomoneda, SelectCriptomonedas] = useSelectMonedas(
		'Elige Tu Criptomoneda',
		criptos
	);

	useEffect(() => {
		const consultarAPI = async () => {
			const url =
				'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			const arrayCriptos = resultado.Data.map((cripto) => {
				const objeto = {
					id: cripto.CoinInfo.Name,
					nombre: cripto.CoinInfo.FullName,
				};

				return objeto;
			});

			setCriptos(arrayCriptos);
		};
		consultarAPI();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([moneda, criptomoneda].includes('')) {
			setError(true);

			// Es obligatorio tener este return aquí, para que rompa el condicional en cuanto se termine de leer o pase la validación.
			return;
		}

		setError(false);

		setMonedas({
			moneda,
			criptomoneda,
		});
	};

	return (
		<div>
			{error && <Error>Todos los campos son obligatorios</Error>}

			<form onSubmit={handleSubmit}>
				<SelectMonedas />
				<SelectCriptomonedas />

				<ImputSubmit type="submit" value="Cotizar" />
			</form>
		</div>
	);
};

export default Formulario;
