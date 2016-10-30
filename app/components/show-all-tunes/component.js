import Ember from 'ember';

export default Ember.Component.extend({
  showTunes: true,

  actions: {
    toggleTunes() {
      this.toggleProperty('showTunes');
    }
  }
});
