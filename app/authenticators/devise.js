import Devise from 'ember-simple-auth/authenticators/devise';
import config from 'pick-another-client/config/environment';

export default Devise.extend({
  serverTokenEndpoint: `${config.host}/users/sign_in`,
  identificationAttributeName: 'login'
});
