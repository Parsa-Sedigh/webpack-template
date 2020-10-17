import parsa from './Screenshot from 2020-04-19 21-03-27.png';

const addImage = () => {
   const image = document.createElement('img');
   image.src = parsa;
   image.width = '300';
   image.alt = 'parsa';

   const body = document.querySelector('body');
   body.appendChild(image);
};

export default addImage;