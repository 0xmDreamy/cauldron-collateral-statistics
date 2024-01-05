import { Address, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import { UserCauldronWeekSnapshot } from "../generated/schema";
import { toWeek } from "./toWeek";

export function getOrCreateUserCauldronWeekSnapshot(
  user: Address,
  cauldron: Address,
  timestamp: BigInt,
): UserCauldronWeekSnapshot {
  const week = toWeek(timestamp);
  const id = user
    .concat(cauldron)
    .concat(Bytes.fromByteArray(ByteArray.fromBigInt(week.number)));
  let userCauldronWeekSnapshot = UserCauldronWeekSnapshot.load(id);
  if (userCauldronWeekSnapshot === null) {
    userCauldronWeekSnapshot = new UserCauldronWeekSnapshot(id);
    userCauldronWeekSnapshot.user = user;
    userCauldronWeekSnapshot.cauldron = cauldron;
    userCauldronWeekSnapshot.week = week.number;
    userCauldronWeekSnapshot.weekStartTimestamp = week.start;
    userCauldronWeekSnapshot.weekEndTimestamp = week.end;
    userCauldronWeekSnapshot.updatedAt = week.start;
    userCauldronWeekSnapshot.latestCollateralShare = BigInt.zero();
    userCauldronWeekSnapshot.preliminaryCumulativeCollateralShare =
      BigInt.zero();
    userCauldronWeekSnapshot.expectedTimeWeightedAverageCollateralShare =
      BigInt.zero();
    userCauldronWeekSnapshot.save();
  }
  return userCauldronWeekSnapshot;
}
