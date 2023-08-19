import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.username && params.orgname && params.inventoryId) {
    return {
      username: params.username,
      orgname: params.orgname,
      inventoryId: params.inventoryId,
    };
  }

  throw error(404, 'Not found');
}
