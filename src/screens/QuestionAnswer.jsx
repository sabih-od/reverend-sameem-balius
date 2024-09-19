import { ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, ImageBackground, LayoutAnimation, Image, KeyboardAvoidingView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../theme/style";
import { backgroungImage, colors, fonts, height, IOS, isDarkMode, isRTL, width } from "../theme";
import { useEffect, useRef, useState } from "react";
import { GetQuestions, SendAskAQuestion } from "../redux/reducers/ListingApiStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showToast } from "../helpers/toastConfig";
import Loader from "../components/Loader";
import strings from "../localization/translation";

const Faqs = ({ item, showborder, handleAccordionToggle, activeAccordion }) => {

    const [isCollapsed, setIsCollapsed] = useState(activeAccordion == item.id);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsCollapsed(!isCollapsed);
    };
    // const isCollapsed = activeAccordion == item.id;

    return (
        <View style={{ borderBottomColor: isRTL ? '#888' : 'rgba(0,0,0,0.1)', borderBottomWidth: showborder ? 0 : 1, }}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ padding: 15, paddingHorizontal: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', }}
                onPress={() => {
                    toggleAccordion()
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    // handleAcc/ordionToggle(item.id)
                }}
            >
                <Text style={{ fontFamily: isRTL ? fonts.arabicBold : fonts.primarySemiBold, color: isDarkMode ? colors.black : colors.black, textAlign: 'left' }}>{item.question}</Text>
                <Icon name={isCollapsed ? "chevron-up" : "chevron-down"} style={{ fontSize: 15, color: isDarkMode ? colors.black : colors.black }} />
            </TouchableOpacity>
            {item.answer && isCollapsed && <Text style={[{ fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, marginBottom: 15, fontSize: 13, color: isDarkMode ? colors.black : colors.black, textAlign: 'left' }, isRTL && { lineHeight: 22 }]}>{item.answer}</Text>}
        </View>
    )
}

