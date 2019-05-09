import { RouterStateSnapshot } from '@angular/router';
import { RouterStateUrl } from './router-state-url';

export class CustomRouterStateSerializer {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    let { params } = route;

    while (route.parent) {
      route = route.parent;

      params = { ...route.params, ...params };
    }

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
