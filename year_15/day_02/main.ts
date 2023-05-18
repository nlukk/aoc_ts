#!/usr/bin/env -S deno run --allow-read=input --allow-hrtime

performance.mark("a");

const input = await Deno.readTextFile("input");
const dims = input.split("\n").map((s) => s.split("x").map(Number));

const sum = (a: number, b: number) => a + b;

const partOne = dims
  .map(([l, w, h]) => [l * w, w * h, l * h])
  .map((sd) => 2 * sd.reduce(sum) + Math.min(...sd))
  .reduce(sum);

const partTwo = dims
  .map(([l, w, h]) => 2 * Math.min(...[l + w, w + h, l + h]) + l * w * h)
  .reduce(sum);

const t = performance.measure("a").duration;

console.log(t, partOne, partTwo);
