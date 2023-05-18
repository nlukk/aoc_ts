#!/usr/bin/env -S deno run --allow-read=input --allow-hrtime

import { Md5 } from "https://deno.land/std@0.110.0/hash/md5.ts";

performance.mark("a");

const key = await Deno.readTextFile("input");

const untilStartsWith = (key: string, str: string, startWith = 1) => {
  for (let i = startWith; true; ++i) {
    const hash = new Md5().update(key + i).toString();
    if (hash.startsWith(str)) {
      return i;
    }
  }
};

const partOne = untilStartsWith(key, "0".repeat(5));
const partTwo = untilStartsWith(key, "0".repeat(6), partOne);

const t = performance.measure("a").duration;

console.log(t, partOne, partTwo);
