// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';

import {
    getConfig,
    getLicense,
} from 'mattermost-redux/selectors/entities/general';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {getStandardAnalytics} from 'mattermost-redux/actions/admin';
import {bindActionCreators, Dispatch} from 'redux';
import {GenericAction} from 'mattermost-redux/types/actions';

import {GlobalState} from 'types/store';

import {isAdmin} from 'utils/utils.jsx';

import InvitationModalMembersStep from './invitation_modal_members_step';

function mapStateToProps(state: GlobalState) {
    return {
        userLimit: getConfig(state).ExperimentalCloudUserLimit,
        analytics: state.entities.admin.analytics,
        userIsAdmin: isAdmin(getCurrentUser(state).roles),
        isCloud: getLicense(state).Cloud === 'true',
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators(
            {
                getStandardAnalytics,
            },
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationModalMembersStep);
