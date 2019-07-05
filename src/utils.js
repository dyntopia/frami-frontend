import _ from 'lodash/fp';

const isEmpty = _.allPass([_.isEmpty, _.negate(_.isNumber)]);

const filterObj = _.omitBy(isEmpty);

export { isEmpty, filterObj };
