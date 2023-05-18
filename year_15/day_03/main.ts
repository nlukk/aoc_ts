#!/usr/bin/env -S deno run --allow-read=input --allow-hrtime

performance.mark("a");

const input = await Deno.readTextFile("input");
const chars = Array.from(input);

type Tuple<T, U = T> = [T, U];

const updatePos = (pos: Tuple<number>, c: string): Tuple<number> => {
  const i = c === "<" || c === ">" ? 0 : 1;
  const n = c === ">" || c === "^" ? 1 : -1;
  pos[i] += n;
  return pos;
};

const posOne: Tuple<number> = [0, 0];
const setOne = new Set<string>([posOne.toString()]);
chars.forEach((c) => setOne.add(updatePos(posOne, c).toString()));

const posTwo: Tuple<Tuple<number>> = [[0, 0], [0, 0]];
const setTwo = new Set<string>([posTwo[0].toString()]);
chars.forEach((c, i) => setTwo.add(updatePos(posTwo[i % 2], c).toString()));

const t = performance.measure("a").duration;

console.log(t, setOne.size, setTwo.size);
