<script>
  /**
   * Calendar - based on work done by beforesemicolon
   * video - https://www.youtube.com/watch?v=g1Zd0Y7OJuI
   * codepen - https://codepen.io/beforesemicolon/pen/jOMgZrY
   *
   *
   */
  import { getWeekNumber, isLeapYear, Day, Month, Calendar } from '../COMPONENTS/calendar.js'
  import { onMount } from 'svelte'

  onMount(async () => {
    lang = window.navigator.language
    makeLines()
  })

  let format = 'MMMM DD (DDD), YYYY'
  let visible = false
  let date = null
  let lang = {}

  date = new Day(new Date(date || Date.now()), lang)

  let calendar = new Calendar(date.year, date.monthNumber, lang)
  let selectedDay = date

  let textSize = 1
  let textSizes = ['text-xs', 'text-sm', 'text-base', 'text-lg']
  $: textClass = textSizes[textSize]

  let monthList = null
  $: monthYear = `${calendar.month.name}, ${calendar.year}`
  $: dateDisplay = date.format(format)

  let dayHeight

  let events = []

  function makeLines() {
    const lines = [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipisicing elit. Sint, ex.',
      'Dolor sit amet consectetur',
      'Architecto numquam delectus, fuga eos ipsum',
      'Facere dolorem illum beatae laborum nam animi.',
    ]
    for (let i = 0; i < 31; i++) {
      var rand = Math.floor(Math.random() * 6)
      if (rand == 3) {
        events.push('')
      } else {
        events.push(lines.slice(0, rand - 1))
      }
    }
    console.log(events)
  }

  function makeDisplayClasses(day) {
    if (day.date === selectedDay.date && day.monthNumber === selectedDay.monthNumber && day.year === selectedDay.year) {
      return 'bg-secondary-100'
    }
    if (day.monthNumber === calendar.month.number) {
      return 'bg-primary-50'
    }
    return 'bg-gray-50'
  }

  function toggleCalendar() {
    visible = !visible
    if (visible) {
      renderCalendarDays()
    }
  }

  function prevMonth() {
    calendar.goToPreviousMonth()
    renderCalendarDays()
  }

  function nextMonth() {
    calendar.goToNextMonth()
    renderCalendarDays()
  }

  function selectDay(idx, day) {
    // console.log(idx, day)
    if (day.isEqualTo(date)) return
    selectedDay = day
    date = day
    if (day.monthNumber !== calendar.month.number) {
      calendar.goToPreviousMonth()
    }
    renderCalendarDays()
  }

  function getMonthDaysGrid() {
    const firstDayOfTheMonth = calendar.month.getDay(1)
    const prevMonth = calendar.getPreviousMonth()
    const totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1
    const totalDays = calendar.month.numberOfDays + totalLastMonthFinalDays
    const monthList = Array.from({ length: totalDays })

    for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
      monthList[i] = calendar.month.getDay(i + 1 - totalLastMonthFinalDays)
    }

    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1)
      monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted)
    }

    return monthList
  }

  function renderCalendarDays() {
    calendar = calendar
    monthList = getMonthDaysGrid()
  }
</script>

<div class="container ">Sessions</div>

<button type="button" class="m-4 shadow-lg btn btn-primary " on:click={() => toggleCalendar()}>{dateDisplay} </button>

<input type="range" bind:value={textSize} min="0" max="3" />

<div class="m-10 {visible ? 'visible' : 'invisible'}">
  <div class="flex justify-between mb-4">
    <button
      on:click={() => prevMonth()}
      aria-label="previous month"
      class="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded focus:outline-none hover:bg-gray-400"
    >
      Prev
    </button>
    <h4 tabindex="0" aria-label="current month {monthYear}" class="text-xl font-bold">
      {monthYear}
    </h4>

    <button
      on:click={() => nextMonth()}
      aria-label="next month"
      class="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded focus:outline-none hover:bg-gray-400"
    >
      Next
    </button>
  </div>

  <div class="grid grid-cols-7 gap-1 justify-items-center">
    {#each calendar.weekDays as weekDay}
      <span class="font-semibold">{weekDay.substring(0, 3)}</span>
    {/each}
  </div>

  <div class="grid grid-cols-7">
    {#if monthList}
      {#each monthList as day, index}
        <button
          bind:clientHeight={dayHeight}
          type="button"
          class="w-full overflow-hidden inline-block font-semibold p-4 border  focus:outline-none {makeDisplayClasses(
            day
          )}"
          on:click={() => selectDay(index, day)}
        >
          <span class={textClass}>{dayHeight}px<br />{day.date}</span><br />
          <span class={textClass}>{events[day.date]}</span>
          <!-- <pre class={textClass}>{JSON.stringify(day,null,2)}</pre> -->
        </button>
      {/each}
    {/if}
  </div>
</div>
