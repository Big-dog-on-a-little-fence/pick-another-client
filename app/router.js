import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('jams', function() {
    this.route('show', { path: ':jamId' });
    this.route('new');
  });
  this.route('users');
  this.route('tunes');
});

export default Router;
