let assignments = [
  {
    id: "assignment1",
    title: "Uppgift 1",
    link: "./assignments/assignment1/index.html",
    description:
      "Uppgiften gick ut på att skapa ett separat GitHub-repository för kursens inlämningsuppgifter och publicera det via GitHub Pages med en dynamiskt genererad landningssida. Fokus låg på korrekt versionshantering, relativa sökvägar samt användning av HTML, CSS och JavaScript för navigation och struktur.",
  },
  {
    id: "assignment2",
    title: "Uppgift 2",
    link: "./assignments/assignment2/index.html",
    description:
      "Uppgiften gick ut på att bygga en dynamisk produktsida där produkter renderas med JavaScript från en egen datastruktur och kan läggas i en kundvagn. Kundvagnen skulle hantera antal, totalsumma och sparas i localStorage så att innehållet finns kvar även efter omladdning av sidan.",
  },
];

export function assignmentPage(element, container) {
  let titleElement = document.createElement("h3");
  titleElement.textContent = assignments[element].title;
  let descElement = document.createElement("p");
  descElement.textContent = assignments[element].description;
  container.appendChild(titleElement);
  container.appendChild(descElement);
}

export function navTabs(container, element) {
  let counter = 0;
  for (const assignment of assignments) {
    let linkElement = document.createElement("a");
    linkElement.href = assignment.link;
    linkElement.innerHTML = assignment.title;
    let listItem = document.createElement("li");
    if (element == counter) {
      linkElement.classList.add("current-tab");
    }
    counter++;
    container.appendChild(listItem);
    listItem.appendChild(linkElement);
  }
}

export function assignmentsOutput(container) {
  for (const assignment of assignments) {
    let id = assignment.id;
    let title = assignment.title;
    let link = assignment.link;
    let desc = assignment.description;

    const card = document.createElement("div");
    card.id = id;

    let titleElement = document.createElement("h3");
    titleElement.textContent = title;
    let descElement = document.createElement("p");
    descElement.textContent = desc;

    let linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.innerHTML =
      "Öppna <svg viewBox='0 0 512 512'><path d='M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0-201.4 201.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3 448 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 96C35.8 96 0 131.8 0 176L0 432c0 44.2 35.8 80 80 80l256 0c44.2 0 80-35.8 80-80l0-80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 80c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l80 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 96z'/></svg>";
    linkElement.classList.add("btn");

    card.appendChild(titleElement);
    card.appendChild(descElement);
    card.appendChild(linkElement);

    card.classList.add("card");

    container.appendChild(card);
  }
}
