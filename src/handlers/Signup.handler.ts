import { EventBus } from 'quasar';
import { EventNamesEnum } from 'src/lib/enums/eventNames.enum';
import { UrlPathsEnum } from 'src/lib/enums/urlPaths.enum';
import { requestApi } from 'src/lib/requests/default.request';

export class SignupHandler {
  static handleSignup(eventSource: EventBus) {
    eventSource.on(
      EventNamesEnum.SIGN_UP,
      async (signupModel: Record<string, unknown>) => {
        try {
          await requestApi(UrlPathsEnum.SIGN_UP, 'post', { body: signupModel });
        } catch (error) {}
      }
    );
  }
}
