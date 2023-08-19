import { error } from '@sveltejs/kit';

export function load({ params }: any) {
  if (params.username && params.orgname && params.productId) {
    return {
      username: params.username,
      orgname: params.orgname,
      productId: params.productId,
    };
  }

  throw error(404, 'Not found');
}
