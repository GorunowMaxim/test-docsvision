import { MouseEvent, ReactNode } from 'react';
import { Building } from 'src/shared/types/types';

import './styles.css'

interface NavigationItemProps {
	building: Building;
	children?: ReactNode;
	setActiveTab: (str: string) => void;
	setIsEditingEquipment: (bol: boolean) => void;
	variant: 'bold' | 'regular';
	activeTab: string | undefined;
	filteredRoomsByEquip: Building[] | undefined;
}

export const NavigationItem = ({
	building,
	children,
	setActiveTab,
	setIsEditingEquipment,
	variant,
	activeTab,
	filteredRoomsByEquip,
}: NavigationItemProps) => {
	const headlineStyle = variant === 'bold' ? 'sidebar-navigation__item-headline_bold' : '';

	const isEditing = !building.parts ? true : false;

	const isCheck = filteredRoomsByEquip?.includes(building)
		? 'sidebar-navigation__item-headline_check'
		: 'sidebar-navigation__item-headline_cross';

	const liClassName =
		activeTab === building.id
			? 'sidebar-navigation__item sidebar-navigation__item_active'
			: 'sidebar-navigation__item';

	return (
		<li className={liClassName}>
			<p
				onClick={(e: MouseEvent<HTMLElement>) => {
					setActiveTab((e.target as HTMLElement).id);
					setIsEditingEquipment(isEditing);
				}}
				id={building.id}
				className={`sidebar-navigation__item-headline ${headlineStyle} ${building.parts ? '' : isCheck}`}
			>
				{building.data.name}
			</p>
			{children}
		</li>
	);
};
