import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.username && params.orgname && params.showcaseId) {
    return {
      username: params.username,
      orgname: params.orgname,
      showcaseId: params.showcaseId,
    };
  }

  throw error(404, 'Not found');
}
