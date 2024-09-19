import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";

import { useForm } from "react-hook-form";
import { backgroungImage, colors, fonts, isIPad } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";
import { bindActionCreators } from "redux";
import { ResetPasswordApiCall } from "../../redux/reducers/AuthReducer";
import { connect } from "react-redux";
import { SetIsLogin, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import { showToast } from "../../helpers/toastConfig";
import Loader from "../../components/Loader";
import strings from "../../localization/translation";

const ResetPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, isLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();
  const email = props?.route?.params?.email;

  const prevResetPasswordResRef = useRef(props.resetPasswordResponse);

  useEffect(() => {
    if (
      props.resetPasswordResponse !== prevResetPasswordResRef.current &&
      props.resetPasswordResponse?.success &&
      props.resetPasswordResponse?.data
    ) {
      prevResetPasswordResRef.current = props.resetPasswordResponse;
      // props.SetUserInfo(props.resetPasswordResponse?.data);
      // props.SetIsLogin(true);
      props.navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      showToast("success", props.resetPasswordResponse?.message);
    } else if (
      props.resetPasswordResponse !== prevResetPasswordResRef.current &&
      !props.resetPasswordResponse?.success
    ) {
      showToast("error", props.resetPasswordResponse?.message);
    }
    isLoading(false);
  }, [props.resetPasswordResponse]);

  const onSubmit = (data) => {
    data.email = email; // Adding email to the data being submitted
    props.ResetPasswordApiCall(data);
    isLoading(true);
  };

  const inputRef = useRef();

  useEffect(() => {
    register("password", {
      required: "Password is required",
      minLength: { value: 8, message: "Min length is 8" },
    });
  }, [register]);

  return (
    <SafeAreaView style={globalstyle.fullview}>
      <Loader isLoading={loading} />
      <ImageBackground
        source={require('./../../../assets/images/bgAuth.png')}
        style={[globalstyle.authContainer, { justifyContent: "center", paddingHorizontal: 15 }]}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={isIPad && globalstyle.authscreencontainer}>
              <View style={globalstyle.authLogoContainer}>
                <Text style={globalstyle.authheading}>{strings.ResetPass}</Text>
                <Text style={globalstyle.authdescription}>{strings.ResetAccPass}</Text>
              </View>
              <View>
                <View style={[globalstyle.inputbox, { justifyContent: "space-between" }]}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon color={colors.black} name={"lock"} size={18} />
                    <TextInput
                      style={[globalstyle.inputfield, { flex: 0.8 }]}
                      placeholder={strings.password}
                      placeholderTextColor={colors.placeholdercolor}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      ref={inputRef}
                      returnKeyType="done"
                      onChangeText={(value) => setValue("password", value)}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={globalstyle.showhideicontouch}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    <Icon
                      name={!showPassword ? "eye" : "eye-off"}
                      size={18}
                      style={globalstyle.showhideicon}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={globalstyle.errorField}>{errors.password.message}</Text>
                )}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSubmit(onSubmit)}
                  style={globalstyle.authSubmitButton}
                >
                  <Text style={globalstyle.authSubmitButtonText}>{strings.Submit}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingBottom: 30 }} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const setStateToProps = (state) => ({
  resetPasswordResponse: state.authstate.resetPasswordResponse,
});
const mapDispatchToProps = (dispatch) => {
  return {
    ResetPasswordApiCall: bindActionCreators(ResetPasswordApiCall, dispatch),
    SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
    SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
  };
};

export default connect(setStateToProps, mapDispatchToProps)(ResetPassword);

const styles = StyleSheet.create({
  forgetpasslink: { marginLeft: "auto", marginTop: 10, marginBottom: 0, marginRight: 15 },
  forgetpasstext: { color: colors.black, fontFamily: fonts.latoRegular, fontSize: 13 },
});
