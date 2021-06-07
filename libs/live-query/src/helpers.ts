import { ObservabilitySet, RangeBtree, mergeRanges } from "dexie";

export const isAsyncFunction = typeof Symbol !== 'undefined'
    ? (fn: Function) => fn[Symbol.toStringTag] === 'AsyncFunction'
    : ()=>false;

export function extendObservabilitySet(
  target: ObservabilitySet,
  newSet: ObservabilitySet
): ObservabilitySet {
  Object.keys(newSet).forEach(part => {
    const rangeSet: RangeBtree = target[part] || (target[part] = {d: 0});
    mergeRanges(rangeSet, newSet[part]);
  });
  return target;
}