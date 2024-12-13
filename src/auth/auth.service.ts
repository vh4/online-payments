import { Injectable } from '@nestjs/common';
import { UserAuthDto } from './dto/auth.dto';
import { HelpersService } from 'src/helpers/helpers.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { MessageService } from 'src/helpers/message/message.service';

@Injectable()
export class AuthService {
  constructor(
    private helpers: HelpersService,
    private error: ErrorFormatService,
    private message: MessageService,
  ) {}
  async authLoginPost(data: UserAuthDto, info: object) {
    const resp = this.message.TransactionNotPermittedToTerminal();
    const urlCaptcha = `${process.env.GOOGLE_CAPTCHA_URL}secret=${process.env.GOGGLE_CAPTCHA_KEY}&response=${data.token}`;
    const captcha = await this.helpers.HitStukUrl(urlCaptcha, null);

    if (!captcha.success) {
      this.error.throwError(401, resp.responseCode, resp.responseMessage);
    }
    const requests = {
      username: data.username,
      method: 'rajabiller.login_travel',
      password: data.password,
    };
    const urlAuth = `${process.env.RB_URL}/json.php`;
    const auth = await this.helpers.HitStukUrl(urlAuth, requests);
    if (auth.rc !== '00') {
      this.error.throwError(401, resp.responseCode, resp.responseMessage);
    }

    const decryptAuth = await this.helpers.decryptToken(auth.token);
    if (!decryptAuth || decryptAuth.trim() === '') {
      this.error.throwError(401, resp.responseCode, resp.responseMessage);
    }

    const [uid, pin] = decryptAuth.split('|');
    if (!uid || !pin) {
      this.error.throwError(401, resp.responseCode, resp.responseMessage);
    }
    const response = {
      token: auth.token,
      id_outlet: auth.id_outlet,
      authname: auth.authname,
      uid,
      pin,
      data1: auth.data1,
      data2: auth.data2,
    };

    return response;
  }
}
