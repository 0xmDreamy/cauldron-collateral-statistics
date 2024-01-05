import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Cauldron } from "../generated/schema";

export function getOrCreateCauldron(address: Address): Cauldron {
	let cauldron = Cauldron.load(address);
	if (cauldron === null) {
		cauldron = new Cauldron(address);
		cauldron.collateralShare = BigInt.zero();
		cauldron.save();
	}
	return cauldron;
}
