import * as sapper from '@sapper/app';
import {
  Footer,
  NavigationBar,
  StagingBanner,
  SocialSharer,
} from '@electinth/common/';

customElements.define('elect-footer', Footer);
customElements.define('navigation-bar', NavigationBar);
customElements.define('staging-banner', StagingBanner);
customElements.define('social-sharer', SocialSharer);

sapper.start({
  target: document.querySelector('#sapper'),
});
