const COVER_COLORS = ["#1e3a8a", "#7c2d12", "#14532d", "#581c87", "#831843", "#134e4a", "#78350f"]

const escapeXml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const wrap = (text, max = 14) => {
  const lines = []
  let line = ""

  text.split(" ").forEach((word) => {
    if ((line + " " + word).trim().length > max) {
      if (line) lines.push(line)
      line = word
    } else {
      line = (line + " " + word).trim()
    }
  })

  if (line) lines.push(line)
  return lines.slice(0, 5)
}

export const generatedCover = (title, author, index = 0) => {
  const bg = COVER_COLORS[index % COVER_COLORS.length]

  const titleLines = wrap(title)
    .map(
      (line, i) =>
        `<text x="150" y="${150 + i * 34}" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#ffffff">${escapeXml(line)}</text>`
    )
    .join("")

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">` +
    `<rect width="300" height="450" fill="${bg}"/>` +
    `<rect x="16" y="16" width="268" height="418" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>` +
    titleLines +
    `<text x="150" y="400" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#ffffff" fill-opacity="0.85">${escapeXml(author)}</text>` +
    `</svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

// [id, isbn, title, author, category, year, pages, copies, description]
const RAW_BOOKS = [
  ["b1", "9780132350884", "Clean Code", "Robert C. Martin", "Programming", 2008, 464, 3, "A handbook of agile software craftsmanship with practical rules for writing readable, maintainable code."],
  ["b2", "9780135957059", "The Pragmatic Programmer", "Andrew Hunt, David Thomas", "Programming", 2019, 352, 2, "Timeless advice on becoming a better developer, from tooling to career habits."],
  ["b3", "9781593279509", "Eloquent JavaScript", "Marijn Haverbeke", "Programming", 2018, 472, 5, "A modern introduction to JavaScript, programming and the wonders of the digital world."],
  ["b4", "9798602477429", "You Don't Know JS Yet", "Kyle Simpson", "Programming", 2020, 143, 0, "A deep dive into the core mechanisms of the JavaScript language."],
  ["b5", "9781449373320", "Designing Data-Intensive Applications", "Martin Kleppmann", "Computers", 2017, 616, 1, "The big ideas behind reliable, scalable and maintainable data systems."],
  ["b6", "9780735211292", "Atomic Habits", "James Clear", "Self-Help", 2018, 320, 4, "An easy and proven way to build good habits and break bad ones."],
  ["b7", "9780062316097", "Sapiens", "Yuval Noah Harari", "History", 2015, 464, 2, "A brief history of humankind, from the Stone Age to the present."],
  ["b8", "9780062315007", "The Alchemist", "Paulo Coelho", "Fiction", 1988, 208, 0, "A shepherd boy journeys to Egypt in search of treasure and his personal legend."],
  ["b9", "9780441172719", "Dune", "Frank Herbert", "Fiction", 1965, 688, 3, "Politics, religion and ecology collide on the desert planet Arrakis."],
  ["b10", "9780553380163", "A Brief History of Time", "Stephen Hawking", "Science", 1988, 256, 2, "From the Big Bang to black holes, cosmology explained for general readers."],
  ["b11", "9781455586691", "Deep Work", "Cal Newport", "Business", 2016, 304, 1, "Rules for focused success in a distracted world."],
  ["b12", "9780374533557", "Thinking, Fast and Slow", "Daniel Kahneman", "Psychology", 2011, 499, 5, "How two systems of thought shape our judgments and decisions."],
  ["b13", "9780134757599", "Refactoring", "Martin Fowler", "Programming", 2018, 448, 2, "Improving the design of existing code, with a catalog of refactorings."],
  ["b14", "9780804139298", "Zero to One", "Peter Thiel", "Business", 2014, 224, 0, "Notes on startups and how to build the future."],
  ["b15", "9780140449136", "The Odyssey", "Homer", "Classics", -800, 560, 3, "The epic tale of Odysseus' journey home after the Trojan War."],
  ["b16", "9780140449266", "The Iliad", "Homer", "Classics", -750, 704, 1, "The story of the Trojan War and the wrath of Achilles."],
["b17", "9780140449181", "The Aeneid", "Virgil", "Classics", -19, 464, 2, "The epic poem of Aeneas' journey from Troy to Italy."],
["b18", "9780140449273", "The Divine Comedy", "Dante Alighieri", "Classics", 1320, 798, 4, "Dante's journey through Hell, Purgatory and Paradise."],
["b19", "9780140449204", "Paradise Lost", "John Milton", "Classics", 1667, 480, 0, "The epic poem about the fall of man and the rebellion of Satan."],
["b20", "9780140449198", "Beowulf", "Unknown", "Classics", 1000, 384, 1, "The Old English epic poem about the hero Beowulf and his battles with monsters."],
["b21", "9780140449211", "The Canterbury Tales", "Geoffrey Chaucer", "Classics", 1400, 432, 3, "A collection of stories told by pilgrims on their way to Canterbury."],
["b22", "9780140449228", "Don Quixote", "Miguel de Cervantes", "Classics", 1605, 992, 2, "The adventures of the delusional knight Don Quixote and his squire Sancho Panza."],
["b23", "9780140449235", "War and Peace", "Leo Tolstoy", "Classics", 1869, 1225, 1, "The epic novel about the French invasion of Russia and its impact on society."],
["b24", "9780140449242", "Crime and Punishment", "Fyodor Dostoevsky", "Classics", 1866, 430, 4, "The psychological novel about the moral dilemmas of a poor ex-student in St. Petersburg."],
["b25", "9780140449259", "The Brothers Karamazov", "Fyodor Dostoevsky", "Classics", 1880, 824, 0, "The philosophical novel about faith, doubt and reason in 19th century Russia."],
["b26", "9780140449266", "Anna Karenina", "Leo Tolstoy", "Classics", 1877, 864, 2, "The tragic story of a married aristocrat and her affair with the affluent Count Vronsky."],
["b27", "9780140449273", "Madame Bovary", "Gustave Flaubert", "Classics", 1856, 329, 3, "The story of a doctor's wife, Emma Bovary, who has adulterous affairs and lives beyond her means."],
["b28", "9780140449280", "The Count of Monte Cristo", "Alexandre Dumas", "Classics", 1844, 1276, 1, "The story of Edmond Dantès, a man wrongfully imprisoned who seeks revenge on those who betrayed him."],

]

export const MOCK_BOOKS = RAW_BOOKS.map(
  ([id, isbn, title, author, category, year, pages, copies, description], index) => ({
    id,
    title,
    author,
    category,
    year: String(year),
    isbn,
    publisher: "Demo Press",
    pages,
    description,
    image: generatedCover(title, author, index),
    fallbackImage: generatedCover(title, author, index),
    copies,
    available: copies > 0,
  })
)