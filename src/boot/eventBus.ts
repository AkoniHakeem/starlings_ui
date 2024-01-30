import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';

// regist $eventBus hook
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $eventBus: EventBus;
  }
}

export default boot(({ app }) => {
  const eventBus = new EventBus();

  app.provide('eventBus', eventBus);
});
