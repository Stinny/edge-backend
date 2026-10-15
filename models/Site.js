import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema(
  {
    customer: { type: String, default: '' },
    building: { type: String, default: '' },
    equipName: { type: String, default: '' },
    equipType: { type: String, default: '' },
    vendor: { type: String, default: '' },
    siteAddress: { type: String, default: '' },
    siteContact: { type: String, default: '' },
    sitePhone: { type: String, default: '' },
    clientFrom: { type: String, default: '' },
    projectType: { type: String, default: '' },
    bmsVersion: { type: String, default: '' },
    vpnInfo: { type: String, default: '' },
    vpnAddress: { type: String, default: '' },
    vpnUser: { type: String, default: '' },
    vpnPass: { type: String, default: '' },
    externalIp: { type: String, default: '' },
    hostName: { type: String, default: '' },
    lanOneIp: { type: String, default: '' },
    lanOneSub: { type: String, default: '' },
    lanTwoIp: { type: String, default: '' },
    lanTwoSub: { type: String, default: '' },
    gateway: { type: String, default: '' },
    dnsServer: { type: String, default: '' },
    platformPort: { type: String, default: '' },
    platformTlsPort: { type: String, default: '' },
    passphrase: { type: String, default: '' },
    platformUser: { type: String, default: '' },
    platformPass: { type: String, default: '' },
    stationUser: { type: String, default: '' },
    stationPass: { type: String, default: '' },
    foxPort: { type: String, default: '' },
    foxTlsPort: { type: String, default: '' },
    httpPort: { type: String, default: '' },
    httpsPort: { type: String, default: '' },
    bacnetRouterIp: { type: String, default: '' },
    bacnetRouterCreds: { type: String, default: '' },
    notesOne: { type: String, default: '' },
    notesTwo: { type: String, default: '' },
    jaceLicense: { type: String, default: '' },
    hostId: { type: String, default: '' },
    maintExp: { type: String, default: '' },
    serial: { type: String, default: '' },
    sharepointLink: { type: String, default: '' },
  },
  { timestamps: true }
);

const Site = mongoose.model('Site', SiteSchema);

export default Site;
