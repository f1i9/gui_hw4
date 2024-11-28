/* 
File: index.js
GUI Assignment: Homework 4
Content: This file contains JavaScript functions for generating, displaying, and managing a multiplication table 
based on user inputs from an HTML form. The `generateTable` function captures minimum and maximum row and column 
values, validates input, and dynamically builds an HTML table containing the products of each cell. The function 
restricts the table size to a maximum difference of 100 rows and columns. 

Additional features include:
- **Clear Fields**: Resets all input fields, sliders, and the table display.
- **Tabs Management**: Allows users to save, view, and delete multiple tables as tabs. Each tab contains a distinct table and can be removed individually or in bulk.
- **Checkbox for Tab Deletion**: Users can select and delete multiple tabs through a checkbox-based interface.
- **Sliders for Inputs**: Integrated jQuery UI sliders allow dynamic adjustment of input values with real-time validation.
- **Keyboard Interaction**: Pressing Enter in input fields triggers table generation.
- **Responsive Table Updates**: Automatically updates the table when slider values are adjusted, maintaining the 100-row/column difference limit.

This code is designed for interactive use in a GUI and includes event listeners for buttons, input fields, sliders, and tabs.

Author: Alireza Jahanban, UMass Lowell Computer Science  
Email: Alireza_Jahanban@student.uml.edu  
Copyright (c) 2024 by Alireza Jahanban. All rights reserved.  
This code is free to use by anyone for business or educational purposes with credit to the author.  
Last updated: November 2024.
*/

$( function() {

class Table {
    constructor(table, min_row, max_row, min_col, max_col) {
        this.table = table;
        this.min_row = min_row;
        this.max_row = max_row;
        this.min_col = min_col;
        this.max_col = max_col;
    }
}
const currentTable = new Table();
var tables = [];
$('#min-row').val(0);
$('#max-row').val(5);
$('#min-col').val(0);
$('#max-col').val(5);

// --------------------------------------------------------------------------------
//                              Generate Table
// --------------------------------------------------------------------------------
function generateTable() {
    const min_row = parseInt(document.getElementById('min-row').value);
    const max_row = parseInt(document.getElementById('max-row').value);
    const min_col = parseInt(document.getElementById('min-col').value);
    const max_col = parseInt(document.getElementById('max-col').value);

    const tableContainer = document.getElementById('topTableContainer');
    tableContainer.innerHTML = "";

    if (! (isNaN(min_row) || isNaN(max_row) || isNaN(min_col) || isNaN(max_col)) ) {

        if ( (max_row - min_row <= 100) && (max_col - min_col <= 100) ) {
            const table = document.createElement('table');
            const headerRow = table.insertRow();
    
            const header1 = headerRow.insertCell();
            header1.textContent = "#";
    
            for (let i = min_col; i <= max_col; i++) {
                const header1 = headerRow.insertCell();
                header1.textContent = `${i}`;
            }
    
            for (let i = min_row; i <= max_row; i++) {
                const row = table.insertRow();
                const multiplierCell = row.insertCell();
                multiplierCell.textContent = `${i}`;
                for (let j = min_col; j <= max_col; j++) {
                    const multiplierCell = row.insertCell();
                    multiplierCell.textContent = `${i * j}`;
                }
            }
            tableContainer.appendChild(table);
            currentTable.table = tableContainer;
            currentTable.min_row = min_row;
            currentTable.max_row = max_row;
            currentTable.min_col = min_col;
            currentTable.max_col = max_col;

        } else {
            tableContainer.innerHTML = '<p>The difference between numbers cannot be larger than 100.</p>';
        }

    } else {
        tableContainer.innerHTML = '<p>Please enter four numbers.</p>';
    }
}

// --------------------------------------------------------------------------------
//                              Clear Fields
// --------------------------------------------------------------------------------
function clearFields() {
    const inputs = document.querySelectorAll('#inputbox input');
    inputs.forEach(input => input.value = '');

    document.getElementById("topTableContainer").innerHTML = "";

    $('#min-row').val(0);
    $('#max-row').val(0);
    $('#min-col').val(0);
    $('#max-col').val(0);

    var $slider1 = $('#slider1');
    var $slider2 = $('#slider2');
    var $slider3 = $('#slider3');
    var $slider4 = $('#slider4');
    $slider1.slider('value', 0);
    $slider2.slider('value', 0);
    $slider3.slider('value', 0);
    $slider4.slider('value', 0);
}

// --------------------------------------------------------------------------------
//                              Delete All
// --------------------------------------------------------------------------------
function deleteAll() {
    tables.length = 0;
    $('#topTableContainer').empty();
    $('#tab-container').empty();
    $('#content-container').empty()
}
// --------------------------------------------------------------------------------
//                              Delete All
// --------------------------------------------------------------------------------
function showTabNames() {
    // Select all tab elements
    const $tabs = $('#tab-container .tab');
    const $tabList = $('<ul></ul>');
    $tabList.addClass('checklist')

    $tabs.each(function() {
        const tabName = $(this).text();
        // console.log(tabName);
        
        const $listItem = $('<li></li>');
        $listItem.addClass('checklist-item')
        const $checkbox = $('<input type="checkbox">').val(tabName);
        
        $listItem.append($checkbox);
        $listItem.append($('<label></label>').text(tabName));
        
        $tabList.append($listItem);
    });

    $('#topTableContainer').empty();
    $('#topTableContainer').append($tabList);
}


function deleteSelectedTabs() {
    console.log("tab_to_delete (checked): ");
    
    const checkedTabs = $('#topTableContainer input[type="checkbox"]:checked');

    checkedTabs.each(function() {
        var tab_to_delete = $(this).val();
        console.log(tab_to_delete);
        
        $('.tab').each(function() {
            var tabName = $(this).text();
            var tabId = $(this).data('tab'); 
    
            console.log("tabName: " + tabName);
    
            if (tabName === tab_to_delete) {
            tabCount--; // Decrease the tab count
    
            for (let i = 0; i < tables.length; i++) {
                if ($("#" + tabId).html() === tables[i].outerHTML) {
                console.log(tables.splice(i, 1));
                break;
                }
            }
    
            $(this).remove();
            $('#' + tabId).remove();
    
            if ($(this).hasClass('active')) {
                $('.tab:first').click();
            }
    
            return false;
            }
        });
    });
    
    showTabNames();
}
// --------------------------------------------------------------------------------
//                          Keyboard Listener
// --------------------------------------------------------------------------------
document.querySelectorAll("#inputbox input").forEach(input => {
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            generateTable();
        }
    });
});
// --------------------------------------------------------------------------------
//                          Button Listener
// --------------------------------------------------------------------------------
document.getElementById("generate-button" ).addEventListener("click", generateTable);
document.getElementById("clear-button").addEventListener("click", clearFields);
document.getElementById("delete-button").addEventListener("click", deleteAll);
document.getElementById("list-button").addEventListener("click", showTabNames);
document.getElementById("delete-selected-button").addEventListener("click", deleteSelectedTabs);


