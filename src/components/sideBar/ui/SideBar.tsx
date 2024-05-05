import { Building } from 'src/shared/types/types';
import { RenderSideBarNavigation } from '../utils/RenderSideBarNav';

import './styles.css';

interface SideBarProps {
	renderedIds: Set<string>;
	setActiveTab: (str: string) => void;
	setIsEditingEquipment: (bol: boolean) => void;
	activeTab: string | undefined;
	data: Building[] | undefined;
	filteredRoomsByEquip: Building[] | undefined;
	isVisible: boolean;
}

export const SideBar = ({
	renderedIds,
	setActiveTab,
	activeTab,
	data,
	setIsEditingEquipment,
	filteredRoomsByEquip,
	isVisible,
}: SideBarProps) => {
	return (
		<aside className={isVisible ? 'sidebar sidebar_visible' : 'sidebar'}>
			<div className='sidebar-wrapper'>
				<nav className='sidevar-navigation'>
					<ul className='sidebar-navigation__list'>
						{data?.map((building: Building) => (
							<RenderSideBarNavigation
								key={building.id}
								data={data}
								el={building}
								renderedIds={renderedIds}
								setActiveTab={setActiveTab}
								setIsEditingEquipment={setIsEditingEquipment}
								activeTab={activeTab}
								filteredRoomsByEquip={filteredRoomsByEquip}
							/>
						))}
					</ul>
				</nav>
			</div>
		</aside>
	);
};
