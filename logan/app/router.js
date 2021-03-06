import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
} from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { JHeader } from './components'
import MainPage from './containers/Main'
import ModalAuth from './containers/ModalAuth'
import OrderView from './containers/OrderView'
import CreateOrder from './containers/CreateOrder'
import CreateOrderDetails from './containers/CreateOrderDetails'
import CreateOrderItems from './containers/CreateOrderItems'

const AppNavigator = createStackNavigator(
  {
    Auth: { screen: ModalAuth },
    Main: { 
      screen: MainPage,
      navigationOptions: {
				header: <JHeader title={'Today'} logout/>,
			},
    },
    OrderView: { 
      screen: OrderView,
      navigationOptions: ({ navigation }) => ({
				header: <JHeader title={'Order View'} back navigation={navigation} whiteout logout />,
			}),
    },
    CreateOrder: { 
      screen: CreateOrder,
      navigationOptions: ({ navigation }) => ({
				header: <JHeader title={'Create Order'} back navigation={navigation} whiteout removeData logout />,
			}),
    },
    CreateOrderDetails: { 
      screen: CreateOrderDetails,
      navigationOptions: ({ navigation }) => ({
				header: <JHeader title={'Order Details'} back navigation={navigation} whiteout removeData logout />,
			}),
    },
    CreateOrderItems: { 
      screen: CreateOrderItems,
      navigationOptions: ({ navigation }) => ({
				header: <JHeader title={'Order Items'} back navigation={navigation} whiteout removeData logout />,
			}),
    },
  },
  {
    mode: 'screen',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
)

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(AppNavigator, 'root')

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { app, dispatch, router } = this.props
    //if (app.loading) return <Loading />

    return <App dispatch={dispatch} state={router} />
  }
}

export default Router
