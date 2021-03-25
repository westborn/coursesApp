/**
 * Creates the menu items for user to run scripts on drop-down.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi()
  ui.createMenu('Course Manager')
    .addSubMenu(ui.createMenu('Courses').addItem('Get a Course', 'loadCourseDialog'))
    .addSeparator()
    .addItem('Help', 'loadHelpSidebar')
    .addToUi()
}

/**
 * Handler  to load Help Sidebar.
 */
function loadHelpSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('HelpSidebar').setTitle('U3A Tools Help')
  SpreadsheetApp.getUi().showSidebar(html)
}

function loadCourseDialog() {
  var html = HtmlService.createTemplateFromFile('claspIndex.html').evaluate().setWidth(1048).setHeight(960)
  SpreadsheetApp.getUi().showModalDialog(html, 'U3A Course Management')
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function getSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const data = ss.getSheetByName(sheetName).getDataRange().getValues()
  const dataObj = getJsonArrayFromData(data)
  return JSON.stringify(dataObj)
}

function addCoursesToCalendar(data) {
  const selectedCourses = [...data]
  console.log(selectedCourses)
  return getSheet('Courses')
}

function findCalendars(name) {
  var calendars = CalendarApp.getAllCalendars()
  Logger.log('This user owns or is subscribed to %s calendars.', calendars.length)
  // var calendars = CalendarApp.getCalendarsByName('U3A draft bookings');
  calendars.forEach(cal => {
    console.log(cal.getName(), cal.getId())
  })
}

// function test() {
//   const ss = SpreadsheetApp.getActiveSpreadsheet()
//   const data = ss.getSheetByName('activities').getRange('c3').getValues()
//   console.log(typeof data)
//   console.log(data.length)
//   console.log(data.valueOf())
//   const newDte = new Date()
//   ss.getSheetByName('activities').getRange('E3').setValue(newDte)
// }
