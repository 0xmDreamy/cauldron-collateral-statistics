import { BigInt } from "@graphprotocol/graph-ts";
import { WEEK_SECONDS } from "./constants";

export class Week {
	constructor(
		public readonly number: BigInt,
		public readonly start: BigInt,
		public readonly end: BigInt,
	) {}
}

export function toWeek(timestamp: BigInt): Week {
	const number = timestamp.div(WEEK_SECONDS);
	const start = number.times(WEEK_SECONDS);
	const end = number.plus(BigInt.fromU32(1)).times(WEEK_SECONDS);
	return new Week(number, start, end);
}
