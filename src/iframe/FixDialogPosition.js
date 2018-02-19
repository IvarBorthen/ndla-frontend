/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import {
  forEachElement,
  findAncestorByClass,
  getElementOffset,
} from 'ndla-article-scripts';

/**
 * Since iframes often have a height higher then the viewport, some of
 * our css for align dialogs in the middle of the screen does not work. The
 * solution is to postions the dialogs absolutely.
 */
class FixDialogPosition extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.updateDialogPositions);
    this.updateDialogPositions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDialogPositions);
  }

  updateDialogPositions = () => {
    forEachElement('.c-figure [data-dialog-trigger-id]', el => {
      const target = el;
      const figure = findAncestorByClass(target, 'c-figure');
      const parentOffset = getElementOffset(figure.offsetParent).top;
      const top =
        figure.getBoundingClientRect().top + window.pageYOffset - parentOffset;

      const id = target.getAttribute('data-dialog-trigger-id');
      const dialog = document.querySelector(`[data-dialog-id='${id}']`);

      const dialogContent = dialog.querySelector(`.c-dialog__content`);
      dialogContent.style.top = `${top}px`;
      dialogContent.style.bottom = 'auto';
      dialogContent.style.position = 'absolute';
    });
  };

  render() {
    return (
      <Helmet>
        {/* Remove fadeIn animation which looks weird with postion: absolute  */}
        {/* And a minor fix for c-licensebox */}
        <style type="text/css">{`
          .c-article--iframe .c-dialog--active .c-dialog__content {
            transform: none !important;
            animation-name: zoomIn !important;
          }
          .c-licensebox__content {
            position: relative;
          }
        `}</style>
      </Helmet>
    );
  }
}

export default FixDialogPosition;
