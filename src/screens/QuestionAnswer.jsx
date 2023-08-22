import { ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, ImageBackground, LayoutAnimation } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../theme/style";
import { backgroungImage, colors, fonts, isRTL, width } from "../theme";
import { useEffect, useRef, useState } from "react";
import { GetQuestions, SendAskAQuestion } from "../redux/reducers/ListingApiStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showToast } from "../helpers/toastConfig";
import Loader from "../components/Loader";
import strings from "../localization/translation";

const data = [{
    id: 1,
    title: 'Lorem Ipsum is simply dummy text',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
},
{
    id: 2,
    title: 'Lorem Ipsum is simply dummy text',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
},
{
    id: 3,
    title: 'Lorem Ipsum is simply dummy text',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
},
{
    id: 4,
    title: 'Lorem Ipsum is simply dummy text',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
},
{
    id: 5,
    title: 'Lorem Ipsum is simply dummy text',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
}]

const Faqs = ({ item, showborder, handleAccordionToggle, activeAccordion }) => {

    // const [isCollapsed, setIsCollapsed] = useState(activeAccordion == item.id);

    // const toggleAccordion = () => {
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //     setIsCollapsed(!isCollapsed);
    // };
    const isCollapsed = activeAccordion == item.id;

    return (
        <View style={{ borderBottomColor: '#bbb', borderBottomWidth: showborder ? 0 : 1, }}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ padding: 15, paddingHorizontal: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}
                onPress={() => {
                    // toggleAccordion()
                    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    handleAccordionToggle(item.id)
                }}
            >
                <Text style={{ fontFamily: fonts.primarySemiBold, }}>{item.question}</Text>
                <Icon name={isCollapsed ? "chevron-up" : "chevron-down"} size={15} />
            </TouchableOpacity>
            {item.answer && isCollapsed && <Text style={{ fontFamily: fonts.primary, marginBottom: 15, fontSize: 13 }}>{item.answer}</Text>}
        </View>
    )
}

const QuestionAnswer = (props) => {

    const [activeAccordion, setActiveAccordion] = useState(1);
    const _handleAccordionToggle = (id) => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveAccordion((prevId) => (prevId === id ? null : id));
    };

    useEffect(() => {
        props.GetQuestions();
    }, [])

    const [loading, isLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [faqs, setSetFaqs] = useState('');
    const inputRef = useRef(null)
    const prevSendAskAQuestionsRef = useRef(props.sendAskAQuestionsResponse)
    const prevGetQuestionsRef = useRef(props.prevGetQuestionsRef)

    useEffect(() => {
        // console.log('props.sendAskAQuestionsResponse => ', props.sendAskAQuestionsResponse);
        if (props.sendAskAQuestionsResponse !== prevSendAskAQuestionsRef.current && props.sendAskAQuestionsResponse?.success && props.sendAskAQuestionsResponse?.data) {
            prevSendAskAQuestionsRef.current = props.sendAskAQuestionsResponse;
            console.log('props.sendAskAQuestionsResponse => ', props.sendAskAQuestionsResponse);
            showToast('success', 'Your question sent successfully')
        } else {

        }
        isLoading(false);
    }, [props.sendAskAQuestionsResponse])

    useEffect(() => {
        // console.log('props.sendAskAQuestionsResponse => ', props.sendAskAQuestionsResponse);
        if (props.getQuestionsResponse !== prevGetQuestionsRef.current && props.getQuestionsResponse?.success && props.getQuestionsResponse?.data) {
            prevGetQuestionsRef.current = props.getQuestionsResponse;
            console.log('props.getQuestionsResponse => ', props.getQuestionsResponse);
            setSetFaqs(props.getQuestionsResponse?.data)
        } else {

        }
        isLoading(false);
    }, [props.sendAskAQuestionsResponse])



    function onSubmit() {
        if (question == '') {
            showToast('error', 'Please ask a question')
        } else {
            isLoading(true);
            props.SendAskAQuestion({ question: question });
            setQuestion('');
            // showToast('success', 'Your question sent successfully')
        }
    }

    return (
        <SafeAreaView style={globalstyle.fullview}>
            <Loader isLoading={loading} />
            <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
                <FlatList
                    data={faqs}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item, index }) => <Faqs
                        item={item}
                        showborder={index == faqs.length - 1}
                        isExpanded={activeAccordion === item.id}
                        activeAccordion={activeAccordion}
                        handleAccordionToggle={_handleAccordionToggle} />}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 30, backgroundColor: '#fff', borderRadius: 15, padding: 7, marginBottom: 10 }}>
                    <TextInput
                        ref={inputRef}
                        defaultValue={question}
                        onChangeText={value => setQuestion(value)}
                        placeholder={strings.AskAQuestion}
                        placeholderTextColor={'#999'}
                        style={{ padding: 10, width: width - 100, fontFamily: isRTL ? fonts.arabicMedium : fonts.primary, textAlign: isRTL ? 'right' : 'left', }}
                    />
                    <TouchableOpacity
                        onPress={onSubmit}
                        style={{ alignItems: 'center', justifyContent: 'center', width: 45, height: 45, backgroundColor: colors.orange, borderRadius: 10 }}>
                        <Icon name="send" style={{ fontSize: 20, color: colors.white }} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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