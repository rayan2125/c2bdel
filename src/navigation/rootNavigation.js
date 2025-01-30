import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home';
import SlashScreen from '../screen/slashScreen';
import Login from '../screen/auth/login';
import OrderDetails from '../screen/orderDetails';
import PickView from '../screen/pickView';
import Register from '../screen/auth/multiStep';
import StepperForm from '../screen/auth/multiStep';
import Bankform from '../screen/auth/bankform';

const Stack = createStackNavigator();

const  RootNavigation =()=> {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="SlashScreen">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='SlashScreen' component={SlashScreen}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='OrderDetails' component={OrderDetails}/>
      <Stack.Screen name='PickView' component={PickView}/>
      <Stack.Screen name='StepperForm' component={StepperForm}/>
      <Stack.Screen name='Bankform' component={Bankform}/>
      {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export default RootNavigation