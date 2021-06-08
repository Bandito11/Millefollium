export const routes = {
  baseUrl: '/',
  recipe: {
    add: '/recipe/add',
    edit: (name: string) => `/recipe/edit/${name}`,
    info: (name) => `/recipe/${name}`,
  },
  profile: '/profile',
};
