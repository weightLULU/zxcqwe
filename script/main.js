const burger = document?.querySelector('.header__burger');
  const nav = document?.querySelector('.nav__left');
  const body = document.body;
  const link = document?.querySelectorAll('.left__links');

  burger.addEventListener('click', () => {
    body.classList.toggle('stop-scroll');
    burger.classList.toggle('burger--active');
    nav.classList.toggle('nav-visible');  
  });
  function changeImage(imageUrl) {
    document.getElementById('mainImage').src = imageUrl;
}
