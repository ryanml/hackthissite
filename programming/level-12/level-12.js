// ==UserScript==
// @name         Programming Missions - Level 12
// @namespace    https://github.com/ryanml
// @version      0.1
// @description  Solves and submits Level 12 of hackthissite.org's programming missions.
// @author       ryanml
// @match        *://www.hackthissite.org/missions/prog/12/index.php
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  /*
   * A simple function for determining prime and composite numbers
   * Return:
   * -1 == Neither Prime nor Composite
   * 0 == Composite
   * 1 == Prime
   */
  const isPrimeOrComposite = (i) => {
    if (i === 0 || i === 1)
      return -1;

    for (var n = 2; n < i; n++) {
      if (i % n === 0)
        return 0;
    }

    return 1;
  };

  const encodeString = (s) => {
    var str = [...s];

    /* Separate numeric and non-numeric chars */
    var nums = str.filter(n => !isNaN(n));
    var alphas = str.filter(c => isNaN(c));

    /* Cast nums to int type */
    nums = nums.map(n => parseInt(n));

    /* Separate composite and prime numbers */
    var comps = nums.filter(n => isPrimeOrComposite(n) === 0);
    var primes = nums.filter(n => isPrimeOrComposite(n) === 1);

    /* Find the sum of the composite and prime numbers */
    var compSum = comps.reduce((c, p) => c + p);
    var primeSum = primes.reduce((c, p) => c + p);

    /* Multiply the above sums */
    var sumProduct = (compSum * primeSum);

    /* Increment the first 25 non-numeric chars' ascii value by 1 */
    var asciiInc = alphas.slice(0, 25).map(c =>
      String.fromCharCode(c.charCodeAt(0) + 1)
    );

    return `${asciiInc.join('')}${sumProduct}`;
  };

  /* Solve and submit the answer to the challenge */
  document.querySelector('input[name="solution"]').value = encodeString(
    document.querySelector('input[type="text"]').value
  );
  document.querySelector('input[name="submitbutton"]').click();
})();
