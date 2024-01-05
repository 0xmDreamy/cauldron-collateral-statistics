import { Address, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import { CauldronWeekSnapshot } from "../generated/schema";
import { toWeek } from "./toWeek";

export function getOrCreateCauldronWeekSnapshot(
  cauldron: Address,
  timestamp: BigInt,
): CauldronWeekSnapshot {
  const week = toWeek(timestamp);
  const id = cauldron.concat(
    Bytes.fromByteArray(ByteArray.fromBigInt(week.number)),
  );
  let cauldronWeekSnapshot = CauldronWeekSnapshot.load(id);
  if (cauldronWeekSnapshot === null) {
    cauldronWeekSnapshot = new CauldronWeekSnapshot(id);
    cauldronWeekSnapshot.cauldron = cauldron;
    cauldronWeekSnapshot.week = week.number;
    cauldronWeekSnapshot.weekStartTimestamp = week.start;
    cauldronWeekSnapshot.weekEndTimestamp = week.end;
    cauldronWeekSnapshot.updatedAt = week.start;
    cauldronWeekSnapshot.latestCollateralShare = BigInt.zero();
    cauldronWeekSnapshot.preliminaryCumulativeCollateralShare = BigInt.zero();
    cauldronWeekSnapshot.expectedTimeWeightedAverageCollateralShare =
      BigInt.zero();
    cauldronWeekSnapshot.save();
  }
  return cauldronWeekSnapshot;
}
