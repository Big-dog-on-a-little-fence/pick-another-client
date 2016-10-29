import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
    name: attr(),
    key: attr(),
    timeSignature: attr(),
    jams: hasMany('jams')
});
