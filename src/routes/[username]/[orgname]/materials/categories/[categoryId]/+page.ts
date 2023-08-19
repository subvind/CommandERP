import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.username && params.orgname && params.categoryId) {
    return {
      username: params.username,
      orgname: params.orgname,
      categoryId: params.categoryId,
    };
  }

  throw error(404, 'Not found');
}
