import { useContext } from 'react';

import { loadingContext } from 'src/App';
import { deleteEquipment } from 'src/utils/fireBase';

import trash from '/public/images/trash.svg';
import './styles.css';
import toast from 'react-hot-toast';

export const DeleteEquip = ({ id }: { id: string }) => {
	const { setLoading } = useContext(loadingContext);
	
	const deleteEquip = (id: string) => {
		try {
			deleteEquipment(id);
			setLoading(true);
			toast.success('оборудование успешно удалено');
		} catch (error) {
			console.log(error);
			toast.error('что-то пошло не так');
		}
	};

	return (
		<div onClick={() => deleteEquip(id)} className='icon-wrapper'>
			<img src={trash} alt='delete-icon' className='icon' />
		</div>
	);
};
