import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { EquipForm } from '../../../equipForm/EquipForm';
import close from '/public/images/close.svg';
import { InputsConfig } from 'src/shared/types/types';
import { updateEquipment } from 'src/utils/fireBase';
import { loadingContext } from 'src/App';
import toast from 'react-hot-toast';

interface UpdateEquipDataProps {
	id: string;
	placeId: string;
	formState: boolean;
	setFormState: (bol: boolean) => void;
	inputsConfig: InputsConfig;
}

export const UpdateEquipData = ({ formState, id, inputsConfig, placeId, setFormState }: UpdateEquipDataProps) => {
	const { setLoading } = useContext(loadingContext);

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
			updateEquipment(id, formData.name, formData.count, placeId);
			setLoading(true);
			toast.success('оборудование успешно изменено');
		} catch (error) {
			console.log(error);
			toast.error('оборудование успешно изменено');
		}
	};

	return (
		<>
			<div onClick={() => setFormState(!formState)} className='icon-wrapper'>
				<img src={close} alt='delete-icon' className='icon' />
			</div>
			<EquipForm onChange={handleChange} onSubmit={handleSubmit} inputsConfig={inputsConfig} />
		</>
	);
};
