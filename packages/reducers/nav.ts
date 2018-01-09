import { AppNavigator } from 'navigators'

export const getCurrentRoute = (state) => {
  const findCurrentRoute = (navState) => {
    if (navState.index !== undefined) {
      return findCurrentRoute(navState.routes[navState.index])
    }
    return navState.routeName
  }
  return findCurrentRoute(state.nav)
}

export const isFocusingOn = (state: Object) => (route: String) => (getCurrentRoute(state) === route)

export default (state, action) => AppNavigator.router.getStateForAction(action, state)
