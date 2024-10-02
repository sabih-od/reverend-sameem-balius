import { View, Text, ActivityIndicator, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import globalstyle from '../theme/style';
import { backgroungImage, colors, fonts, height, isDarkMode, isRTL, width } from '../theme';
import strings from '../localization/translation';
import axios from 'axios';
import { useStripe } from '@stripe/stripe-react-native';
import { useSelector } from 'react-redux';

const Packages = () => {
    const [loading, setLoading] = useState(true);
    const [packageList, setPackageList] = useState([]);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    
    const token = useSelector((state) => state.appstate.userInfo.access_token);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get("https://reverendsameembalius.com:3013/subscriptions/get-subscriptions", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the token here
                        "Content-Type": "application/json",
                    },
                });
                setPackageList(response.data?.data);
            } catch (error) {
                console.error("Error fetching packages:", error);
                alert("Failed to fetch packages.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchPackages();
    }, [token]);

    const handlePackagePress = async (item) => {
        setLoading(true);
        try {
            // New API request to get payment intent details
            const response = await axios.post(`https://reverendsameembalius.com:3013/payment/subscription/${item.id}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const { clientSecret } = response.data.data;

            console.log( clientSecret)
    
            // Initialize PaymentSheet with the received paymentIntentSecret
            const { error: initError } = await initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: "reverendsameembalius",
            });
    
            if (initError) {
                console.error("PaymentSheet initialization error:", initError);
                alert(`PaymentSheet initialization failed: ${initError.message}`);
                return;
            }
    
            // Present PaymentSheet for user to complete payment
            const { error: paymentError } = await presentPaymentSheet();
    
            if (paymentError) {
                alert(`Payment failed: ${paymentError.message}`);
            } else {
                alert('Payment successful');
                // After successful payment, you might want to update subscription status and fetch updated package list
                // await updateSubscriptionStatus(item.id); // Update subscription status
                // fetchPackages(); // Refresh the package list
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
            alert("Failed to initiate payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[globalstyle.fullview, { backgroundColor: colors.headerbgcolor, height: height }]}>
            {/* <Image style={[{ width: width, height: height, position: 'absolute', zIndex: 0 }]} resizeMode="cover" source={backgroungImage} /> */}
            {loading && (
                <View style={globalstyle.loadingview}>
                    <ActivityIndicator color={isDarkMode ? colors.black : colors.black} style={{ marginBottom: 15 }} />
                    <Text style={globalstyle.noproductfound}>{strings.Loading}</Text>
                </View>
            )}
            {!loading && (
                <FlatList
                    data={packageList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item?.id)}
                    contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 15 }}
                    ListEmptyComponent={() => (
                        <View style={{ height: height - 150, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={globalstyle.noproductfound}>{strings?.NoDataFound}</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handlePackagePress(item)}
                            activeOpacity={0.8}
                            style={{ backgroundColor: colors.headerbgcolor, width: width - 30, marginBottom: 10, borderRadius: 10, height: 100, paddingHorizontal: 20, justifyContent: 'center' }}
                        >
                            <Text
                                numberOfLines={1}
                                style={{ fontFamily: isRTL ? fonts?.arabicBold : fonts?.primarySemiBold, fontSize: 15, color: colors.black }}
                            >
                                {item.name}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{ fontFamily: isRTL ? fonts.arabicRegular : fonts.primary, fontSize: isRTL ? 13 : 12, color: colors.black }}
                            >
                                {item.description}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: isRTL ? fonts?.arabicBold : fonts?.primarySemiBold, fontSize: 15, color: colors.drawerbg }}>
                                        Subscribe
                                    </Text>
                                    <Image
                                        source={require('./../../assets/images/Icons/next.png')}
                                        style={{ height: 13, width: 13, resizeMode: 'contain', tintColor: colors.drawerbg, marginLeft: 10 }}
                                    />
                                </View>
                                <Text style={{ fontFamily: isRTL ? fonts?.arabicBold : fonts?.primarySemiBold, fontSize: 15, color: colors.black }}>
                                    ${item?.price}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default Packages;
