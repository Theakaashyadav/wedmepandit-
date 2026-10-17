async function loadFragment(targetId, path) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
  target.innerHTML = await response.text();
}

Promise.all([
  loadFragment('header', '/header.html'),
  loadFragment('footer', '/footer.html')
]).then(() => {
  const menuButton = document.querySelector('.menu-btn');
  const navigation = document.querySelector('.nav-links');

  if (menuButton && navigation) {
    menuButton.setAttribute('role', 'button');
    menuButton.setAttribute('tabindex', '0');
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    menuButton.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
      const isOpen = navigation.classList.toggle('show');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    };

    menuButton.addEventListener('click', toggleMenu);
    menuButton.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
      }
    });
  }
}).catch(error => console.error(error));
