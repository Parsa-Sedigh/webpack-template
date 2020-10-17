import HelloWorldButton from './components/hello-world-button/hello-world-button';
import addImage from './add-image';
import Heading from './components/heading/Heading';

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

// addImage();

const heading = new Heading();
heading.render();

if (process.env.NODE_ENV === 'production') {
    console.log('Production mode');
} else if (process.env.NODE_ENV === 'development') {
    console.log('Development mode');
}

helloWorldButton.methodNotExists();
