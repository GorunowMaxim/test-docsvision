import { NavigationItem } from 'src/components/navigation/NavigationItem';
import { Building } from 'src/shared/types/types';

interface RenderSideBarNavigationProps {
	data: Building[];
	el: Building;
	renderedIds: Set<string>;
	setActiveTab: (str: string) => void;
	setIsEditingEquipment: (bol: boolean) => void;
	activeTab: string | undefined;
	filteredRoomsByEquip: Building[] | undefined;
}

export const RenderSideBarNavigation = ({
	data,
	el,
	renderedIds,
	setActiveTab,
	setIsEditingEquipment,
	activeTab,
	filteredRoomsByEquip,
}: RenderSideBarNavigationProps) => {
	if (renderedIds.has(el.id)) {
		return null;
	}
	renderedIds.add(el.id);

	const parts = el.parts?.map((partId) => data.find((item: Building) => item.id === partId));

	const variant = el.parts ? 'bold' : 'regular';

	return (
		<NavigationItem
			activeTab={activeTab}
			variant={variant}
			building={el}
			setActiveTab={setActiveTab}
			setIsEditingEquipment={setIsEditingEquipment}
			filteredRoomsByEquip={filteredRoomsByEquip}
		>
			{parts && (
				<ul className='sidebar-navigation__list'>
					{parts.map(
						(part: Building | undefined) =>
							part && (
								<RenderSideBarNavigation
									key={part.id}
									data={data}
									el={part}
									renderedIds={renderedIds}
									setActiveTab={setActiveTab}
									setIsEditingEquipment={setIsEditingEquipment}
									activeTab={activeTab}
									filteredRoomsByEquip={filteredRoomsByEquip}
								/>
							)
					)}
				</ul>
			)}
		</NavigationItem>
	);
};
