const button = document.querySelector('.language');
const dropdown = document.querySelector('.language-dropdown');

button.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

const links = dropdown.querySelectorAll('a');

links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const href = link.getAttribute('href');
    window.location.href = href;
  });
});

// select all filter buttons and store them in a variable
const filterButtons = document.querySelectorAll('article button');

// loop through each filter button
filterButtons.forEach(function(button) {
  // add click event listener to each filter button
  button.addEventListener('click', function() {
    // remove active class from all filter buttons
    filterButtons.forEach(function(btn) {
      btn.classList.remove('active');
    });
    // add active class to the clicked filter button
    this.classList.add('active');
    // get the city name from the clicked button
    const city = this.textContent;
    // select all participant items and loop through them
    document.querySelectorAll('article > ul:nth-child(3) > li').forEach(function(item) {
      // if the item contains the selected city, display it
      if (item.querySelector('p').textContent === city || city === 'All cities') {
        item.style.display = 'block';
      } else {
        // otherwise, hide it
        item.style.display = 'none';
      }
    });
  });
});

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