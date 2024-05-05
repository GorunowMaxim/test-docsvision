import { Building } from "src/shared/types/types";

export const findAllParts = (building: Building, data: Building[] | undefined, activeTab: string) => {
	const result: string[] = [activeTab];
	const stack: Building[] = [building];

	while (stack.length > 0) {
		const currentBuilding = stack.pop()!;

		if (currentBuilding.parts) {
			currentBuilding.parts.forEach((partId) => {
				const relatedBuilding = data?.find((building) => building.id === partId);
				if (relatedBuilding) {
					stack.push(relatedBuilding);
					result.push(relatedBuilding.id);
				}
			});
		}
	}

	return result;
};