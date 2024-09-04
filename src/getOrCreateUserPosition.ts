import { Address, BigInt } from "@graphprotocol/graph-ts";
import { UserPosition } from "../generated/schema";

export function getOrCreateUserPosition(
	user: Address,
	cauldron: Address,
): UserPosition {
	const id = user.concat(cauldron);
	let userPosition = UserPosition.load(id);
	if (userPosition === null) {
		userPosition = new UserPosition(id);
		userPosition.user = user;
		userPosition.cauldron = cauldron;
		userPosition.collateralShare = BigInt.zero();
		userPosition.save();
	}
	return userPosition;
}
