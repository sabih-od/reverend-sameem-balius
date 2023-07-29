import { FlatList, ImageBackground, SafeAreaView, StyleSheet } from "react-native"
import { backgroungImage } from "../theme"
import globalstyle from "../theme/style"

const Audio = (props) => {
    return (
        <SafeAreaView style={globalstyle.fullview}>
            <ImageBackground style={styles.homebgimage} resizeMode="cover" source={backgroungImage}>
                {/* <FlatList
                    data={data}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item, index }) => <Faqs
                        item={item}
                        // showborder={index == data.length - 1}
                        // isExpanded={activeAccordion === item.id}
                        // activeAccordion={activeAccordion}
                        // handleAccordionToggle={_handleAccordionToggle} />}
                /> */}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Audio;

const styles = StyleSheet.create({
    homebgimage: {
        // paddingTop: IOS ? 45 : 70,
        // paddingTop: IOS ? 100 : 70,
        paddingHorizontal: 15,
        flex: 1, // justifyContent: 'space-between',
        // ...StyleSheet.absoluteFillObject,
        // height: height, resizeMode: 'cover'
    },
    homescollview: { flex: 1, paddingVertical: 15 }
})