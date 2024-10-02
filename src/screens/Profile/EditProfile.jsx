import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CameraModal from './../../components/modal/CameraModal';

// import auth from '@react-native-firebase/auth';
// import analytics from '@react-native-firebase/analytics';
// import database from '@react-native-firebase/database';

import { useForm } from 'react-hook-form';
import globalstyle from '../../theme/style';
import { backgroungImage, colors, fonts, height, isIPad, width } from '../../theme';
import { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EditProfileApiCall, UpdateProfilePicApiCall } from '../../redux/reducers/UserStateReducer';
import { SetUserInfo } from '../../redux/reducers/AppStateReducer';
import { showToast } from '../../helpers/toastConfig';
import Loader from "../../components/Loader";
import strings from '../../localization/translation';
import ImagePicker from 'react-native-image-crop-picker';
import { UPDATE_PROFILE_PIC_API_ERROR, UPDATE_PROFILE_PIC_API_SUCCESS } from '../../redux/actiontypes';

const EditProfile = props => {
  const [showModal, setShowModal] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const handleCamera = value => {
    setShowModal(false);
    console.log('value => ', value);
    chooseFile(value);
  };

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const chooseFile = async isCamera => {
    try {
      let response;
      if (isCamera) {
        response = await ImagePicker.openCamera({
          cropping: true,
          mediaType: 'photo',
          // includeBase64: true,
          compressImageQuality: 0.8, // Adjust as needed
        });
      } else {
        response = await ImagePicker.openPicker({
          cropping: true,
          mediaType: 'photo',
          // includeBase64: true,
          compressImageQuality: 0.8, // Adjust as needed
        });
      }

      console.log('response =>', response);
      if (response) {
        setFilePath(response);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  // const chooseFile = async isCamera => {
  //   var options = {
  //     title: 'Select Profile Picture',
  //     customButtons: [
  //       { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
  //     ],
  //     storageOptions: { skipBackup: true, path: 'images' },
  //   };

  //   // setTimeout(() => {
  //   //   launchCamera(
  //   //     options,
  //   //     // { saveToPhotos: true, mediaType: 'photo', includeBase64: true, maxHeight: 400, maxWidth: 400, },
  //   //     response => {
  //   //       // console.log({ response }); 
  //   //       if (response.didCancel) {
  //   //         console.log(' Photo picker didCancel');
  //   //       } else if (response.error) {
  //   //         console.log('ImagePicker Error: ', response.error);
  //   //       } else {
  //   //         console.log('ImagePicker: ', response);
  //   //         // setResponse(response)
  //   //       }
  //   //     });
  //   // }, 200);


  //   let response = {};
  //   if (isCamera) {
  //     console.log('launchCamera');
  //     await delay(200);
  //     response = await launchCamera(options);
  //     // response = setTimeout(() => { launchCamera(options) }, 200);
  //   } else {
  //     console.log('launchImageLibrary');
  //     await delay(200);
  //     response = await launchImageLibrary(options);
  //     // response = setTimeout(() => { launchImageLibrary(options) }, 200);
  //   }

  //   console.log('response here => ', response);
  //   if (Object.keys(response).length > 0) {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       console.log('response: ', response);
  //       setFilePath(response.assets[0]);
  //     }
  //   }
  // };

  const [isEditable, setIsEditable] = useState(true);
  const [user, setUser] = useState(props.userInfo);

  useEffect(() => {
    console.log('Profile props.userInfo => ', props.userInfo);
    setUser(props.userInfo);
  }, [props.userInfo])

  const [showPassword, setShowPassword] = useState(false);
  // const [showConfPassword, setShowConfPassword] = useState(false);

  const input01 = useRef();
  const input02 = useRef();
  const input03 = useRef();
  const input04 = useRef();
  const input05 = useRef();

  const prevUpdateProfilePicResRef = useRef(props.updateProfilePicResponse);
  const prevEditProfileResRef = useRef(props.editProfileResponse);
  const prevFilePathRef = useRef(filePath);

  const { handleSubmit, formState: { errors }, register, setValue, } = useForm();

  useEffect(() => {
    console.log('filePath => ', filePath);
    if (filePath) {
      const { path, mime } = filePath
      // const formData = new FormData();
      // formData.append('profile_picture', {
      //   uri: path,
      //   name: `Profile${Date.now()}.${mime.slice(
      //     mime.lastIndexOf('/') + 1,
      //   )}`,
      //   type: mime,
      // });
      // props.UpdateProfilePicApiCall(formData);
      // isLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + props.userInfo?.access_token);

      const formData = new FormData();
      formData.append('profile_picture', {
        uri: path,
        name: `Profile${Date.now()}.${mime.slice(
          mime.lastIndexOf('/') + 1,
        )}`,
        type: mime,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
      };

      fetch(process.env.API_BASE_URL ? process.env.API_BASE_URL + "/auth/upload-profile-picture" : 'https://reverendsameembalius.com:3013' + "/auth/upload-profile-picture", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          props.saveProfilePicture(result)
        })
        .catch((error) => {
          console.error(error)
          props.profilePictureError(error)
        });
    }
  }, [filePath]);

  useEffect(() => {
    // console.log('props.updateProfilePicResponse => ', props.updateProfilePicResponse);
    if (props.updateProfilePicResponse !== prevUpdateProfilePicResRef.current && props.updateProfilePicResponse?.success && props.updateProfilePicResponse?.data) {
      prevUpdateProfilePicResRef.current = props.updateProfilePicResponse;
      console.log('updateProfilePicResponse => ', props.updateProfilePicResponse,);
      if (props.updateProfilePicResponse?.data?.profile_picture) {
        console.log('set user profile pic => ', props.updateProfilePicResponse);
        props.SetUserInfo({ ...props.userInfo, profile_picture: props.updateProfilePicResponse?.data?.profile_picture, });
        showToast('success', 'Your profile picture updated successfully');
      }
    }
    isLoading(false);
  }, [props.updateProfilePicResponse]);

  const prevUpdateProfilePicErrorRef = useRef(props.updateProfilePicError);
  useEffect(() => {
    if (props.updateProfilePicError !== prevUpdateProfilePicErrorRef.current) {
      prevUpdateProfilePicErrorRef.current = props.updateProfilePicError;
      console.log('updateProfilePicError => ', props.updateProfilePicError);
      showToast('error', props.updateProfilePicError.message);
    }
    isLoading(false);
  }, [props.updateProfilePicError]);

  useEffect(() => {
    console.log('user => ', user);
  }, [user]);

  useEffect(() => {
    if (props.editProfileResponse !== prevEditProfileResRef.current && props.editProfileResponse?.success && props.editProfileResponse?.data) {
      prevEditProfileResRef.current = props.editProfileResponse?.data;
      console.log('props.editProfileResponse => ', props.editProfileResponse);
      props.SetUserInfo({
        ...props.userInfo,
        email: props.editProfileResponse?.data?.email,
        first_name: props.editProfileResponse?.data?.first_name,
        last_name: props.editProfileResponse?.data?.last_name,
        phone: props.editProfileResponse?.data?.phone,
      });
      showToast('success', 'Your profile updated successfully');
      isLoading(false);
      // if (props.editProfileResponse?.data?.profile_picture) {
      //   console.log('set user profile pic => ', props.editProfileResponse);
      //   // props.SetUserInfo({ ...props.userInfo, profile_picture: props.editProfileResponse?.data });
      // }
    }
  }, [props.editProfileResponse])

  const onSubmit = data => {

    if (data.password == undefined) {
      delete data.password
    }
    console.log('data => ', data);
    props.EditProfileApiCall(user.id, data);
    isLoading(true);
  };

  // console.log('errors => ', errors);
  const [loading, isLoading] = useState(false);

  return (
    <>
      {/* <CameraModal
        handleCamera={handleCamera}
        visible={showModal}
        setVisible={setShowModal}
      /> */}
      <Loader isLoading={loading} />
      <SafeAreaView style={[globalstyle.fullview, {backgroundColor: colors.headerbgcolor, height: height, paddingBottom: 142}]}>
      {/* <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} /> */}
        
          <ScrollView showsVerticalScrollIndicator={false} style={{}}>
            {/* <View style={{ backgroundColor: colors.black, height: 400, width: '100%', top: 0, position: 'absolute', }}></View> */}
            <View style={[{  paddingHorizontal: 15 }, isIPad && globalstyle.authscreencontainer]}>
              <View style={{ width: 140, height: 140, borderRadius: 140, marginLeft: 'auto', marginRight: 'auto', position: 'relative', backgroundColor: '#ddd', borderColor: colors.white, borderWidth: 2, marginTop: 30, marginBottom: 15}}>
                <Image
                  source={
                    filePath?.path
                      ? { uri: filePath?.path }
                      : user?.profile_picture
                        ? { uri: user?.profile_picture }
                        : require('./../../../assets/images/dummy-profile-image.png')
                    // { uri: user?.profilepic }
                    // require('./../../assets/images/profile-image.jpg')
                  }
                  defaultSource={require('./../../../assets/images/speaker-placeholder.png')}
                  style={{ width: '100%', height: '100%', borderRadius: 120, resizeMode: 'cover', }}
                />
                {isEditable && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ borderWidth: 1, borderColor: colors.white, position: 'absolute', right: 5, bottom: 2, zIndex: 1, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: colors.white, }}
                    onPress={() => {
                      Alert.alert(
                        'Choose Image Source',
                        '',
                        [
                          {
                            text: 'Camera',
                            onPress: () => chooseFile(true),
                          },
                          {
                            text: 'Gallery',
                            onPress: () => chooseFile(false),
                          },
                          {
                            text: 'Cancel',
                            style: 'cancel',
                          },
                        ],
                        { cancelable: true },
                      );
                    }}>
                    <Icon name="camera" size={isIPad ? 20 : 18} color={colors.orange} />
                  </TouchableOpacity>
                )}
              </View>

              {/* <TouchableOpacity
              onPress={() => {
                setIsEditable(!isEditable);
              }}
              style={{ marginLeft: 'auto', marginTop: -60, marginBottom: 15, width: 40, height: 40, borderRadius: 40, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center', }}>
              <Icon name={!isEditable ? 'edit-3' : 'x'} size={20} color={colors.white} />
            </TouchableOpacity> */}

              <View style={globalstyle.inputbox}>
                <Icon color={colors.orange} name={'user'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder={strings.firstName}
                  defaultValue={user?.first_name}
                  editable={isEditable}
                  placeholderTextColor={colors.placeholdercolor}
                  {...register('first_name', {
                    value: user?.first_name,
                    required: 'First name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/i,
                      message: 'Please provide a valid name',
                    },
                  })}
                  onChangeText={value => setValue('first_name', value)}
                  ref={input01}
                  returnKeyType="next"
                  onSubmitEditing={() => input02.current.focus()}
                />
              </View>
              {errors.first_name && (<Text style={globalstyle.errorField}> {errors.first_name.message} </Text>)}

              <View style={globalstyle.inputbox}>
                <Icon color={colors.orange} name={'user'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder={strings.lastName}
                  defaultValue={user?.last_name}
                  editable={isEditable}
                  placeholderTextColor={colors.placeholdercolor}
                  {...register('last_name', {
                    value: user?.last_name,
                    required: 'Last name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/i,
                      message: 'Please provide a valid name',
                    },
                  })}
                  onChangeText={value => setValue('last_name', value)}
                  ref={input01}
                  returnKeyType="next"
                  onSubmitEditing={() => input02.current.focus()}
                />
              </View>
              {errors.last_name && (<Text style={globalstyle.errorField}> {errors.last_name.message} </Text>)}

              <View style={globalstyle.inputbox}>
                <Icon color={colors.orange} name={'mail'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  defaultValue={user?.email}
                  editable={false}
                  placeholder={strings.email}
                  placeholderTextColor={colors.placeholdercolor}
                  {...register('email', {
                    value: user?.email,
                    required: 'Email Address is required',
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                      message: 'Please provide valid email',
                    },
                  })}
                  // defaultValue={''}
                  onChangeText={value => setValue('email', value)}
                  autoCapitalize="none"
                  ref={input02}
                  returnKeyType="next"
                  onSubmitEditing={() => input03.current.focus()}
                />
              </View>
              {errors.email && (
                <Text style={globalstyle.errorField}>{errors.email.message}</Text>
              )}
              <View style={globalstyle.inputbox}>
                <Icon color={colors.orange} name={'phone'} size={18} />
                <TextInput
                  style={globalstyle.inputfield}
                  placeholder={strings.phoneNumber}
                  placeholderTextColor={colors.placeholdercolor}
                  defaultValue={user?.phone}
                  editable={isEditable}
                  // keyboardType='phone-pad'
                  keyboardType="phone-pad"
                  {...register('phone', {
                    value: user?.phone,
                    required: 'Phone number is required',
                    pattern: {
                      value: /[0-9+]$/i,
                      message: 'Please provide valid phone number',
                    },
                  })}
                  onChangeText={value => setValue('phone', value)}
                  ref={input03}
                  returnKeyType="next"
                  onSubmitEditing={() => input04.current.focus()}
                />
              </View>
              {errors.phone && (<Text style={globalstyle.errorField}>{errors.phone.message}</Text>)}

              {isEditable && (
                <View
                  style={[
                    globalstyle.inputbox,
                    { justifyContent: 'space-between' },
                  ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon color={colors.orange} name={'lock'} size={18} />
                    <TextInput
                      style={[globalstyle.inputfield, { flex: 0.8 }]}
                      placeholder={strings.password}
                      // value="password123"
                      placeholderTextColor={colors.placeholdercolor}
                      {...register('password', {
                        // value: 'password123',
                        // required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password length should be atleast 8 characters',
                        },
                      })}
                      // inputRef={password.ref}
                      onChangeText={value => setValue('password', value)}
                      secureTextEntry={!showPassword ? true : false}
                      autoCapitalize="none"
                      ref={input04}
                    // returnKeyType="next"
                    // onSubmitEditing={() => input05.current.focus()}
                    />
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={globalstyle.showhideicontouch}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}>
                    <Icon
                      name={!showPassword ? 'eye' : 'eye-off'}
                      size={18}
                      style={globalstyle.showhideicon}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {errors.password && (<Text style={globalstyle.errorField}>{errors.password.message}</Text>)}
              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, marginTop: 5 }}>
                            <Text style={[styles.labelinput, { marginRight: 55 }]}>Gender</Text>
                            <View style={{ flexDirection: 'row' }}><TouchableOpacity activeOpacity={0.6} style={[styles.checkboxtick]}
                                onPress={() => { setGender(1) }}>
                                <Icon name={gender == 1 ? 'check-circle' : 'circle'} size={18} color={colors.black} />
                                <Text style={[styles.labelinput, { marginLeft: 6, }]}>Male</Text>
                            </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.6} style={[styles.checkboxtick, { marginRight: 0 }]}
                                    onPress={() => { setGender(2) }}>
                                    <Icon name={gender == 2 ? 'check-circle' : 'circle'} size={18} color={colors.black} />
                                    <Text style={[styles.labelinput, { marginLeft: 6, }]}>Female</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[globalstyle.inputbox, { width: '48.5%' }]}>
                                <TextInput
                                    style={globalstyle.inputfield}
                                    editable={isEditable}
                                    placeholder="Country Here..."
                                    {...register('country', {
                                        value: user?.country,
                                        required: 'Country is required',
                                        pattern: {
                                            value: /^[A-Za-z]+$/i,
                                            message: "Please provide valid country"
                                        },
                                    })}
                                    // defaultValue={''}
                                    defaultValue={user?.country}
                                    onChangeText={(value) => setValue('country', value)}
                                // inputRef={country.ref}
                                // value={country.value}
                                />
                                {errors.country && <Text style={styles.errorField}>{errors.country.message}</Text>}
                            </View>
                            <View style={[globalstyle.inputbox, { width: '48.5%' }]}>
                                <TextInput
                                    style={globalstyle.inputfield}
                                    editable={isEditable}
                                    placeholder="City Here..."
                                    {...register('city', {
                                        value: user?.city,
                                        required: 'City is required',
                                        pattern: {
                                            value: /^[A-Za-z]+$/i,
                                            message: "Please provide valid city"
                                        },
                                    })}
                                    defaultValue={user?.city}
                                    // defaultValue={''}
                                    onChangeText={(value) => setValue('city', value)}
                                // inputRef={city.ref}
                                // value={city.value}
                                />
                                {errors.city && <Text style={styles.errorField}>{errors.city.message}</Text>}
                            </View>
                        </View> */}

              {isEditable && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSubmit(onSubmit)}
                  style={globalstyle.authSubmitButton}>
                  <Text style={globalstyle.authSubmitButtonText}>{strings.updateProfile}</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  fullview: { flex: 1 },
  container: { flex: 1 },
  checkboxtick: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  labelinput: { fontFamily: fonts.latoRegular, fontSize: 13, color: '#000' },
});

const setStateToProps = state => ({
  userInfo: state.appstate.userInfo,
  editProfileResponse: state.userstate.editProfileResponse,
  updateProfilePicResponse: state.userstate.updateProfilePicResponse,
  updateProfilePicError: state.userstate.updateProfilePicError,
});

const mapDispatchToProps = dispatch => {
  return {
    SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    EditProfileApiCall: bindActionCreators(EditProfileApiCall, dispatch),
    UpdateProfilePicApiCall: bindActionCreators(UpdateProfilePicApiCall, dispatch),
    saveProfilePicture: (response) => dispatch({ type: UPDATE_PROFILE_PIC_API_SUCCESS, payload: response }),
    profilePictureError: (response) => dispatch({type: UPDATE_PROFILE_PIC_API_ERROR, payload: response})
  };
};

export default connect(setStateToProps, mapDispatchToProps)(EditProfile);
