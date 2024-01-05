import {
  LogAddCollateral,
  LogRemoveCollateral,
} from "../generated/sdeUSD/CauldronV4";
import { updateCollateral } from "./updateCollateral";

export function handleLogAddCollateral(event: LogAddCollateral): void {
  updateCollateral(
    event.params.to,
    event.address,
    event.params.share,
    event.block.timestamp,
  );
}

export function handleLogRemoveCollateral(event: LogRemoveCollateral): void {
  updateCollateral(
    event.params.from,
    event.address,
    event.params.share.neg(),
    event.block.timestamp,
  );
}
