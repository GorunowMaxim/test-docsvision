import { Building, Equip } from 'src/shared/types/types';
import { EquipCardEntity } from '../../equipCard';
import { AddEquipCard } from '../../equipCard/utils/addEquipCard/AddEquipCard';
import { findAllParts } from '../utils/findAllParts';

import './styles.css';

interface TabContainerProps {
	data: Building[] | undefined;
	activeTab: string | undefined;
	equip: Equip[] | undefined;
	isEditingEquipment: boolean;
}

export const TabContainer = ({ data, activeTab, equip, isEditingEquipment }: TabContainerProps) => {
	const activeTabContainer: Building | undefined = data?.find((building) => building.id === activeTab);
	const relatedParts = activeTabContainer && activeTab ? findAllParts(activeTabContainer, data, activeTab) : [];

	return (
		<>
			{data?.map((el) => {
				return (
					<div
						key={el.id}
						className={el.id === activeTab ? 'tab-container tab-container_visible' : 'tab-container'}
					>
						{equip?.map(
							(equipItem) =>
								equipItem.placeId &&
								relatedParts.includes(equipItem.placeId) && (
									<EquipCardEntity
										key={equipItem.id}
										id={equipItem.id}
										name={equipItem.data.name}
										count={equipItem.data.count}
										isEditingEquipment={isEditingEquipment}
										placeId={equipItem.placeId}
									/>
								)
						)}
						{isEditingEquipment ? <AddEquipCard place={el.id} /> : null}
					</div>
				);
			})}
		</>
	);
};
