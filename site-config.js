/**
 * White Eagles – Site configuration
 * Edit this file to add/remove sponsors and calendars. Save and refresh the site to see changes.
 */

window.SITE_CONFIG = {

  // ═══════════════════════════════════════════════════════════════════════════
  // COPYRIGHT (footer on every page)
  // ═══════════════════════════════════════════════════════════════════════════
  //
  // Year the site was first published. The footer shows:
  //   – "© 2025 White Eagles..." when current year equals yearMade
  //   – "© 2025 – 2026 White Eagles..." when current year is later
  //
  yearMade: 2026,

  // ═══════════════════════════════════════════════════════════════════════════
  // SPONSORS (shown on the home page)
  // ═══════════════════════════════════════════════════════════════════════════
  //
  // How to add a sponsor:
  //   1. Add a new object to the list below.
  //   2. file   = image filename (place the image in the sponsors/ folder)
  //   3. url    = full link when the sponsor box is clicked (e.g. https://example.com)
  //   4. name   = sponsor name (used for tooltip and accessibility)
  //
  // How to remove a sponsor: delete its whole { ... } block from the list.
  //
  sponsors: [
    { file: 'sspk.png', url: 'https://spkcanada.ca/', name: 'Polish Combatants\' Association in Canada (SPK)' },
    { file: 'polish-canadian.png', url: 'https://polishcanadianassociation.com/en/#Welcome', name: 'Polish Canadian Association' }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CALENDARS (tabs on the Calendar page)
  // ═══════════════════════════════════════════════════════════════════════════
  //
  // How to add a calendar:
  //   1. In Google Calendar: open the calendar → Settings → Integrate calendar
  //   2. Copy the "Calendar ID" (or the embed URL and use the part after src=).
  //   3. In the embed URL, @ is often shown as %40 – use that in the id below.
  //   4. Add a new object: { name: 'Tab label', id: 'your-calendar-id%40group.calendar.google.com' }
  //
  // How to remove a calendar: delete its whole { name: '...', id: '...' } line.
  //
  // Examples:
  //   Gmail calendar:     id: 'youremail%40gmail.com'
  //   Group calendar:     id: 'abc123...%40group.calendar.google.com'
  //
  calendarList: [
    { name: 'Main', id: 'whiteeagleswebsite%40gmail.com' },
    { name: 'U5–U6', id: 'a51b4818c29f840fa5ceafb3e7b359377b6ca7c06d889bf8f573e5eda3687604%40group.calendar.google.com' },
    { name: 'U7–U10', id: '31a1c995f8b9113eb0fbaf33253bf0a03c39d66d3ae87c0892433383dd077a4c%40group.calendar.google.com' }
  ]

};