const itemslimit = 50;
const QuestionAnswer = (props) => {
    const isTab = props?.route?.params?.text
    console.log('isTab', isTab)

    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [activeAccordion, setActiveAccordion] = useState(1);
    const _handleAccordionToggle = (id) => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveAccordion((prevId) => (prevId === id ? null : id));
    };

    useEffect(() => {
        console.log('question answer => ')
        props.GetQuestions();
        return () => {
            setSetFaqs([])
        }
    }, [])

    const [loading, isLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [faqs, setSetFaqs] = useState([]);
    const inputRef = useRef(null)
    const prevSendAskAQuestionsRef = useRef(props.sendAskAQuestionsResponse)
    const prevGetQuestionsRef = useRef(props.prevGetQuestionsRef)

    useEffect(() => {
        // console.log('props.sendAskAQuestionsResponse => ', props.sendAskAQuestionsResponse);
        if (props.sendAskAQuestionsResponse !== prevSendAskAQuestionsRef.current && props.sendAskAQuestionsResponse?.success && props.sendAskAQuestionsResponse?.data) {
            prevSendAskAQuestionsRef.current = props.sendAskAQuestionsResponse;
            console.log('props.sendAskAQuestionsResponse => ', props.sendAskAQuestionsResponse);
            showToast('success', 'Your question sent successfully')
        }
        isLoading(false);
        setRefreshing(false)
    }, [props.sendAskAQuestionsResponse])

    useEffect(() => {
        console.log('props.getQuestionsResponse => ', props.getQuestionsResponse);
        if (props.getQuestionsResponse !== prevGetQuestionsRef.current && props.getQuestionsResponse?.success && props.getQuestionsResponse?.data) {
            prevGetQuestionsRef.current = props.getQuestionsResponse;
            console.log('props.getQuestionsResponse => ', props.getQuestionsResponse);
            setSetFaqs(props.getQuestionsResponse?.data)
        } else {

        }
        isLoading(false);
        setRefreshing(false)
    }, [props.getQuestionsResponse])



    function onSubmit() {
        if (question == '') {
            showToast('error', 'Please ask a question')
        } else {
            isLoading(true);
            props.SendAskAQuestion({ question: question });
            setQuestion('');
            props.GetQuestions()
            // showToast('success', 'Your question sent successfully')
        }
    }

    const [refreshing, setRefreshing] = useState(false);
    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetQuestions();
        console.log('_handleRefresh ');
    }


    return (
        <SafeAreaView style={[globalstyle.fullview, { backgroundColor: colors.headerbgcolor, height: height, paddingBottom: 80 }]}>
            {/* <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} /> */}
            <Loader isLoading={loading} />
            <KeyboardAvoidingView
                behavior={'padding'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={120}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <ImageBackground style={{ height: height / 2, width: width - 40 }} imageStyle={{ resizeMode: 'stretch', borderRadius: 20 }} source={require('./../../assets/images/questionAnswers.jpg')
                        }></ImageBackground>
                    </View>
                    <FlatList
                        data={faqs}
                        keyExtractor={(item) => String(item.id)}
                        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 10 }}
                        refreshing={refreshing}
                        onRefresh={_handleRefresh}

                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <Faqs
                                        item={item}
                                        showborder={index == faqs.length - 1}
                                        isExpanded={activeAccordion === item.id}
                                        activeAccordion={activeAccordion}
                                        handleAccordionToggle={_handleAccordionToggle} />
                                    {index == faqs.length - 1 ?
                                        <View style={{ width: width - 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 5, marginBottom: isTab === undefined ? 10 : 65, paddingBottom: IOS ? 100 : 0, borderRadius: 0, marginTop: 30 }}>
                                            {IOS ? <>
                                                <TextInput
                                                    ref={inputRef}
                                                    defaultValue={question}
                                                    onChangeText={value => setQuestion(value)}
                                                    placeholder={strings.AskAQuestion}
                                                    placeholderTextColor={'#999'}
                                                    style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primary, height: 55, backgroundColor: '#f7f7f7', width: width - 95, color: colors.black, fontSize: 14, paddingHorizontal: 15, paddingVertical: 10, textAlign: isRTL ? 'right' : 'left', borderTopLeftRadius: 30, borderBottomLeftRadius: 30, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomWidth: 1, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 0, borderColor: 'grey' }}
                                                />
                                                <TouchableOpacity
                                                    onPress={onSubmit}
                                                    style={{ width: 55, height: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, borderTopRightRadius: 30, borderBottomRightRadius: 30, borderRightWidth: 1, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'grey' }}>
                                                    <Icon name="send" style={{ fontSize: 20, color: colors.white }} />
                                                </TouchableOpacity>
                                            </> :
                                                <>
                                                    <TextInput
                                                        ref={inputRef}
                                                        defaultValue={question}
                                                        onChangeText={value => setQuestion(value)}
                                                        placeholder={strings.AskAQuestion}
                                                        placeholderTextColor={'#999'}
                                                        style={{ fontFamily: isRTL ? fonts.arabicMedium : fonts.primary, height: 55, backgroundColor: '#f7f7f7', width: width - 95, color: colors.black, fontSize: 14, paddingHorizontal: 15, paddingVertical: 10, textAlign: isRTL ? 'right' : 'left', borderTopLeftRadius: isRTL ? 0 : 30, borderBottomLeftRadius: isRTL ? 0 : 30, borderTopRightRadius: isRTL ? 30 : 0, borderBottomRightRadius: isRTL ? 30 : 0, borderBottomWidth: 1, borderTopWidth: 1, borderLeftWidth: isRTL ? 0 : 1, borderRightWidth: isRTL ? 1 : 0, borderColor: 'grey' }}
                                                    />
                                                    <TouchableOpacity
                                                        onPress={onSubmit}
                                                        style={{ width: 55, height: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange, borderTopRightRadius: 30, borderBottomRightRadius: 30, borderRightWidth: 1, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'grey' }}>
                                                        <Icon name="send" style={{ fontSize: 20, color: colors.white }} />
                                                    </TouchableOpacity>
                                                </>
                                            }
                                        </View>
                                        : null
                                    }

                                </View>
                            )
                        }
                        }
                    />
                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const setStateToProps = (state) => ({
    getQuestionsResponse: state.listingstate.getQuestionsResponse,
    sendAskAQuestionsResponse: state.listingstate.sendAskAQuestionsResponse,
});

const mapDispatchToProps = (dispatch) => {
    return {
        SendAskAQuestion: bindActionCreators(SendAskAQuestion, dispatch),
        GetQuestions: bindActionCreators(GetQuestions, dispatch),
    }
};

export default connect(setStateToProps, mapDispatchToProps)(QuestionAnswer);

const styles = StyleSheet.create({
    homebgimage: {
        // paddingTop: IOS ? 45 : 70,
        // paddingTop: IOS ? 100 : 70,
        paddingHorizontal: 15,
        flex: 1, justifyContent: 'space-between',
        // ...StyleSheet.absoluteFillObject,
        // height: height, resizeMode: 'cover'
    },
    homescollview: { flex: 1, paddingVertical: 15 }
})