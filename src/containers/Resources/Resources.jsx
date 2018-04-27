/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectT } from 'ndla-i18n';
import { ResourceGroup, ContentTypeBadge } from 'ndla-ui';
import getContentTypeFromResourceTypes from '../../util/getContentTypeFromResourceTypes';
import { ResourceTypeShape, ResourceShape } from '../../shapes';
import { resourceToLinkProps } from './resourceHelpers';
import { getResourceGroups } from './getResourceGroups';

const Resources = ({
  t,
  resourceTypes,
  supplementaryResources,
  coreResources,
}) => {
  if (
    resourceTypes === null ||
    (coreResources === null && supplementaryResources === null)
  ) {
    return (
      <p style={{ border: '1px solid #eff0f2', padding: '13px' }}>
        {t('resource.errorDescription')}
      </p>
    );
  }

  const resourceGroups = getResourceGroups(
    resourceTypes,
    supplementaryResources || [],
    coreResources || [],
  );

  const resourceGroupsWithMetaData = resourceGroups.map(type => ({
    ...type,
    contentType: getContentTypeFromResourceTypes([type]).contentType,
  }));

  return resourceGroupsWithMetaData.map(type => (
    <ResourceGroup
      key={type.id}
      title={type.name}
      resources={type.resources}
      contentType={type.contentType}
      icon={<ContentTypeBadge type={type.contentType} />}
      messages={{
        noCoreResourcesAvailable: t('resource.noCoreResourcesAvailable'),
        activateAdditionalResources: t('resource.activateAdditionalResources'),
        toggleFilterLabel: t('resource.toggleFilterLabel'),
      }}
      resourceToLinkProps={resourceToLinkProps}
    />
  ));
};

Resources.propTypes = {
  resourceTypes: PropTypes.arrayOf(ResourceTypeShape),
  coreResources: PropTypes.arrayOf(ResourceShape),
  supplementaryResources: PropTypes.arrayOf(ResourceShape),
};

export default injectT(Resources);
