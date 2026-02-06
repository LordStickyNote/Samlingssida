export function assignmentsOutput(container) {
  let assignments = [
    {
      id: "assignment1",
      title: "Uppgift 1 - Samlingssida för inlämningsuppgifter",
      link: "/",
      description: "En beskrivning",
    },
    {
      id: "assignment2",
      title: "Uppgift 2 - venne",
      link: "https://google.com",
      description: "En till beskrivning",
    },
  ];

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
    linkElement.innerHTML = "Öppna <svg viewBox='0 0 512 512'><path d='M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0-201.4 201.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3 448 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 96C35.8 96 0 131.8 0 176L0 432c0 44.2 35.8 80 80 80l256 0c44.2 0 80-35.8 80-80l0-80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 80c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l80 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 96z'/></svg>";
    linkElement.classList.add("btn");

    card.appendChild(titleElement);
    card.appendChild(descElement);
    card.appendChild(linkElement);

    container.appendChild(card);
  }
}
