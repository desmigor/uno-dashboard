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
import star from "../../assets/images/dashboard/icon/star.png";
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

const ReportPackagePDF = React.memo(({ item, status }) => {
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
            <View style={{ width: '85%',  alignSelf: 'center' }}>
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
                <Text style={{width: '100%', textAlign: 'center', color: 'rgb(152, 29, 29)', fontSize: 12, fontWeight: 'bold', wordWrap: 'break-word', marginTop: 20,}}>{status} Packages Report</Text>
                <View style={{ width: '100%', borderBottom: 1, borderColor: '#EBEFF2', marginTop: 8, }} />
                <View style={{width: '100%', height: 32 , marginTop: 16, backgroundColor: 'rgb(248, 249, 250)', flexDirection: 'row', gap: 10,}}>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>#</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                    <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Time</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10,}}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Tracking #</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Customer</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Courier</Text>
                    </View>
                    <View style={{ width: 120, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Size</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Amount</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>{status == "Cancelled"? "Canceled By" : "Rating"}</Text>
                    </View>
                </View> 
                {
                    item?.packages?.map((itm, idx) => <View key={idx} style={{width: '100%', height: 32, borderBottom: 1, borderColor: '#EBEFF2', backgroundColor: 'rgb(255, 255, 255)', flexDirection: 'row', gap: 10,}}>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{idx + 1}</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{moment(itm.created_at).format("DD-MM-YYYY")}</Text>
                        <Text style={{color: 'rgb(156, 163, 175)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{moment(itm.created_at).format("HH:MM")}</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10,}}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm.id}</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm.customer_name ? itm.customer_name : 'Not Mentioned' }</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm.courier_name ? itm.courier_name : 'Not Mentioned'}</Text>
                    </View>
                    <View style={{ width: 120, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{itm.size_name ? itm.size_name : "Not Mentioned"}</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: 'bold', wordWrap: 'break-word'}}>{status === "Cancelled"? itm?.original_amount.toFixed(2) : itm?.total_revenue.toFixed(2)} GHS</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'start', alignItems: 'center', paddingLeft: 10, flexDirection: 'row', gap: 5 }}>
                        {(status === "Completed" && itm?.customer_rating) && <Image src={star} style={{ width: 8, height: 8 }} /> }
                        <Text style={{color: 'rgb(255, 161, 24)', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'}}>{status === "Cancelled" ? itm?.canceled_role : itm?.customer_rating ? itm?.customer_rating : 'No rating' }</Text>
                    </View>
                </View> )
                }
                <View style={{width: '100%', height: 32 , backgroundColor: 'rgb(248, 249, 250)', flexDirection: 'row', gap: 10,}}>
                    {/* <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>Total</Text>
                    </View>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(152, 29, 29)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}>${item?.total?.all_total_revenue?.toFixed(2)} USD</Text>
                    </View>
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View> */}
                    <View style={{ width: 25, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 300, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: 'bold', wordWrap: 'break-word'}}>Total</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10,}}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
                    </View>
                    <View style={{ width: 300, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(152, 29, 29)', fontSize: 8, fontWeight: 'bold', wordWrap: 'break-word'}}>${status === "Cancelled" ? item?.total?.all_total_original_amount.toFixed(2) : item?.total?.all_total_revenue?.toFixed(2)} GHS</Text>
                    </View>
                    <View style={{ width: 100, height: 32, justifyContent: 'center', paddingLeft: 10, }}>
                        <Text style={{color: 'rgb(35, 41, 46)', fontSize: 8, fontWeight: '500', wordWrap: 'break-word'}}></Text>
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
});

export default ReportPackagePDF

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
        marginBottom: 20,
    },
    phone: {textAlign: 'right', color: '#102327', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'},
    text: {textAlign: 'left', color: '#102327', fontSize: 8, fontWeight: '400', wordWrap: 'break-word'},
});