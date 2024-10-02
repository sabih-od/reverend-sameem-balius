import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, isDarkMode } from "../theme";
import globalstyle from "../theme/style";
import DrawerIcon from "../components/header/DrawerIcon";
import NotificationIcon from "../components/header/NotificationIcon";
import Profile from "../screens/Profile/Profile";
import SearchPost from "../screens/SearchPost";
import { createStackNavigator } from "@react-navigation/stack";
import Posts from "../screens/Posts";
import PostDetail from "../screens/Detail/PostDetail";
import GoBackIcon from "../components/header/GoBackIcon";
import QuestionAnswer from "../screens/QuestionAnswer";
import strings from "../localization/translation";
import AudioPlayer from "../screens/AudioPlayer";
import FavouriteList from "../screens/FavouriteList";
import Downloads from "../screens/Downloads";
import HistoryList from "../screens/HistoryList";
import StartFreeWeek from "../screens/FreeWeek";
import EditProfile from "../screens/Profile/EditProfile";
import Packages from "../screens/Packages";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center', height: 60, alignItems: 'center', backgroundColor: colors.headerbgcolor }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ height: 30, width: 20, resizeMode: 'contain', tintColor: isFocused ? colors.orange : '#fff' }} source={label === 'Home' ? require('./../../assets/images/Icons/home.png') : label === 'Search' ? require('./../../assets/images/Icons/search.png') : require('./../../assets/images/Icons/profile.png')} />
              <Text style={{ color: isFocused ? colors.orange : '#fff', fontSize: 16, marginLeft: 5 }}>
                {label === 'HomeStack' ? 'Home' : label === 'ProfileStack' ? 'Profile' : label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TabStackNavigation({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: 'absolute', bottom: 10 },
      }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="HomeStack" component={HomeStack}
        options={{ headerShown: false }}
      // options={{
      //   headerTitle: 'Home',
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: globalstyle.headerTitleStyle,
      //   headerStyle: {
      //     backgroundColor: isDarkMode ? colors.drawerbg : colors.headerbgcolor,
      //     elevation: 0,
      //     shadowOpacity: 0,
      //   },
      //   headerLeft: () => <DrawerIcon navigation={navigation} />,
      //   headerRight: () => <NotificationIcon navigation={navigation} />
      // }} 
      />
      <Tab.Screen
        name="Search"
        component={SearchPost}
        options={{
          headerTitle: 'Search',
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false
        }}
      />
      {/* <Tab.Screen name="Sermons" options={{
        tabBarLabel: 'Updates',
        tabBarIcon: ({ color, size }) => (
          <Icon name="bell" color={colors.orange} size={18} />
        ),
        tabBarBadge: 3,
      }} component={Sermons} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Books" component={Books} /> */}
    </Tab.Navigator>
  );
}

export default TabStackNavigation;

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}
        options={{
          headerTitle: 'Home',
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen name="Posts" component={Posts}
        options={{
          headerTitle: 'Posts',
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="QuestionAnswer"
        component={QuestionAnswer}
        options={{
          headerTitle: strings.AskAQuestion,
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'ChatGroups'} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen name="PostDetail" component={PostDetail}
        options={{
          headerTitle: '',
          headerTitleAlign: 'center',
          headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none' }],
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          // headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="AudioPlayer"
        component={AudioPlayer}
        options={{
          // headerShown: false,
          headerTitle: strings.NowPlaying,
          headerTitleAlign: 'center',
          headerTitleStyle: [globalstyle.headerTitleStyle, { textTransform: 'none', fontSize: 14 }],
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          // headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="FavouriteList"
        component={FavouriteList}
        options={{
          headerTitle: strings.Favourites,
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="Downloads"
        component={Downloads}
        options={{
          headerTitle: strings.Downloads,
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{
          headerTitle: strings.History,
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="StartFreeWeek"
        component={StartFreeWeek}
        options={{
          headerTitle: '',
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'ChatGroups'} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
    </Stack.Navigator>
  )
}

const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      {/* <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Edit Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="FavouriteList"
        component={FavouriteList}
        options={{
          headerTitle: strings.Favourites,
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="Packages"
        component={Packages}
        options={{
          headerTitle: 'Packages',
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} />,
          // headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="Downloads"
        component={Downloads}
        options={{
          headerTitle: strings.Downloads,
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      />
      <Stack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{
          headerTitle: strings.History,
          headerTitleAlign: 'center',
          headerTitleStyle: globalstyle.headerTitleStyle,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.drawerbg : colors.drawerbg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
          // headerLeft: () => <DrawerIcon navigation={navigation} />,
          headerRight: () => <NotificationIcon navigation={navigation} />
        }}
      /> */}
    </Stack.Navigator>
  )
}