// --------------------------------------------------------------------------------
//                          Handling Tabs
// --------------------------------------------------------------------------------
let tabCount = 0; // Keep track of the number of tabs

// --------------------------------------------------------------------------------
//                               Handle tab click
// --------------------------------------------------------------------------------
$(document).on('click', '.tab', function() {
    var tabId = $(this).data('tab');

    $('.tab').removeClass('active');
    $(this).addClass('active');

    $('.content').removeClass('active');
$('#' + tabId).addClass('active');
});

// --------------------------------------------------------------------------------
//                               Handle close button click
// --------------------------------------------------------------------------------
$(document).on('click', '.close-btn', function(e) {
  tabCount--;

  e.stopPropagation(); // Prevent triggering the tab click
  
  var parentTab = $(this).parent();
  var tabId = parentTab.data('tab');


  // delete from the array
  for (let i = 0; i < tables.length; i++) {
    if ($("#" + tabId).html() == tables[i].outerHTML) {
        console.log(tables.splice(i, 1));
    }
  }
  
  // Remove tab and content
  parentTab.remove();
  $('#' + tabId).remove();

  // If the closed tab was active, activate the first tab
  if (parentTab.hasClass('active')) {
    $('.tab:first').click();
  }
});

// --------------------------------------------------------------------------------
//                               Handle adding new tabs
// --------------------------------------------------------------------------------
$('#add-tab-btn').click(function() {
  tabCount++;
  var newTabId = 'tab' + tabCount;
  var newTabLabel =  currentTable.min_row + "-" + currentTable.max_row + " x " + currentTable.min_col + "-" + currentTable.max_col;

    if ($('#topTableContainer').is(':empty')) {
        
    } else {
        // Add the new tab
        $('#tab-container').append(
        `<div class="tab" data-tab="${newTabId}">${newTabLabel} <span class="close-btn">x</span></div>`
        );

        // Add the new content
        $('#content-container').append(
        `<div id="${newTabId}" class="content"></div>`
        );

        // Activate the new tab
        $(`[data-tab=${newTabId}]`).click();

        $(`#${newTabId}`).append(currentTable.table.cloneNode(true));
        tables.push(currentTable.table.cloneNode(true));
    }

});
// --------------------------------------------------------------------------------
//                               Sliders
// --------------------------------------------------------------------------------
function validator() {
    var $min_row = $('#min-row');
    var $max_row = $('#max-row');
    var $min_col = $('#min-col');
    var $max_col = $('#max-col');
    if (!( ($max_row.val() - $min_row.val() <= 100) && ($max_col.val() - $min_col.val() <= 100))) {
        $('#topTableContainer').html('<p>The difference between entered values are too large</p>');
        return false;
    } else {
        $('#topTableContainer').html("");
        return true;
    }
}

