import * as sapper from '@sapper/app';
import { Footer, NavigationBar, StagingBanner } from '@electinth/common/';

customElements.define('elect-footer', Footer);
customElements.define('navigation-bar', NavigationBar);
customElements.define('staging-banner', StagingBanner);

sapper.start({
  target: document.querySelector('#sapper'),
});
