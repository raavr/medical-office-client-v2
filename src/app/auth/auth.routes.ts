import { isUnprotectedRouteFn } from '../core/utils/utils';

export const UnprotectedRoutePaths = {
  SIGNUP: 'signup',
  LOGIN: 'login',
  RESET: 'reset'
}

export const isUnprotectedRoute = isUnprotectedRouteFn(Object.values(UnprotectedRoutePaths));