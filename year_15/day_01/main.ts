#!/usr/bin/env -S deno run --allow-read=input --allow-hrtime

performance.mark("a");

const input = await Deno.readTextFile("input");
const codes = Array.from(input, (c) => c === "(" ? 1 : -1);

const partOne = codes.reduce((acc, n) => acc + n, 0);

let acc = 0;
const partTwo = 1 + codes.findIndex((n) => (acc += n) === -1);

const t = performance.measure("a").duration;

console.log(t, partOne, partTwo);
