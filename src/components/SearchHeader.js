import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import Icon from 'react-native-vector-icons/Feather';
import { colors, fontcolor, fonts, width } from "../theme";

const SearchHeader = (props) => {

    const [searchtext, setSearchText] = useState('');

    useEffect(() => {
    }, [])

    return <View style={styles.searchbox}>
        <TouchableOpacity activeOpacity={0.8}
            style={styles.searchbtn}
            onPress={() => { console.log('Search Now') }}>
            <Icon name="search" size={18} color={'#555'} />
        </TouchableOpacity>
        <TextInput style={styles.searchinput}
            value={searchtext}
            onChangeText={(val) => {
                setSearchText(val)
                console.log('search text => ', val);
            }} 
            placeholder="Search Here..." 
            placeholderTextColor={colors.placeholdercolor}
            />
    </View>
}

export default SearchHeader;

const styles = StyleSheet.create({
    searchbtn: { padding: 10 },
    searchinput: { backgroundColor: colors.white, width: '80%', height: 50, fontFamily: fonts.primary, color: colors.black },
    searchbox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, width: width / 1.6, borderRadius: 40, height: 40, overflow: 'hidden' }
})