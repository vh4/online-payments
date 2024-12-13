import { Injectable } from '@nestjs/common';
import { ErrorFormatService } from './error-format/error-format.service';
import axios, { AxiosResponse } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { MessageService } from './message/message.service';

interface ExtendedJwtPayload extends JwtPayload {
  data: string;
}

@Injectable()
export class HelpersService {
  constructor(
    private error: ErrorFormatService,
    private message: MessageService,
  ) {}
  Mid(): string {
    const first = Date.now();
    const second = Math.floor((first % 1000) * 10)
      .toString()
      .padStart(2, '0');
    const thirth = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `${first}${second}${thirth}`.slice(0, 19);
  }
  async HitStukUrl(url: string, data: object | null): Promise<any> {
    try {
      const response: AxiosResponse = data
        ? await axios.post(url, data, { timeout: 60 * 1000 })
        : await axios.post(url, { timeout: 60 * 1000 });

      return response.data;
    } catch (error: any) {
      this.error.throwError(500, '03', error.message);
    }
  }
  async decryptToken(token: string): Promise<string | undefined> {
    const jwtDecoded = jwtDecode<ExtendedJwtPayload>(token);
    const resp = this.message.TransactionNotPermittedToTerminal();
    if (!jwtDecoded || !jwtDecoded.data) {
      this.error.throwError(401, resp.responseCode, resp.responseMessage);
    }
    const url = `${process.env.URL_AUTH_REDIRECT}/index.php?dekrip=null`;
    const response = await this.HitStukUrl(url, {
      dekrip: jwtDecoded.data,
    });
    return response;
  }
}
