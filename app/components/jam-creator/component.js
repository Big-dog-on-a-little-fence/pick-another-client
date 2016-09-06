import Ember from 'ember';
import {
  task,
  // jshint ignore:start
  restartable,
  // jshint ignore:end
  timeout
} from 'ember-concurrency';

const DEBOUNCE_MS = 250;

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  searchMusicians: task(function*(term) {
    if (Ember.isBlank(term)) {
      return [];
    }
    yield timeout(DEBOUNCE_MS);
    let users = yield this.get('store').query('user', { starts_with: term });
    return users;
  }).restartable(),
  actions: {
    createJam() {
      console.log('create');
    }
  }
});
