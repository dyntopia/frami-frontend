import _ from 'lodash/fp';

const isEmpty = _.allPass([_.isEmpty, _.negate(_.isNumber)]);

const filterObj = _.omitBy(isEmpty);

const hasGroup = (group) => _.compose(_.includes(group), _.get('groups'));

const isPatient = hasGroup('patient');

/* eslint-disable camelcase */
const isStaff = _.anyPass([_.isMatch({ is_staff: true }), hasGroup('admin')]);
/* eslint-enable camelcase */

export { isEmpty, isPatient, isStaff, filterObj };
