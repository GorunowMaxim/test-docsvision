import { ReactNode } from 'react';
import camera from '/public/images/camera.svg';

interface UnusedCardProps {
	name: string;
	count: string;
	children?: ReactNode;
}

export const UnusedCard = ({ name, count, children }: UnusedCardProps) => {
	return (
		<div className='item-card'>
			<div className='item-card__img-wrapper'>
				<img src={camera} alt='camera' />
			</div>
			<div className='item-card__info'>
				{children}
				<div className='item-card__name'>{name}</div>
				<div className='item-card__count'>{count}</div>
			</div>
		</div>
	);
};
