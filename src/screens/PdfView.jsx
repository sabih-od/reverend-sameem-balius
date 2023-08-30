import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { colors, height, isDarkMode, width } from '../theme';

const PdfView = (props) => {
    useEffect(() => {
        props.navigation.setOptions({ headerTitle: props.route.params?.item?.title });
        console.log('props.route.params?.item?.title => ', props.route.params?.item?.title)
    }, [])

    const source = { uri: props.route.params?.item?.pdf, cache: true };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

    return (
        <View style={styles.container}>
            <Pdf
                trustAllCerts={false}
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 0, backgroundColor: isDarkMode ? colors.deepblue : colors.headerbgcolor },
    pdf: { flex: 1, width: width, height: height, }
});

export default PdfView;