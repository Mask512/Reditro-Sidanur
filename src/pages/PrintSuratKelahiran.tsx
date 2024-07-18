import { LokasiPraktekType, PersalinanType } from '@/schema/schema';
import { formatDateID } from '@/utils/formatter';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '1cm 2.5cm',
    gap: 8,
    fontSize: 14,
    lineHeight: 1.2,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid black',
    paddingVertical: 15,
    fontSize: 22,
  },
  addresss: {
    fontWeight: 'light',
    fontSize: '12px',
  },
  content: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  label: {
    minWidth: 100,
  },
  signature: {
    position: 'absolute',
    flexDirection: 'column',
    width: 300,
    bottom: 100,
    right: 10,
    textAlign: 'center',
  },
  qrcode: {
    maxHeight: 100,
    maxWidth: 100,
    marginHorizontal: 'auto',
    marginVertical: 20,
  },
});

type PrintSuratKelahiranProps = {
  data: PersalinanType;
  image: string;
  lokasi: LokasiPraktekType | null;
};

export const PrintSuratKelahiran = ({
  data,
  image,
  lokasi,
}: PrintSuratKelahiranProps) => (
  <Document title="Surat Kelahiran">
    <Page size="A4" orientation="portrait" style={styles.page}>
      <View style={styles.header}>
        <Text>{lokasi?.nama}</Text>
        <Text style={styles.addresss}>{lokasi?.alamat}</Text>
      </View>

      <Text
        style={{
          textAlign: 'center',
          textDecoration: 'underline',
          fontSize: 18,
        }}
      >
        Surat Keterangan Kelahiran
      </Text>

      <Text>Yang bertanda tangan dibawah ini menerangkan bahwa:</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Nama</Text>
        <Text>: {data.pasien.nama}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>NIK</Text>
        <Text>: {data.pasien.nik} </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>TTL</Text>
        <Text>
          : {data.pasien.tempatLahir}, {formatDateID(data.pasien.tanggalLahir)}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Alamat</Text>
        <Text>: {data.pasien.alamat} </Text>
      </View>

      <Text>
        Telah melahirkan seorang anak dengan keterangan sebagai berikut:
      </Text>
      <View style={styles.content}>
        <Text style={styles.label}>Nama</Text>
        <Text>: {data.namaAnak} </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Tanggal</Text>
        <Text>: {formatDateID(data.tanggalPersalinan)} </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Waktu</Text>
        <Text>: {data.jamPersalinan} WIB </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Jenis Kelamin</Text>
        <Text>
          : {data.jenisKelaminAnak === 'LAKI_LAKI' ? 'Laki laki' : 'Perempuan'}{' '}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Berat Badan</Text>
        <Text>: {data.beratBadanAnak} gr</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Panjang Badan</Text>
        <Text>: {data.panjangBadanAnak} cm</Text>
      </View>
      <Text>
        Demikian surat keterangan lahir ini dibuat untuk dapat dipergunakan
        sebagaimana mestinya.
      </Text>
      <View style={styles.signature}>
        <Text>
          ________,
          {new Date()
            .toLocaleDateString('id-ID')
            .split('T')[0]
            .split('/')
            .join('-')}
        </Text>
        <Text>Bidan yang menolong</Text>
        <Image
          style={styles.qrcode}
          source={{ uri: image, method: 'GET', headers: {}, body: '' }}
        />
        <Text>{data.bidan.nama}</Text>
      </View>
    </Page>
  </Document>
);
