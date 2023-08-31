import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, height, isIPad } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';

const TermsAndConditionsModal = ({ visible, setVisible }) => {
    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    // useEffect(() => {
    //     setVisiblity(visible)
    //     return () => {
    //     };
    // }, [visible]);
    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={visible}
            onRequestClose={() => { setVisible(false); }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setVisible(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: isIPad ? '80%' : '90%', height: height - 200, padding: 15 }}>
                    <Text style={styles.heading}>Terms And Conditions</Text>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 0 }}>
                        <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</Text>
                        {/* <Text style={styles.paragraph}>1.{'  '}<Text style={styles.boldfont}>Terms of Use</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>These terms and conditions ("Terms") govern your use of the Texas Christian Ashram mobile application ("App") and the services provided by Texas Christian Ashram ("we," "us," or "our"). By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the App.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>2.{'  '}<Text style={styles.boldfont}>App Usage</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.bold}>Eligibility</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>You must be at least 18 years old to use the App. By using the App, you represent and warrant that you are at least 18 years old.</Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.bold}>Account Creation</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>To access certain features of the App, you may need to create an account. You agree to provide accurate and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and are solely responsible for all activities that occur under your account.</Text>
                        <View style={{ height: 15 }} />
                        <Text style={styles.bold}>Prohibited Activities</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.bold}>You agree not to engage in any of the following activities while using the App:</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>a){' '} Violating any applicable laws or regulations;</Text>
                        <Text style={styles.paragraph}>b){' '} Impersonating any person or entity;</Text>
                        <Text style={styles.paragraph}>c){' '} Interfering with or disrupting the App's functionality;</Text>
                        <Text style={styles.paragraph}>d){' '} Uploading or transmitting any viruses, malware, or other harmful code;</Text>
                        <Text style={styles.paragraph}>e){' '} Collecting or harvesting any personally identifiable information from other users of the App;</Text>
                        <Text style={styles.paragraph}>f){' '} Using the App for any illegal or unauthorized purpose;</Text>
                        <Text style={styles.paragraph}>g){' '} Posting or transmitting any content that is unlawful, defamatory, or infringing upon the rights of others.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>3.{'  '}<Text style={styles.boldfont}>Intellectual Property</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>The App and its content, including but not limited to text, graphics, images, logos, and software, are the intellectual property of Texas Christian Ashram and are protected by applicable intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on any content from the App without our prior written consent.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>4.{'  '}<Text style={styles.boldfont}>Limitation of Liability</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.bold}>Disclaimer of Warranties</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>The App is provided on an "as-is" and "as-available" basis without any warranties, express or implied. We do not warrant that the App will be error-free or uninterrupted or that any defects will be corrected.</Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.bold}>Limitation of Liability</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with the use or inability to use the App.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>5.{'  '}<Text style={styles.boldfont}>Privacy</Text></Text>
                        <Text style={styles.paragraph}>We collect and process personal information in accordance with our Privacy Policy, which is incorporated by reference into these Terms. By using the App, you consent to the collection and processing of your personal information as described in the Privacy Policy.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>6.{'  '}<Text style={styles.boldfont}>Termination</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>We may terminate or suspend your access to the App at any time and for any reason without prior notice or liability.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>7.{'  '}<Text style={styles.boldfont}>Governing Law</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>These Terms shall be governed by and construed in accordance with the laws of the state of Texas, without regard to its conflict of laws principles.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>8.{'  '}<Text style={styles.boldfont}>Severability</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>9.{'  '}<Text style={styles.boldfont}>Changes to the Terms</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>We reserve the right to modify or update these Terms at any time without prior notice. The updated Terms will be posted on the App, and your continued use of the App after any such changes constitutes your acceptance of the modified Terms.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>10.{'  '}<Text style={styles.boldfont}>Contact Us</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>If you have any questions or concerns regarding these Terms, please contact us.</Text>
                        <Text style={styles.paragraph}>By using the Texas Christian Ashram mobile app, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.{'\n'}</Text> */}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}
export default TermsAndConditionsModal;

const styles = StyleSheet.create({
    heading: { fontFamily: fonts.primarySemiBold, fontSize: isIPad ? 28 : 20, paddingBottom: 8, textAlign: 'left', color: colors.black },
    paragraph: { fontFamily: fonts.primary, lineHeight: isIPad ? 28 : 20, color: colors.grey, fontSize: isIPad ? 16 : 14, color: colors.black },
    boldfont: { fontFamily: fonts.primarySemiBold, fontSize: isIPad ? 22 : 18, }, // '#BE1E2D'
    bold: { fontFamily: fonts.primaryMedium, fontSize: isIPad ? 16 : 14, }
})