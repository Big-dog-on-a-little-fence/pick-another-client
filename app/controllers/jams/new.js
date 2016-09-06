import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transitionToJam(jamId) {
      return this.transitionToRoute('jams.show', jamId);
    }
  }
});
