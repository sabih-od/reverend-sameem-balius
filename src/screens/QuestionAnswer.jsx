import { ScrollView, Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, ImageBackground, LayoutAnimation } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../theme/style";
import { backgroungImage, colors, fonts, width } from "../theme";
import { useState } from "react";

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
                <Text style={{ fontFamily: fonts.primarySemiBold, }}>{item.title}</Text>
                <Icon name={isCollapsed ? "chevron-up" : "chevron-down"} size={15} />
            </TouchableOpacity>
            {isCollapsed && <Text style={{ fontFamily: fonts.primary, marginBottom: 15, fontSize: 14 }}>{item.content}</Text>}
        </View>
    )
}

const QuestionAnswer = (props) => {

    const [activeAccordion, setActiveAccordion] = useState(1);
    const _handleAccordionToggle = (id) => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveAccordion((prevId) => (prevId === id ? null : id));
    };

    return (
        <SafeAreaView style={globalstyle.fullview}>
            <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item, index }) => <Faqs
                        item={item}
                        showborder={index == data.length - 1}
                        isExpanded={activeAccordion === item.id}
                        activeAccordion={activeAccordion}
                        handleAccordionToggle={_handleAccordionToggle} />}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 30, backgroundColor: '#fff', borderRadius: 15, padding: 7, marginBottom: 10 }}>
                    <TextInput
                        onChangeText={value => console.log('value => ', value)}
                        placeholder="Ask a Question..."
                        placeholderTextColor={'#999'}
                        style={{ padding: 10, width: width - 100, fontFamily: fonts.primary }}
                    />
                    <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center', width: 45, backgroundColor: colors.orange, borderRadius: 10 }}>
                        <Icon name="send" style={{ fontSize: 20, color: colors.white }} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default QuestionAnswer;

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