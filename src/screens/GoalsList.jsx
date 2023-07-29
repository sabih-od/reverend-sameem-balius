import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { colorScheme, colors, fonts, height, width } from "../theme";

import Icon from 'react-native-vector-icons/Feather';
import goallist from "../data/goal-list";
import globalstyle from "../theme/style";
import TopicChecBox from "../components/TopicCheckBox";

const GoalList = (props) => {

    const [details, setDetails] = useState(goallist);

    function updatetopic(id) {
        console.log('topic id => ', id);
        setDetails(prevState => {
            const newState = prevState.map(obj => {
                if (obj.id === id) {
                    return { ...obj, isSelected: !obj.isSelected };
                }
                return obj;
            });
            return newState;
        });
    }

    function continuenow() {
        var res = details.filter(val => {
            return val.isSelected
        })
        if (res.length >= 2) {
            console.log('continue');
            props.navigation.navigate('StartFreeWeek')
        } else {
            console.log('select 2 or more');
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={globalstyle.topicbgimage} resizeMode="cover" source={colorScheme == 'dark' ? require('./../../assets/images/home-bg.jpg') : require('./../../assets/images/auth-bg.jpg')}>
            {/* <ScrollView style={{ paddingVertical: 15, flex: 1, }} showsVerticalScrollIndicator={false}> */}
            <View style={globalstyle.topicheadingrow}>
                <Text style={[globalstyle.topicheading]}>What are your Goals?</Text>
                <Text style={[globalstyle.topicdesc]}>Choose 2 or more goals</Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={details}
                numColumns={2}
                columnWrapperStyle={{ flex: 1, justifyContent: 'space-between', }}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => {
                    console.log('index => ', index);
                    return (
                        <TopicChecBox key={index} item={item} handleTopicId={updatetopic} color={colors.orange} />
                    )
                }}
            />
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => continuenow()}
                style={globalstyle.topiccontinuebtn}>
                <Text style={globalstyle.topiccontinuebtntext}>Continue</Text>
            </TouchableOpacity>
            {/* </ScrollView> */}
        </ImageBackground>
    </SafeAreaView>
}

export default GoalList;
const styles = StyleSheet.create({
    // topicheading: { fontFamily: fonts.primaryBold, fontSize: 22, textAlign: 'center', color: colors.white, textTransform: 'capitalize' },
    // topicdesc: { fontFamily: fonts.primaryMedium, fontSize: 15, textAlign: 'center', color: colors.white },
    // topicdetailbox: { height: width / 2, width: width / 2.25, borderRadius: 10, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 15, },
    // checkicon: { alignItems: 'center', justifyContent: 'center', width: 25, height: 25, backgroundColor: colors.orange, borderRadius: 20, position: 'absolute', top: 10, right: 10 },
})