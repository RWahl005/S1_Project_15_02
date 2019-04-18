"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Ryan Wahl
   Date:   4.18.19
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

// Calls the following function when the browser is loaded.
window.addEventListener("load", function () {
      // Gets all of the cells that are used to sum up the data
      var changingCells = document.querySelectorAll("table#travelExp input.sum");
      //Loops through those cells
      for (var i = 0; i < changingCells.length; i++) {
            // Add the onchange event handler to call the calcExp function.
            changingCells[i].onchange = calcExp;
      }
      // When the submit button is clicked, run the validateSummary function.
      document.getElementById("submitButton").onclick = validateSummary;
});

/**
 * Makes sure the summary has text in it
 * @param {Event} e 
 */
function validateSummary(e) {
      // Gets the summary element.
      var sum = document.getElementById("summary");
      // If the summary is empty.
      if (sum.validity.valueMissing) {
            // Tell the user it must not be.
            sum.setCustomValidity("You must include a summary of the trip in your report.");
      } else {
            //else allow it to submit.
            sum.setCustomValidity("");
      }
}

/**
 * Adds up all of the input values with a certian class name.
 * @param {String} sumClass The class name.
 */
function calcClass(sumClass) {
      // Get all of the elements by the class name provided
      var sumFields = document.getElementsByClassName(sumClass);
      // Declare the sum total variable.
      var sumTotal = 0;
      // Loop through all of the sumFields inputs.
      for (var i = 0; i < sumFields.length; i++) {
            // Get the value of the input.
            var itemValue = parseFloat(sumFields[i].value);
            // If it is a number.
            if (!isNaN(itemValue)) {
                  // Add it to the total value.
                  sumTotal += itemValue;
            }
      }
      // Return the amount calculated.
      return sumTotal;
}

/**
 * Calculate the table when a value is changed.
 */
function calcExp() {
      // Gets all of the table rows within the travelExp tbody.
      var expTable = document.querySelectorAll("table#travelExp tbody tr");
      // Loops thorugh those table rows.
      for (var i = 0; i < expTable.length; i++) {
            // Selects the input with the id of subtotal and sets the value to the sum returned by calcClass, set to two decimals.
            expTable[i].querySelector("input#subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }
      // Sets the transTotal value to the sum returned by the calcClass function and reduced to two decimals.
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      // Sets the lodgeTotal value to the sum returned by the calcClass function and reduced to two decimals.
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      // Sets the mealTotal value to the sum returned by the calcClass function and reduced to two decimals.
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      // Sets the other value to the sum returned by the calcClass function and reduced to two decimals.
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);

      // Sets the expTotal value to the sum returned by the calcClass function and formated to US currency.
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}


/*

      Function provided by the book.

*/


function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}