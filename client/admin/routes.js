import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

import { renderRouteComponent } from '../reactAdapters';

const routeGroup = FlowRouter.group({
	name: 'admin',
	prefix: '/admin',
});

export const registerAdminRoute = (path, { lazyRouteComponent, props, action, ...options } = {}) => {
	routeGroup.route(path, {
		...options,
		action: (params, queryParams) => {
			if (action) {
				action(params, queryParams);
				return;
			}

			renderRouteComponent(() => import('./AdministrationRouter'), {
				template: 'main',
				region: 'center',
				propsFn: () => ({ lazyRouteComponent, ...options, params, queryParams, ...props }),
			});
		},
	});
};

registerAdminRoute('/', {
	triggersEnter: [(context, redirect) => {
		redirect('admin-info');
	}],
});

registerAdminRoute('/custom-sounds/:context?/:id?', {
	name: 'custom-sounds',
	lazyRouteComponent: () => import('./customSounds/AdminSoundsRoute'),
});


registerAdminRoute('/info', {
	name: 'admin-info',
	lazyRouteComponent: () => import('./info/InformationRoute'),
});

registerAdminRoute('/import', {
	name: 'admin-import',
	lazyRouteComponent: () => import('./import/ImportRoute'),
	props: { page: 'history' },
});

registerAdminRoute('/import/new/:importerKey?', {
	name: 'admin-import-new',
	lazyRouteComponent: () => import('./import/ImportRoute'),
	props: { page: 'new' },
});

registerAdminRoute('/import/prepare', {
	name: 'admin-import-prepare',
	lazyRouteComponent: () => import('./import/ImportRoute'),
	props: { page: 'prepare' },
});

registerAdminRoute('/import/progress', {
	name: 'admin-import-progress',
	lazyRouteComponent: () => import('./import/ImportRoute'),
	props: { page: 'progress' },
});

registerAdminRoute('/mailer', {
	name: 'admin-mailer',
	lazyRouteComponent: () => import('./mailer/MailerRoute'),
});

registerAdminRoute('/custom-user-status/:context?/:id?', {
	name: 'custom-user-status',
	lazyRouteComponent: () => import('./customUserStatus/CustomUserStatusRoute'),
});

registerAdminRoute('/emoji-custom/:context?/:id?', {
	name: 'emoji-custom',
	lazyRouteComponent: () => import('./customEmoji/CustomEmojiRoute'),
});

registerAdminRoute('/users/:context?/:id?', {
	name: 'admin-users',
	lazyRouteComponent: () => import('./users/UsersRoute'),
});

registerAdminRoute('/rooms/:context?/:id?', {
	name: 'admin-rooms',
	lazyRouteComponent: () => import('./rooms/RoomsRoute'),
});

registerAdminRoute('/invites', {
	name: 'invites',
	lazyRouteComponent: () => import('./invites/InvitesRoute'),
});

registerAdminRoute('/view-logs', {
	name: 'admin-view-logs',
	lazyRouteComponent: () => import('./viewLogs/ViewLogsRoute'),
});

Meteor.startup(() => {
	registerAdminRoute('/:group+', {
		name: 'admin',
		lazyRouteComponent: () => import('./settings/SettingsRoute'),
	});
});
