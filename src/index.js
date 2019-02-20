 function component() {
   var element = document.createElement('div');
   var button = document.createElement('button');
   var br = document.createElement('br');

   button.innerHTML = 'Click me and look at the console!';
   element.innerHTML = join(['Hello', 'webpack'], ' ');
   element.appendChild(br);
   element.appendChild(button);

   // Assume we are in the context of `window`
   this.alert('Hmmm, this probably isn\'t a great idea...')

   // Note that because a network request is involved, some indication
   // of loading would need to be shown in a production-level site/app.
   button.onclick = e => import( /* webpackChunkName: "print" */ './print').then(module => {
     var print = module.default;

     print();
   });

   return element;
 }

 document.body.appendChild(component());