import { TokenService } from './token.service';
import { DOMAINS } from '../constants/auth.constant';

export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getToken();
    },
    whitelistedDomains: DOMAINS.WHITE_LISTED,
    blacklistedRoutes: DOMAINS.BLACK_LISTED
  }
}