import { useContext, useEffect, useState } from 'react';

import { SideBar } from 'src/components/sideBar';
import { TabContainer } from 'src/components/tabContainer';

import { getBuildingInfo, getEquipmentInfo } from 'src/utils/fireBase';

import { Building, Equip } from 'src/shared/types/types';
import burger from '/public/images/burger.svg';
import './styles.css';
import { loadingContext } from 'src/App';
import { Toaster } from 'react-hot-toast';

export const MainPage = () => {
	const { isLoading, setLoading } = useContext(loadingContext);

	const [equip, setEquip] = useState<Equip[]>();
	const [data, setData] = useState<Building[]>();

	const [activeTab, setActiveTab] = useState<string>();
	const [isEditingEquipment, setIsEditingEquipment] = useState<boolean>(false);
	const [isVisible, setVisibility] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			try {
				const docs = await getBuildingInfo();
				setData(docs);
				const data = await getEquipmentInfo();
				setEquip(data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		}
		isLoading && fetchData();
	}, [isLoading]);

	const filteredRoomsByEquip = data
		?.filter((el) => !el.parts)
		.filter((el) => {
			return equip?.find((equip) => el.id === equip.placeId) ? true : false;
		});

	const renderedIds = new Set<string>();

	return (
		<>
			<Toaster />
			<div className='wrapper'>
				<div className='burger-menu'>
					<button onClick={() => setVisibility(!isVisible)} className='burger-menu__button'>
						<img className='burger-menu__icon' src={burger} alt='' />
					</button>
				</div>
				<SideBar
					data={data}
					renderedIds={renderedIds}
					setActiveTab={setActiveTab}
					setIsEditingEquipment={setIsEditingEquipment}
					activeTab={activeTab}
					filteredRoomsByEquip={filteredRoomsByEquip}
					isVisible={isVisible}
				/>
				<main className='main'>
					<div className='main-wrapper'>
						<TabContainer
							data={data}
							activeTab={activeTab}
							equip={equip}
							isEditingEquipment={isEditingEquipment}
						/>
					</div>
				</main>
			</div>
		</>
	);
};
