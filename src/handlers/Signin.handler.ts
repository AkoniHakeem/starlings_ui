import { EventBus } from 'quasar';
import { EventNamesEnum } from 'src/lib/enums/eventNames.enum';
import { UrlPathsEnum } from 'src/lib/enums/urlPaths.enum';
import { requestApi } from 'src/lib/requests/default.request';

export class SigninHandler {
  static handleSignin(eventSource: EventBus) {
    eventSource.on(
      EventNamesEnum.SIGN_IN,
      async (signinModel: Record<string, unknown>) => {
        try {
          await requestApi(UrlPathsEnum.SIGN_IN, 'post', { body: signinModel });
        } catch (error) {}
      }
    );
  }
}
