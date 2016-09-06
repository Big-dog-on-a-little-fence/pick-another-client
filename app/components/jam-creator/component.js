import Ember from 'ember';
import {
  task,
  // jshint ignore:start
  restartable,
  drop,
  // jshint ignore:end
  timeout
} from 'ember-concurrency';

const DEBOUNCE_MS = 250;

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  selectedMusicians: [],
  searchMusicians: task(function*(term) {
    if (Ember.isBlank(term)) {
      return [];
    }
    yield timeout(DEBOUNCE_MS);
    let users = yield this.get('store').query('user', { starts_with: term });
    return users;
  }).restartable(),
  createJam: task(function*(selected) {
    this.set('errorMessage', false);
    try {
      let jam = yield this.get('store').createRecord('jam', { users: selected });
      yield jam.save();
      return this.get('transitionToJam')(jam.id);
    } catch(reason) {
      this.set('errorMessage', reason.error || reason);
    }
  }).drop()
});
