import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import plus from '/public/images/plus.svg';
import close from '/public/images/close.svg';

import { addEquipment } from 'src/utils/fireBase';
import { EquipForm } from '../../../equipForm/EquipForm';
import { loadingContext } from 'src/App';
import toast from 'react-hot-toast';

const inputsConfig = {
	name: {
		name: 'name',
		type: 'text',
		headline: 'кажите название оборудования',
	},
	count: {
		name: 'count',
		type: 'number',
		headline: 'Укажите количество',
	},
};

export const AddEquipCard = ({ place }: { place: string }) => {
	const { setLoading } = useContext(loadingContext);
	const [formState, setFormState] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		name: '',
		count: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			addEquipment(formData.name, formData.count, place);
			setLoading(true);
			setFormState(!formState);
			toast.success('оборудование успешно добавлено');
		} catch (error) {
			console.log(error);
			toast.error('что-то пошло не так');
		}
	};

	return (
		<div className='item-card'>
			{formState ? (
				<>
					<div onClick={() => setFormState(!formState)} className='icon-wrapper'>
						<img src={close} alt='delete-icon' className='icon' />
					</div>
					<EquipForm onChange={handleChange} onSubmit={handleSubmit} inputsConfig={inputsConfig} />
				</>
			) : (
				<div onClick={() => setFormState(!formState)} className='item-card__img-wrapper'>
					<img src={plus} alt='camera' />
				</div>
			)}
		</div>
	);
};
