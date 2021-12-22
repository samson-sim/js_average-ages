'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menDiedThisCentury = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person =>
      Math.ceil(person.died / 100) === century
      && person.sex === 'm');
  const numberOfDiedMen = menDiedThisCentury.length;
  const menAges = menDiedThisCentury.map(man => man.died - man.born);
  const averageAge = menAges.reduce((a, b) => a + b, 0) / numberOfDiedMen;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenWithChildren = !withChildren
    ? people.filter(woman => woman.sex === 'f')
    : people.filter(woman =>
      people.some(child => child.mother === woman.name));
  const numberOfWomen = womenWithChildren.length;
  const womenAges = womenWithChildren.map(woman => woman.died - woman.born);
  const averageAge = womenAges.reduce((a, b) => a + b, 0) / numberOfWomen;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = !onlyWithSon
    ? people.filter(child =>
      people.some(mother => child.mother === mother.name))
    : people.filter(child =>
      people.some(mother => child.mother === mother.name && child.sex === 'm'));

  const ageDiff = children.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  return ageDiff.reduce((a, b) => a + b, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
