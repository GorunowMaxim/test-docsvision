import { ChangeEvent, FormEvent } from 'react';
import { InputsConfig } from 'src/shared/types/types';

import './styles.css'

interface EquipFormProps {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	inputsConfig: InputsConfig;
}

export const EquipForm = ({ onChange, onSubmit, inputsConfig }: EquipFormProps) => {
	return (
		<form onSubmit={onSubmit} className='item-card__form'>
			{Object.keys(inputsConfig).map((key) => {
				const inputData = inputsConfig[key];
				const inputClassName =
					inputData.type === 'number' ? 'item-card__input item-card__input_small' : 'item-card__input';
				return (
					<label key={key} className='item-card__label'>
						<p className='item-card__text'>{inputData.headline}</p>
						<input
							onChange={onChange}
							name={inputData.name}
							type={inputData.type}
							className={inputClassName}
						/>
					</label>
				);
			})}
			<input className='item-card__submit' type='submit' value={'добавить'} />
		</form>
	);
};
