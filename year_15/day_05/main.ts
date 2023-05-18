#!/usr/bin/env -S deno run --allow-read=input --allow-hrtime

performance.mark("a");

const input = await Deno.readTextFile("input");
const lines = input.split("\n");

class PartOne {
  static #vowelsTest = (str: string) => /(.*[aeiou]){3}/.test(str);
  static #repeatedTest = (str: string) => /([a-z])\1{1}/.test(str);
  static #notForbiddenTest = (str: string) => !/ab|cd|pq|xy/.test(str);

  static isNiceString = (str: string) =>
    [PartOne.#vowelsTest, PartOne.#repeatedTest, PartOne.#notForbiddenTest]
      .every((test) => test(str));
}

const partOne = lines
  .reduce((acc, line) => acc + Number(PartOne.isNiceString(line)), 0);

class PartTwo {
  static #repeatedRe = /([a-z]{2}).*\1{1}/;
  static #inBetweenRe = /([a-z]).\1/;

  static isNiceString = (str: string) =>
    [PartTwo.#repeatedRe, PartTwo.#inBetweenRe]
      .every((re) => re.test(str));
}

const partTwo = lines
  .reduce((acc, line) => acc + Number(PartTwo.isNiceString(line)), 0);

const t = performance.measure("a").duration;

console.log(t, partOne, partTwo);
