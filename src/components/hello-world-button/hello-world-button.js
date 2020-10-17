//  import './hello-world-button.css';
import './hello-world-button.scss'; 

 class HelloWorldButton {

    /* Most browsers and also node.js only allow methods inside JS classes not properties like below.So we must use babel
    in our loaders.So we must write a new rule in our config file.This rule will apply to all JS files except those 
    files that are located in node_modules folder.  */
    buttonCSSClass = 'hello-world-button';

    render() {
      const button = document.createElement('button');
      const body = document.querySelector('body');
      button.innerHTML = 'Hello world!';
      button.classList.add(this.buttonCSSClass);
      body.appendChild(button);

      button.onclick = () => {
          const p = document.createElement('p');
          p.innerHTML = 'Hello world!';
          p.classList.add('hello-world-text');
          body.appendChild(p);
      };

    }
};

export default HelloWorldButton;


