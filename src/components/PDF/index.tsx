import { Document, Page, Text, View } from '@react-pdf/renderer';
import moment from 'moment';

const PDFAgreement = ({
                        reservationId,
                        endAt,
                        startAt,
                        condition
                      }: { reservationId: string, startAt: string, endAt: string, condition: string }) => {
  return (
    <Document>
      <Page style={{ padding: 50 }}>
        <Text style={{
          fontWeight: 700,
          fontSize: 30,
          textAlign: 'center',
          textTransform: 'uppercase',
          marginTop: 50,
          marginBottom: 100
        }}>
          Rentoo
        </Text>
        <Text
          style={{ fontWeight: 600, fontSize: 22, textAlign: 'center', marginBottom: 25, textTransform: 'uppercase' }}>
          Umowa najmu
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>nr {reservationId}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, fontSize: 14 }}>
          <Text style={{ width: '100%' }}>Poczatek: </Text>
          <Text>{moment(startAt).format('DD-MM-YYYY')}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, fontSize: 14 }}>
          <Text style={{ width: '100%' }}>Koniec: </Text>
          <Text>{moment(endAt).format('DD-MM-YYYY')}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 30, fontSize: 14 }}>
          <Text style={{ width: '100%' }}>Stan: </Text>
          <Text>{condition || 'Perfekcyjny!'}</Text>
        </View>
        <Text style={{ fontSize: 14 }}>
          W przypadku wysylki wynajmujacy zobowiazany jest sprawdzic w ciagu 3 godzin czy
          produkt jest zgodny z stanem opisanym przez wlasciciela.
        </Text>
      </Page>
    </Document>
  );
};

export default PDFAgreement;