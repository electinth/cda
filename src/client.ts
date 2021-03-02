import * as sapper from '@sapper/app';
import { Footer } from '@electinth/common';

customElements.define('elect-footer', Footer);

sapper.start({
  target: document.querySelector('#sapper'),
});