// --------------------------------------------------------------------------------
//                               Sliders
// --------------------------------------------------------------------------------
var $min_row = $('#min-row');
var $max_row = $('#max-row');
var $min_col = $('#min-col');
var $max_col = $('#max-col');

var $slider1 = $('#slider1');
var $slider2 = $('#slider2');
var $slider3 = $('#slider3');
var $slider4 = $('#slider4');

// Initialize slider
$slider1.slider({
    min: -100,
    max: 100,
    value: $min_row.val(),
    slide: function(event, ui) {
        $min_row.val(ui.value);
        validator();
        generateTable();
    }
});

// Update slider when number input changes
$min_row.on('input', function() {
    var value = $(this).val();
    $slider1.slider('value', value);
    validator();
    generateTable();
});
// --------------------------------------------------------------------------------
//                               Sliders
// --------------------------------------------------------------------------------
// Initialize slider
$slider2.slider({
    min: -100,
    max: 100,
    value: $max_row.val(),
    slide: function(event, ui) {
        $max_row.val(ui.value);
        validator();
        generateTable();
    }
});

// Update slider when number input changes
$max_row.on('input', function() {
    var value = $(this).val();
    $slider2.slider('value', value);
    validator();
    generateTable();
});
// --------------------------------------------------------------------------------
//                               Sliders
// --------------------------------------------------------------------------------
// Initialize slider
$slider3.slider({
    min: -100,
    max: 100,
    value: $min_col.val(),
    slide: function(event, ui) {
        $min_col.val(ui.value);
        validator();
        generateTable();
    }
});

// Update slider when number input changes
$min_col.on('input', function() {
    var value = $(this).val();
    $slider3.slider('value', value);
    validator();
    generateTable();
});
// --------------------------------------------------------------------------------
//                               Sliders
// --------------------------------------------------------------------------------
// Initialize slider
$slider4.slider({
    min: -100,
    max: 100,
    value: $max_col.val(),
    slide: function(event, ui) {
        $max_col.val(ui.value);
        validator();
        generateTable();
    }
});

// Update slider when number input changes
$max_col.on('input', function() {
    var value = $(this).val();
    $slider4.slider('value', value);
    validator();
    generateTable();
});
// --------------------------------------------------------------------------------
//                               Tab Interface
// --------------------------------------------------------------------------------
$("#tabs").tabs();

// Close tab functionality
$("#tabs").on("click", ".ui-icon-close", function() {
    var tabIndex = $(this).parent().index();
    $("#tabs").tabs("option", "active", tabIndex > 0 ? tabIndex - 1 : 0); // Activate the previous tab
    
    // Remove the tab and its content
    $("#tabs").find(".ui-tabs-nav li").eq(tabIndex).remove();
    $("#tabs").find(".ui-tabs-panel").eq(tabIndex).remove();

    // Refresh the tabs to update
    $("#tabs").tabs("refresh");
});

// Add new tab functionality
$("#add-tab-btn").on("click", function() {
    var tabCount = $("#tabs ul li").length + 1; // Count existing tabs
    var tabId = "tab-" + tabCount; // Create a new tab ID

    // Add new tab
    $("#tabs ul").append('<li><a href="#' + tabId + '">Tab ' + tabCount + '</a><span class="ui-icon ui-icon-close" title="Close Tab"></span></li>');

    $("#tabs").append('<div id="' + tabId + '">' + currentTable.table.cloneNode(true) + '</div>');

    // Refresh the tabs to include the new tab
    $("#tabs").tabs("refresh");

    // Activate the new tab
    $("#tabs").tabs("option", "active", tabCount - 1);
});




});