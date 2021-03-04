import * as sapper from '@sapper/app';
import { Footer, NavigationBar } from '@electinth/common/';

customElements.define('elect-footer', Footer);
customElements.define('navigation-bar', NavigationBar);

sapper.start({
  target: document.querySelector('#sapper'),
});
