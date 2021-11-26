import { Page, Document, Text } from '@react-pdf/renderer';

const PDFAgreement = () => {
  return (
    <Document>
      <Page>
        <Text>
          super umowa dla koxów
        </Text>
      </Page>
    </Document>
  );
};

export default PDFAgreement;