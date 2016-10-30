import Ember from 'ember';

const {
  Component,
  computed,
  observer
} = Ember;

export default Component.extend({
  showTunes: true,
  currentTuneChanged: observer('currentTune', function() {
    if (this.get('showTunes')) {
      let container = this.$(`.${this.get('styles.tunes')}`);
      let target = this.$(`#tune${this.get('currentTune.id')}`);
      let verticalCoord = target.offset().top;
      let scrollTop = container.scrollTop() - container.offset().top + verticalCoord;
      container.scrollTop(scrollTop);
    }
  }),
  actions: {
    toggleTunes() {
      this.toggleProperty('showTunes');
    }
  }
});
