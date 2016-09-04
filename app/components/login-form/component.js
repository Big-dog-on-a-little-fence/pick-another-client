import Ember from 'ember';
import {
  task,
  // jshint ignore:start
  drop
  // jshint ignore:end
} from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: 'centered',
  session: Ember.inject.service('session'),
  authenticate: task(function*(creds) {
    try {
      let { identification, password } = creds;
      this.set('errorMessage', false);
      yield this.get('session').authenticate('authenticator:devise', identification, password);
    } catch(reason) {
      this.set('errorMessage', reason.error || reason);
    }
  }).drop(),
  actions: {
    authenticate() {
      this.get('authenticate').perform(this.getProperties('identification', 'password'));
    },
    clearError() {
      this.set('errorMessage', false);
    }
  }
});
