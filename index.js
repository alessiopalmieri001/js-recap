const fetchButton = document.getElementById("fetchButton");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const peopleList = document.getElementById("peopleList");

let prevUrl = "https://swapi.dev/api/people";
let nextUrl = "https://swapi.dev/api/people";

const fetchMyData = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

const renderPeopleList = (list) => {
  peopleList.innerHTML = "";
  list.forEach((content) => {
    const li = document.createElement("li");
    li.append(content);
    peopleList.append(li);
  });
};

const getListContent = (results) => {
  return Promise.all(
    results.map(async (person) => {
      const homeworld = await fetchMyData(person.homeworld);
      return `${person.name} - ${homeworld.name}`;
    })
  );
};

const setNextPrevUrls = (data) => {
  prevUrl = data.previous;
  nextUrl = data.next;
};

const renderPage = async (url) => {
  const data = await fetchMyData(url);
  setNextPrevUrls(data);
  const list = await getListContent(data.results);
  renderPeopleList(list);
};

prevButton.addEventListener("click", () => {
  if (prevUrl) {
    renderPage(prevUrl);
  }
});

nextButton.addEventListener("click", () => {
  if (nextUrl) {
    renderPage(nextUrl);
  }
});

fetchButton.addEventListener("click", () => {
  renderPage("https://swapi.dev/api/people");
});
