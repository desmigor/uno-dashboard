import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font, Svg, G, Path } from '@react-pdf/renderer';
import Logo from '../../assets/images/dashboard/icon/Log.png';
import global from '../../assets/images/dashboard/icon/global-search.png';
import email from '../../assets/images/dashboard/icon/sms.png';
import call from '../../assets/images/dashboard/icon/call.png';
import Instagam from '../../assets/images/dashboard/icon/insta.png';
import RubikNormal from '../../assets/images/dashboard/fonts/Rubik-Regular.ttf';
import RubikSemiBold from '../../assets/images/dashboard/fonts/Rubik-SemiBold.ttf';
import RubikMedium from '../../assets/images/dashboard/fonts/Rubik-Medium.ttf';
import RubikBold from '../../assets/images/dashboard/fonts/Rubik-Bold.ttf';
import moment from 'moment';

Font.register({ 
    family: 'Rubik',
    fonts: [
        { src: RubikNormal, fontWeight: 'normal' },
        { src: RubikMedium, fontWeight: 'medium' },
        { src: RubikSemiBold, fontWeight: 'semibold' },
        { src: RubikBold, fontWeight: 'bold' },
    ]
});

const ReportPDF = ({ item }) => {
  return (
    <Document>
        <Page size="A4" style={{ fontFamily: 'Rubik', paddingBottom: 135 }}>
            <View style={styles.header} fixed>
                <Image src={Logo} />
                <View>
                    <Text style={styles.phone}>Tel: +233 50 356 9681</Text> 
                    <Text style={styles.phone}>www.unogh.com</Text> 
                </View>
            </View>
            <View style={{ width: '85%', alignSelf: 'center' }}>
                <View style={{width: '100%', height: 91, marginTop: 0, gap: 12, }}>
                    <Text style={styles.text}>{moment().format("MMMM DD, YYYY")}</Text>
                    <View>
                        <Text style={[styles.text, {  width: 102 }]}>SSNIT Emporium, 3rd Floor Airport City, Accra -Ghana</Text> 
                        <Text style={styles.text}>GL-126-4342</Text>
                    </View>
                    <View>
                        <Text style={styles.text}><Text style={{ fontWeight: 'semibold' }}>Report Period:</Text> {item?.report_period === "monthly" ? "Monthly" : item?.report_period === "daily" ? "Daily" : "Custom Date" }</Text> 
                        <Text style={styles.text}><Text style={{ fontWeight: 'semibold' }}>Report Dates:</Text> {moment(item?.report_start_date).format("MMMM DD, YYYY")} - {moment(item?.report_end_date).format("MMMM DD, YYYY")}</Text> 
                    </View>
                </View>
                <Text style={{width: '100%', textAlign: 'center', color: 'rgb(152, 29, 29)', fontSize: 12, fontWeight: 'bold', wordWrap: 'break-word', marginTop: 20,}}>Courier Group Report</Text>
                <Text style={{width: '100%', textAlign: 'left', color: 'rgb(152, 29, 29)', fontSize: 12, fontWeight: 'semibold', wordWrap: 'break-word', marginTop: 20,}}>1. Group Details</Text> 
                <View style={{ width: '100%', borderBottom: 1, borderColor: '#EBEFF2', marginTop: 8, }} />
                <View style={{ width: '100%', height: 144, marginTop: 16 }}>
                    <View style={{ width: '100%', height: 24, flexDirection: 'row', }}>
                        <View style={{ border: 1, borderBottom: 0,borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '40%', }}><Text style={{ fontSize: 8, fontWeight: 'semibold' }}>Name</Text></View>
                        <View style={{ border: 1, borderBottom: 0, borderLeft: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '60%' }}><Text style={{ fontSize: 8, fontWeight: 'normal' }}>{item?.group_details[0]?.name}</Text></View>
                    </View>
                    <View style={{ width: '100%', height: 24, flexDirection: 'row', }}>
                        <View style={{ border: 1, borderBottom: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '40%', }}><Text style={{ fontSize: 8, fontWeight: 'semibold' }}>Country</Text></View>
                        <View style={{ border: 1, borderBottom: 0, borderLeft: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '60%' }}><Text style={{ fontSize: 8, fontWeight: 'normal' }}>{item?.group_details[0]?.country__name}</Text></View>
                    </View>
                    <View style={{ width: '100%', height: 24, flexDirection: 'row', }}>
                        <View style={{ border: 1, borderBottom: 0 ,borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '40%', }}><Text style={{ fontSize: 8, fontWeight: 'semibold' }}>Created on</Text></View>
                        <View style={{ border: 1, borderBottom: 0 ,borderLeft: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '60%' }}><Text style={{ fontSize: 8, fontWeight: 'normal' }}>{moment(item?.group_details[0]?.created_at).format("DD MMM. YYYY")}</Text></View>
                    </View>
                    <View style={{ width: '100%', height: 24, flexDirection: 'row', }}>
                        <View style={{ border: 1, borderBottom: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '40%', }}><Text style={{ fontSize: 8, fontWeight: 'semibold' }}>Owner/Admin</Text></View>
                        <View style={{ border: 1, borderBottom: 0, borderLeft: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '60%' }}><Text style={{ fontSize: 8, fontWeight: 'normal' }}>{item?.group_details[0]?.owner_name}</Text></View>
                    </View>
                    <View style={{ width: '100%', height: 24, flexDirection: 'row', }}>
                        <View style={{ border: 1, borderBottom: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '40%', }}><Text style={{ fontSize: 8, fontWeight: 'semibold' }}>Phone</Text></View>
                        <View style={{ border: 1, borderBottom: 0, borderLeft: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '60%' }}><Text style={{ fontSize: 8, fontWeight: 'normal' }}>{item?.group_details[0]?.owner_phone}</Text></View>
                    </View>
                    <View style={{ width: '100%', height: 24, flexDirection: 'row', }}>
                        <View style={{ border: 1, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '40%', }}><Text style={{ fontSize: 8, fontWeight: 'semibold' }}>Email</Text></View>
                        <View style={{ border: 1, borderLeft: 0, borderColor: '#EBEFF2', paddingLeft: 12, justifyContent: 'center', width: '60%' }}><Text style={{ fontSize: 8, fontWeight: 'normal' }}>{item?.group_details[0]?.owner_email}</Text></View>
                    </View>
                </View> 
                <Text style={{width: '100%', textAlign: 'left', color: 'rgb(152, 29, 29)', fontSize: 12, fontWeight: 'semibold', wordWrap: 'break-word', marginTop: 20,}}>2. Couriers</Text>
                <View style={{ width: '100%', borderBottom: 1, borderColor: '#EBEFF2', marginTop: 8, }} />
                <View style={{width: '100%', height: 32 , marginTop: 16, backgroundColor: 'rgb(248, 249, 250)', flexDirection: 'row', gap: 10,}}>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>#</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                    <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Courier</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10,}}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Completed Deliveries</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Cancelled Deliveries</Text>
                    </View>
                    <View style={{ width: 70, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Mileage</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Revenue</Text>
                    </View>
                </View> 
                {
                    item?.couriers?.map((itm, idx) => <View key={idx} style={{width: '100%', height: 32, borderBottom: 1, borderColor: '#EBEFF2', backgroundColor: 'rgb(255, 255, 255)', flexDirection: 'row', gap: 10,}}>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm?.courier_id}</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                    <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm?.courier_full_name}</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10,}}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm?.completed_deliveries}</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm?.cancelled_deliveries}</Text>
                    </View>
                    <View style={{ width: 70, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm?.total_distance_as_km}KM</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm?.total_revenue?.toFixed(2)} GHS</Text>
                    </View>
                </View> )
                }
                <View style={{width: '100%', height: 32 , backgroundColor: 'rgb(248, 249, 250)', flexDirection: 'row', gap: 10,}}>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                    <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Total</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10,}}>
                        <Text style={{color: 'rgb(152, 29, 29)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>{item?.total?.all_completed_deliveries}</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(152, 29, 29)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>{item?.total?.all_cancelled_deliveries}</Text>
                    </View>
                    <View style={{ width: 70, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(152, 29, 29)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>{item?.total?.all_total_distance_as_km}KM</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(152, 29, 29)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>{item?.total?.all_total_revenue?.toFixed(2)} GHS</Text>
                    </View>
                </View> 
            </View>
            <View style={{ position: 'absolute', bottom: 40, width: '85%', alignSelf: 'center' }} fixed>
                <Text style={{ color: 'rgb(163, 184, 193)', fontSize: 8, fontWeight: 'normal', wordWrap: 'break-word' }} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}`
                )} />
                <Text style={{width: '100%', color: 'rgb(16, 35, 39)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word', marginTop: 12 }}>Making a copy of this document might lead to copyright infringement and will be punishable by law no 2383 of 2002. Please use as mentioned by the laws of UNO. © 2023 UNO All rights reserved.</Text> 
                <View style={{width: '100%', height: 30, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, marginTop: 8, backgroundColor: 'rgb(152, 29, 29)' , justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', }}>
                        <Image src={global} style={{ width: 14, height: 14 }} />
                        <Text style={{ color: 'white', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>www.unogh.com</Text> 
                    </View>
                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', }}>
                        <Image src={email} style={{ width: 14, height: 14 }} />
                        <Text style={{ color: 'white', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>support@unogh.com</Text> 
                    </View>
                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', }}>
                        <Image src={call} style={{ width: 13, height: 13 }} />
                        <Text style={{ color: 'white', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>+233 50 356 9681</Text> 
                    </View>
                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', }}>
                        <Image src={Instagam} style={{ width: 11, height: 11 }} />
                        <Text style={{ color: 'white', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>@unoghana</Text> 
                    </View>
                </View>
            </View>
        </Page>
    </Document>
  )
}

export default ReportPDF

const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        height: 24,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    phone: {textAlign: 'right', color: '#102327', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'},
    text: {textAlign: 'left', color: '#102327', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'},
});