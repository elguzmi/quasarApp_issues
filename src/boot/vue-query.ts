import { VueQueryPlugin } from '@tanstack/vue-query';
import { boot } from 'quasar/wrappers';
export default boot(async ({ app }) => {
  // something to do
  // App es la instancia de la palicacion de vue
  VueQueryPlugin.install(app, {
    // configuraciones
  });
});
