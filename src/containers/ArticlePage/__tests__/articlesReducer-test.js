/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from '../articlesReducer';
import * as actions from '../articleActions';

test('reducers/article initalState', () => {
  const nextState = reducer(undefined, { type: 'Noop' });

  expect(nextState).toEqual({
    all: {},
    isLoading: false,
  });
});

test('reducers/article set article', () => {
  const nextState = reducer(
    undefined,
    actions.setArticle({ id: 1, title: 'Unit test' }),
  );

  expect(nextState).toEqual({
    all: {
      1: { id: 1, title: 'Unit test' },
    },
    isLoading: false,
  });
});

test('reducers/article set multiple articles', () => {
  const state = reducer(
    undefined,
    actions.setArticle({ id: 1, title: 'Unit test 1' }),
  );
  const nextState = reducer(
    state,
    actions.setArticle({ id: 2, title: 'Unit test 2' }),
  );

  expect(nextState).toEqual({
    all: {
      1: { id: 1, title: 'Unit test 1' },
      2: { id: 2, title: 'Unit test 2' },
    },
    isLoading: false,
  });
});

test('reducers/article overwrite articles with same id', () => {
  const nextState = reducer(
    {
      all: { 1: { id: 1, title: 'Unit test 1' } },
    },
    actions.setArticle({ id: 1, title: 'Unit test 2' }),
  );

  expect(nextState).toEqual({
    all: {
      1: { id: 1, title: 'Unit test 2' },
    },
  });
});
