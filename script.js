// Participant class with a constructor
class Participant {
  constructor(name, city, picture) {
    this.name = name;
    this.city = city;
    this.picture = picture;
  }
};

// function to load participant data from external source
async function loadParticipantData(data) {
  // array for participant Objects to be reviewed for display
  const participantsOnPage = [];

  try {
    const response = await fetch(data);
    const participants = await response.json();

    // load all participants into Object array from the data
    participants.forEach(function(participant) {
      participantsOnPage.push(new Participant(participant.name,
        participant.city,
        participant.image))
    });
  } catch (error) {
    console.error(error);
  }

  return participantsOnPage;
};

// initial events on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async (event) => {
  const participants = await loadParticipantData('participants.json');
  createFilteredParticipantsDOM(participants, 'All cities');
  createParticipants(participants);
  console.log("DOM content loaded and parsed successfully");
});

// function to generate all filtered participants
function createFilteredParticipantsDOM(participants, city) {
  // select all participant items and loop through them
  participants.forEach(function(item) {
    // if the item contains the selected city, create it
    if (item.city === city || city === 'All cities') {
      createParticipantHTML(item);
    }
  });
};

// function to create a participant HTML entry
function createParticipantHTML(participant) {
  const ul = document.querySelector('article ul:nth-child(3)');

  // create a new item structure
  const li = document.createElement('li');
  ul.appendChild(li);
  const a = document.createElement('a');
  li.appendChild(a);
  const img = document.createElement('img');
  a.appendChild(img);
  const h4 = document.createElement('h4');
  a.appendChild(h4);
  const p = document.createElement('p');
  a.appendChild(p);

  // add participant data to the HTML elements
  img.setAttribute('src', participant.picture);
  img.setAttribute('alt', participant.name.split(' ')[0]);
  h4.innerHTML = participant.name + ' &raquo;';
  p.innerHTML = participant.city;
  a.appendChild(img);
  a.appendChild(h4);
  a.appendChild(p);
  a.setAttribute('href', '#');
  li.appendChild(a);
  ul.appendChild(li);
};

// function to create buttons interaction and participants HTML
function createParticipants(participants) {
  // select all filter buttons and store them in a variable
  const filterButtons = document.querySelectorAll('article button');

  // loop through each filter button
  filterButtons.forEach(function(button) {
    // add click event listener to each filter button
    button.addEventListener('click', function() {
      // remove previously loaded participants
      removePreviousContent();
      // remove active class from all filter buttons
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      // add active class to the clicked filter button
      this.classList.add('active');
      // get the city name from the clicked button
      const city = this.textContent;

      createFilteredParticipantsDOM(participants, city);

      participantsMouseoverOpacity();
    });
  });
};

// function to remove previously loaded participants
function removePreviousContent() {
  // first, we need to remove all previous photos content
  const previousElements = document.querySelectorAll('article > ul:nth-child(3) > li');
  // then, we remove all the elements
  previousElements.forEach((el) => el.remove());
}

function participantsMouseoverOpacity() {
  // select all participant images and store them in a variable
  const participantImages = document.querySelectorAll('article img');

  // loop through each participant image
  participantImages.forEach(function(image) {
    // add mouseover event listener to each participant image
    image.addEventListener('mouseover', function() {
      // change opacity and background color on mouseover
      this.style.opacity = '0.5';
    });
    // add mouseout event listener to each participant image
    image.addEventListener('mouseout', function() {
      // change opacity and background color back on mouseout
      this.style.opacity = '1';
    });
  });
};

// add event listener to show the language menu
const button = document.querySelector('.language');
const dropdown = document.querySelector('.language-dropdown');

button.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});