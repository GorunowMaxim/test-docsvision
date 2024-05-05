import camera from '/public/images/camera.svg';
import './styles.css';
import { DeleteEquip } from '../../utils/deleteEquipCard/DeleteEquip';
import { useState } from 'react';
import { UpdateEquipData } from '../../utils/updateEquipData/UpdateEquipData';
import pen from '/public/images/pen.svg';

import { UnusedCard } from '../unusedCard/UnusedCard';

interface ItemCardProps {
	id: string;
	name: string;
	count: string;
	isEditingEquipment: boolean;
	placeId: string;
}

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

export const EquipCardEntity = ({ id, name, count, isEditingEquipment, placeId }: ItemCardProps) => {
	const [formState, setFormState] = useState<boolean>(false);

	return isEditingEquipment ? (
		<div className='item-card'>
			{formState ? (
				<UpdateEquipData
					formState={formState}
					inputsConfig={inputsConfig}
					id={id}
					placeId={placeId}
					setFormState={setFormState}
				/>
			) : (
				<>
					<DeleteEquip id={id} />
					<div className='item-card__img-wrapper'>
						<img src={camera} alt='camera' />
					</div>
					<div className='item-card__info'>
						<div onClick={() => setFormState(!formState)} className='icon-wrapper icon-wrapper__update'>
							<img src={pen} alt='delete-icon' className='icon' />
						</div>
						<div className='item-card__name'>{name}</div>
						<div className='item-card__count'>{count}</div>
					</div>
				</>
			)}
		</div>
	) : (
		<UnusedCard name={name} count={count} />
	);
};
