(function() {
  'use strict';

  let $screen = $('#screen');

  $('#clear').click(() => {
    $screen.text('');
  });

  $('#equals').click(() => {
    let arithExp = $screen.text();

    if (arithExp === 'Error') {
      return;
    }

    let nextArithExp;

    nextArithExp = eval(arithExp.replace('÷', '/').replace('x', '*'));

    if (!Number.isFinite(nextArithExp)) {
      nextArithExp = 'Error';
    }

    $screen.text(nextArithExp);
  });

  $('.buttons').on('click', 'span:not(#clear):not(#equals)', (event) => {
    let arithExp = $screen.text();

    if (arithExp === 'Error') {
      return;
    }

    let nextArithExp = arithExp + $(event.target).text();

    $screen.text(nextArithExp);
  });

  function safeEval(arithExp) {
    let regExp = /^(\-?\d+\.?\d*)(\+|\-|x|÷)(\-?\d+\.?\d*)$/;

    let matches = arithExp.match(regExp);

    if (matches === null) {
      return 'Error';
    }

    let operand1 = parseFloat(matches[1]);
    let operand2 = parseFloat(matches[3]);
    let operator = matches[2];

    let total;

    if (operator === '+') {
      total = operand1 + operand2;
    }
    else if (operator === '-') {
      total = operand1 - operand2;
    }
    else if (operator === 'x') {
      total = operand1 * operand2;
    }
    else if (operator === '÷') {
      if (operand2 === 0) {
        return 'Error';
      }

      total = operand1 / operand2;
    }

    return total;
  };
})();
