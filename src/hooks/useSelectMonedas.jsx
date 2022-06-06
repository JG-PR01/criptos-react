import { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
	color: #fff;
	display: block;
	font-family: 'Lato', sans-serif;
	font-size: 24px;
	font-weight: 700;
	margin: 15px 0;
`;

const Select = styled.select`
	width: 100%;
	font-size: 18px;
	padding: 14px;
	border-radius: 10px;
	text-align: center;
`;

const useSelectMonedas = (label, option) => {
	const [state, setState] = useState('');

	const SelectMonedas = () => (
		<>
			<Label htmlFor="monedas">{label}</Label>
			<Select
				name="monedas"
				value={state}
				onChange={(e) => setState(e.target.value)}
			>
				<option value="">-- Seleccione --</option>
				{option.map((option) => (
					<option value={option.id} key={option.id}>
						{option.nombre}
					</option>
				))}
			</Select>
		</>
	);

	return [state, SelectMonedas];
};

export default useSelectMonedas;
