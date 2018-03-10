import { AppNavigator } from 'navigators'
import { NavigationActions } from 'react-navigation'

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

export const getResetAction = (routeInput: Object) => {
  return NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate(routeInput)
    ],
    key: null
  })
}

export default (state, action) => AppNavigator.router.getStateForAction(action, state)
